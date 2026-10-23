# Deploying matiitechnologies.com to the Hostinger VPS

A complete, in-order runbook for taking the site from this repository to a fully working production server. Every step says **what it does** and **why it matters**, followed by the exact commands.

| Server detail | Value |
|---|---|
| Provider / location | Hostinger, Netherlands (Meppel) |
| OS | Ubuntu 24.04 LTS |
| Hostname | `srv2086025.hstgr.cloud` |
| IPv4 | `191.96.1.9` |
| Initial login | `root` (password from Hostinger hPanel) |
| Domain | `matiitechnologies.com` (+ `www.`) |
| Hostinger backups | Weekly full-server snapshot |

**How the finished setup works**

```
 You push to main ──► GitHub Actions: test → build images → push to GHCR ──► SSH to VPS → scripts/deploy.sh
                                                                                     │
 Visitor ──HTTPS──► VPS 191.96.1.9 ─► caddy (TLS, www→apex) ─► web (Next.js) ─► db (PostgreSQL 18)
```

Everything runs in Docker on the VPS. The site no longer depends on Vercel or Neon. Cloudinary (image uploads) and the AI translation keys remain optional external services.

Commands are marked by where to run them:

- 💻 **PC**: PowerShell on your Windows computer
- 🖥️ **VPS**: in an SSH session on the server
- 🌐 **Web**: in a browser (GitHub, Hostinger, your DNS provider)

Plan about 1–2 hours. The site keeps running on its current host until **Step 13** (DNS switch), so there is no downtime while you set up.

---

## Phase 1: Secure the server

### Step 1: First login and system update

**What it does:** connects to the new server and installs every pending Ubuntu security update.
**Why:** a fresh VPS image is often weeks behind on patches, and it is exposed to the internet from the moment it boots.

💻 PC:
```powershell
ssh root@191.96.1.9
```
Accept the host fingerprint (`yes`) and enter the root password from hPanel → **VPS → Overview**.

🖥️ VPS:
```bash
apt update && apt full-upgrade -y
timedatectl set-timezone Africa/Addis_Ababa   # optional: log timestamps in your local time
reboot
```
Wait about a minute and log in again with `ssh root@191.96.1.9`.

### Step 2: Log in with an SSH key instead of a password

**What it does:** creates a key pair on your PC and installs the public half on the server.
**Why:** passwords can be guessed by the bots that constantly scan every public IP; a key cannot. This is also what lets you turn password login off in Step 3.

💻 PC (skip `ssh-keygen` if you already have `~/.ssh/id_ed25519`):
```powershell
ssh-keygen -t ed25519 -C "henabakos-pc"
type $env:USERPROFILE\.ssh\id_ed25519.pub | ssh root@191.96.1.9 "mkdir -p ~/.ssh && chmod 700 ~/.ssh && cat >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys"
```
Now `ssh root@191.96.1.9` should log you in **without asking for the server password**. If it still asks for one, fix that before going on.

> Alternative: hPanel → **VPS → Settings → SSH keys** lets you paste the contents of `id_ed25519.pub`.

### Step 3: Disable password logins

**What it does:** tells the SSH server to accept keys only.
**Why:** this closes off brute-force password attacks completely.

🖥️ VPS:
```bash
cat > /etc/ssh/sshd_config.d/00-hardening.conf <<'EOF'
PasswordAuthentication no
KbdInteractiveAuthentication no
PermitRootLogin prohibit-password
EOF
sshd -t && systemctl restart ssh
```
The file name starts with `00-` because Ubuntu 24.04 uses the *first* value it reads, and Hostinger's `50-cloud-init.conf` may turn passwords back on.

⚠️ **Keep your current session open.** In a *new* PowerShell window, check that `ssh root@191.96.1.9` still works. If it fails, delete the file from the still-open session (`rm /etc/ssh/sshd_config.d/00-hardening.conf && systemctl restart ssh`). As a last resort, hPanel's **Browser terminal** always gets you in.

### Step 4: Firewall, brute-force protection, automatic patches, swap

**What it does:**
- **ufw** allows only SSH (22), HTTP (80) and HTTPS (443) from the internet.
- **fail2ban** temporarily bans IPs that keep failing SSH logins.
- **unattended-upgrades** installs Ubuntu security fixes every day by itself.
- **swap** is a 2 GB file the server can use as overflow memory, so a memory spike slows the server down instead of killing a container.

🖥️ VPS:
```bash
ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow 443/udp        # HTTP/3
ufw --force enable
ufw status

apt install -y fail2ban unattended-upgrades
systemctl enable --now fail2ban
dpkg-reconfigure -f noninteractive unattended-upgrades

fallocate -l 2G /swapfile && chmod 600 /swapfile && mkswap /swapfile && swapon /swapfile
echo '/swapfile none swap sw 0 0' >> /etc/fstab
free -h
```

🌐 Also check hPanel → **VPS → Security → Firewall**. If a Hostinger firewall is active, it must allow inbound TCP 22, 80, 443 and UDP 443 too.

> Docker opens published ports itself, bypassing ufw. That's safe here because the Compose file only publishes 80/443; the app (3000) is bound to the server's own loopback, and the database isn't published at all.

---

## Phase 2: Install Docker and prepare the app

### Step 5: Install Docker

**What it does:** installs Docker Engine and the Compose plugin from Docker's official repository.
**Why:** all four parts of the site (database, migrations, app, web server) run as containers.

🖥️ VPS:
```bash
curl -fsSL https://get.docker.com | sh
docker --version && docker compose version
```

### Step 6: Create the `deploy` user and app folder

**What it does:** creates a separate account that GitHub Actions uses to deploy, and the folder `/opt/matii` where the site lives.
**Why:** GitHub never needs root, and if its key were ever leaked you can revoke it without touching your own access.
(Members of the `docker` group can control containers, so this key is still powerful. Keep it secret.)

🖥️ VPS:
```bash
adduser --disabled-password --gecos "" deploy
usermod -aG docker deploy
mkdir -p /opt/matii/backups && chown -R deploy:deploy /opt/matii
```

### Step 7: Create the production settings file

**What it does:** writes `/opt/matii/.env.production`, which holds the passwords, keys and domain the containers use.
**Why:** secrets never go into git or into the Docker images. They live only in this file on the server.

🖥️ VPS. First generate two strong random values and copy them somewhere temporarily:
```bash
openssl rand -hex 24   # → POSTGRES_PASSWORD
openssl rand -hex 16   # → ADMIN_PASSWORD (or choose your own strong password)
```

Then create the file:
```bash
sudo -u deploy nano /opt/matii/.env.production
```
Paste the following, replace every `CHANGE_ME`, and copy the Cloudinary and AI values from your local `.env`:
```dotenv
DOMAIN="matiitechnologies.com"
IMAGE_REPOSITORY="ghcr.io/henabakos/matii-landing-page"

NEXT_PUBLIC_SITE_URL="https://matiitechnologies.com"
SEO_INDEXING_ENABLED="true"
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="CHANGE_ME"

POSTGRES_USER="matii"
POSTGRES_PASSWORD="CHANGE_ME_output_of_openssl_rand_hex_24"
POSTGRES_DB="matii"

ADMIN_PASSWORD="CHANGE_ME"
GOOGLE_SITE_VERIFICATION=""
BING_SITE_VERIFICATION=""
CLOUDINARY_CLOUD_NAME="CHANGE_ME"
CLOUDINARY_API_KEY="CHANGE_ME"
CLOUDINARY_API_SECRET="CHANGE_ME"
OPENAI_API_KEY=""
GEMINI_API_KEY=""
```
Save with `Ctrl+O`, `Enter`, `Ctrl+X`, then lock it down:
```bash
chmod 600 /opt/matii/.env.production
```

What each setting controls:

| Setting | Effect |
|---|---|
| `DOMAIN` | The hostname Caddy serves and gets a free HTTPS certificate for. |
| `IMAGE_REPOSITORY` | Where `deploy.sh` pulls the app images from (GitHub Container Registry). |
| `SEO_INDEXING_ENABLED` | `true` lets Google index the site (robots.txt, meta robots). Only `true` on this production server. |
| `POSTGRES_*` | Creates the database and its login on first start. **Never change `POSTGRES_PASSWORD` afterwards.** The database only reads it when it is first created. |
| `ADMIN_PASSWORD` | Password for `/admin/login`. |
| `CLOUDINARY_*` | Where uploaded images are stored. Without them, uploads are saved inside the database and make pages very slow. |
| `GOOGLE_/BING_SITE_VERIFICATION` | Search Console ownership tokens (Step 15). |
| `OPENAI_/GEMINI_API_KEY` | Optional: automatic translation in the admin. |

---

## Phase 3: Connect GitHub to the server

### Step 8: Create the deploy key for GitHub Actions

**What it does:** creates a key that lets GitHub Actions log in as `deploy`, and records the server's identity so GitHub can't be tricked into deploying to an impostor server.

🖥️ VPS:
```bash
sudo -u deploy bash -c '
  mkdir -p ~/.ssh && chmod 700 ~/.ssh
  ssh-keygen -t ed25519 -N "" -C "github-actions" -f ~/.ssh/github_actions
  cat ~/.ssh/github_actions.pub >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys
  cat ~/.ssh/github_actions'
```
Copy the whole printed private key, from `-----BEGIN OPENSSH PRIVATE KEY-----` to `-----END OPENSSH PRIVATE KEY-----`. You'll paste it into GitHub in Step 9. Then delete it from the server; only the `.pub` half needs to stay:
```bash
rm /home/deploy/.ssh/github_actions
```

💻 PC: get the server's identity (host key):
```powershell
ssh-keyscan 191.96.1.9
```
Copy all of the output lines.

### Step 9: Add secrets and variables in GitHub

**What it does:** gives the workflow in `.github/workflows/deploy.yml` the information it needs to reach the server.
**Why:** until `VPS_HOST` is set, pushes only test and build, and skip the deploy.

🌐 GitHub → `Henabakos/matii-landing-page` → **Settings → Secrets and variables → Actions**

**Secrets** tab → *New repository secret*:

| Name | Value |
|---|---|
| `VPS_SSH_KEY` | The private key from Step 8 |
| `VPS_KNOWN_HOSTS` | The `ssh-keyscan` output from Step 8 |

**Variables** tab → *New repository variable*:

| Name | Value |
|---|---|
| `VPS_HOST` | `191.96.1.9` |
| `VPS_USER` | `deploy` |
| `DOMAIN` | `matiitechnologies.com` |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | your Cloudinary cloud name |
| `SEO_INDEXING_ENABLED` | `true` |

Optional: **Settings → Environments → production → Required reviewers** makes every deploy wait for your click of approval.

### Step 10: Push the code and run the first deploy

**What it does:** commits the Docker and CI/CD files and pushes them to `main`. That triggers the pipeline, which:
1. type-checks the code and runs the tests;
2. builds the app and migration images and stores them in GHCR;
3. uploads `docker-compose.yml`, `Caddyfile` and the scripts to `/opt/matii`, then runs `scripts/deploy.sh`: it pulls the images, starts PostgreSQL, applies migrations, starts the app and Caddy, and waits until they are healthy.

💻 PC, in the project folder:
```powershell
git add -A
git commit -m "Add Docker deployment and CI/CD"
git push origin main
```
🌐 Watch it under GitHub → **Actions → Deploy**. The first run takes about 5–10 minutes; later runs are faster thanks to the build cache.

> The final **Smoke test** step requests `https://matiitechnologies.com`. Until Step 13 that domain still points at the old host, so a green check there does not yet prove the VPS works. Step 12 checks the VPS directly.

🖥️ VPS. Confirm the containers are running:
```bash
cd /opt/matii
docker compose --env-file .env.production ps
```
Expected: `db` and `web` show `healthy`, `caddy` shows `Up`, and `migrate` shows `Exited (0)`.

---

## Phase 4: Data and go-live

### Step 11: Copy the existing content from Neon

**What it does:** copies all current content (blog posts, projects, services, partners, KPIs, inquiries, and so on) from the Neon database into the VPS database. It only *reads* Neon.
**Why:** the VPS database starts empty.

You need the **direct** Neon connection string: `DIRECT_URL` in your local `.env` (the hostname must not contain `-pooler`).

🖥️ VPS:
```bash
sudo -iu deploy
cd /opt/matii
SOURCE_DATABASE_URL='postgresql://USER:PASSWORD@ep-XXXX.c-6.us-east-2.aws.neon.tech/neondb?sslmode=require' \
  sh scripts/docker-import-database.sh
exit
```
Expected output: `Imported 6 blog posts, 7 projects, 4 service pillars` (or your current numbers).

> Content edits made on the old site after this point are not copied. Avoid editing content until DNS is switched, or run this step again just before Step 13. It replaces the VPS data with a fresh copy.

### Step 12: Preview the new site privately before switching DNS

**What it does:** opens a secure tunnel so `http://localhost:3000` on your PC shows the app running on the VPS.
**Why:** you can check every page, the admin and the forms before any visitor is sent to the new server.

💻 PC (leave this window open while you browse):
```powershell
ssh -N -L 3000:127.0.0.1:3000 root@191.96.1.9
```
🌐 Open `http://localhost:3000`. Check the homepage, services, projects, blog posts and `/admin/login`. Press `Ctrl+C` in PowerShell when you're done.

### Step 13: Point the domain at the VPS (go-live)

**What it does:** changes DNS so `matiitechnologies.com` and `www.matiitechnologies.com` resolve to `191.96.1.9`.
**Why:** this sends visitors to the new server. Caddy notices the domain now points at it and obtains the HTTPS certificate automatically.

🌐 Wherever your domain's DNS is managed (your registrar, or Vercel if the domain uses Vercel nameservers):

1. **Before the switch (optional):** lower the TTL of the existing `@` and `www` records to 300 seconds, a few hours ahead, so the change spreads faster.
2. Edit or create these records and remove any old Vercel `A`/`CNAME` records for the same names:

   | Type | Name | Value | TTL |
   |---|---|---|---|
   | A | `@` | `191.96.1.9` | 300 |
   | A | `www` | `191.96.1.9` | 300 |

3. If an `AAAA` (IPv6) record exists for `@` or `www`, delete it. Otherwise some visitors would still reach the old host.
4. ⚠️ **Do not touch `MX`, `TXT` (SPF/DKIM/DMARC) or other email records.** Changing them would break company email.

💻 PC. Check propagation (usually minutes; can take up to a few hours):
```powershell
nslookup matiitechnologies.com 1.1.1.1
nslookup www.matiitechnologies.com 1.1.1.1
```
Both must show `191.96.1.9`.

🖥️ VPS. Watch Caddy obtain the certificate:
```bash
cd /opt/matii && docker compose --env-file .env.production logs -f caddy
```
Look for `certificate obtained successfully` for both names, then press `Ctrl+C`. If it logs errors while DNS is still propagating, that's normal; it retries automatically.

### Step 14: Verify the live site end to end

**What it does:** confirms HTTPS, redirects, SEO files and the admin all work in production.

💻 PC:
```powershell
curl.exe -sI http://matiitechnologies.com            # 308 → https://
curl.exe -sI https://www.matiitechnologies.com/blog  # 301 → https://matiitechnologies.com/blog
curl.exe -s https://matiitechnologies.com/robots.txt # "Allow: /" and the Sitemap line
curl.exe -s https://matiitechnologies.com/sitemap.xml | Select-String "<loc>" | Measure-Object
```
🌐 In a browser:
- [ ] `https://matiitechnologies.com` loads with a padlock, and all languages (`/de`, `/am`, `/om`, `/pl`) work
- [ ] `/admin/login` accepts the new `ADMIN_PASSWORD`, and editing a blog post updates the public page
- [ ] uploading an image in the admin produces a `res.cloudinary.com` URL (confirms Cloudinary is configured)
- [ ] submitting the contact form creates an entry under **Admin → Inquiries**

Optional full SEO check from the project folder: `node scripts/verify-seo.mjs https://matiitechnologies.com`.

### Step 15: Search engines

**What it does:** tells Google and Bing that the site lives here and where its sitemap is.

1. 🌐 [Google Search Console](https://search.google.com/search-console) → add a **Domain** property for `matiitechnologies.com` (verified through a DNS TXT record), **or** a URL-prefix property verified with an HTML tag. For the HTML tag, put the token in `GOOGLE_SITE_VERIFICATION` and apply it:
   ```bash
   cd /opt/matii && sudo -u deploy docker compose --env-file .env.production up -d
   ```
2. Under **Sitemaps**, submit `https://matiitechnologies.com/sitemap.xml`.
3. Repeat in [Bing Webmaster Tools](https://www.bing.com/webmasters) (it can import from Google Search Console).

### Step 16: Retire the old hosting

**What it does:** stops the old copies from running.
**Why:** the old Vercel and Neon copies could serve outdated content or accept admin edits that the new site never sees.

After a few days of the VPS running cleanly:
- 🌐 Vercel: remove the domain from the project and disconnect Git (or delete the project).
- 🌐 Neon: keep the database a little longer as a fallback copy, then delete or suspend it.

---

## Phase 5: Running it day to day

### Step 17: Daily database backups

**What it does:** dumps the database every night at 03:00, keeps 14 days of dumps in `/opt/matii/backups`, and deletes older ones.
**Why:** Hostinger's weekly snapshot could lose up to 7 days of content; this limits the loss to one day.

🖥️ VPS:
```bash
sudo -u deploy crontab -e
```
Add this line (the `\%` escapes are required inside crontab):
```cron
0 3 * * * cd /opt/matii && docker compose --env-file .env.production exec -T db sh -c 'pg_dump -U "$POSTGRES_USER" -d "$POSTGRES_DB" -Fc' > backups/matii-$(date +\%F).dump && find backups -name '*.dump' -mtime +14 -delete
```
Every so often, also copy a backup off the server:
```powershell
scp root@191.96.1.9:/opt/matii/backups/matii-YYYY-MM-DD.dump .
```
To restore one, see [DOCKER-DEPLOYMENT.md → Backups](DOCKER-DEPLOYMENT.md#5-backups).

### Everyday tasks

| Task | How |
|---|---|
| Deploy a change | Push to `main`. That's all. |
| Watch a deploy | GitHub → Actions |
| Roll back | 🌐 GitHub → Actions → open an older successful run → **Re-run all jobs**. Database migrations are not undone, so only roll back to code that works with the current database. |
| App logs | 🖥️ `cd /opt/matii && docker compose --env-file .env.production logs -f web` |
| Status | 🖥️ `docker compose --env-file .env.production ps` |
| Restart the app | 🖥️ `docker compose --env-file .env.production restart web` |
| Change a setting in `.env.production` | Edit it, then 🖥️ `sudo -u deploy docker compose --env-file .env.production up -d`. `NEXT_PUBLIC_*` values are compiled in, so change the GitHub variable and re-run the workflow instead. |
| Update Postgres/Caddy patch versions | 🖥️ `docker compose --env-file .env.production pull db caddy && docker compose --env-file .env.production up -d db caddy` |
| Free disk space | 🖥️ `docker system prune -f` (never add `--volumes`) |
| Reboot | 🖥️ `reboot`. All containers restart automatically. |

⚠️ Never run `docker compose down -v`: `-v` deletes the database volume.

### Troubleshooting

| Symptom | Cause and fix |
|---|---|
| Deploy job: `Permission denied (publickey)` | `VPS_SSH_KEY` doesn't match `/home/deploy/.ssh/authorized_keys`. Redo Step 8. |
| Deploy job: `Host key verification failed` | `VPS_KNOWN_HOSTS` is missing or wrong (or the server was reinstalled). Redo the `ssh-keyscan` part of Step 8. |
| Deploy job: `Missing .env.production` | Step 7 was skipped, or the file isn't in `/opt/matii`. |
| Deploy job: `denied` when pulling from ghcr.io | Under GitHub → your profile → Packages → `matii-landing-page` → Package settings, make sure the repository has access. |
| `migrate` shows `Exited (1)` | 🖥️ `docker compose --env-file .env.production logs migrate`. Usually a wrong `POSTGRES_PASSWORD` after the database was first created. |
| Browser shows a certificate warning | DNS isn't pointing at `191.96.1.9` yet, or ports 80/443 are blocked by the hPanel firewall. Check `logs caddy`. |
| Pages show old content after an import | Run the import script again; it clears the cache. Or 🖥️ `docker compose --env-file .env.production restart web`. |

---

## ⚠️ Fix before or right after launch: admin login security

The admin session cookie is currently a **fixed value written in the source code** (`src/lib/auth.ts`). Anyone who has seen the repository can set that cookie in their browser and open `/admin` without the password. The same weakness exists on the current host. Changing the cookie to a signed, per-login value tied to `ADMIN_PASSWORD` closes it. This is a small code change; deploy it through the normal push-to-`main` flow.
