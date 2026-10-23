# CI/CD: automatic deploys from `main`

Every push to `main` runs [.github/workflows/deploy.yml](../.github/workflows/deploy.yml):

1. **test**: `tsc --noEmit` and all unit tests. A failure stops the pipeline and nothing is deployed.
2. **build**: builds the app and migration images and pushes them to GitHub Container Registry (GHCR) as `ghcr.io/henabakos/matii-landing-page[-migrate]`, tagged with the commit SHA and `latest`. The VPS never compiles anything.
3. **deploy**: copies the Compose files to the VPS over SSH and runs `scripts/deploy.sh <sha>` there. That script pulls the images, runs migrations, replaces the `web` container and waits for it to become healthy. A smoke test then requests the live site.

Pushes deploy one at a time in order. A typical run takes a few minutes; the site is unavailable for only a few seconds while `web` restarts. You can also start a deploy from the **Actions** tab (**Deploy → Run workflow**).

ESLint is not part of the gate yet because the codebase currently has existing lint errors. Add `pnpm lint` to the test job once they are fixed.

## One-time setup

### 1. On the VPS

Follow [DOCKER-DEPLOYMENT.md](DOCKER-DEPLOYMENT.md) steps 1–2 for DNS, Docker and the firewall, then create a deploy user and the app directory:

```bash
sudo adduser --disabled-password --gecos "" deploy
sudo usermod -aG docker deploy
sudo mkdir -p /opt/matii && sudo chown deploy:deploy /opt/matii
```

Create `/opt/matii/.env.production` from [.env.production.example](../.env.production.example) and fill it in. Keep `IMAGE_REPOSITORY="ghcr.io/henabakos/matii-landing-page"`. The first deploy stops with a clear message if this file is missing.

### 2. An SSH key for GitHub

On your own machine:

```bash
ssh-keygen -t ed25519 -f matii_deploy -N "" -C "github-actions-deploy"
ssh-copy-id -i matii_deploy.pub deploy@YOUR_VPS_IP     # or append it to ~deploy/.ssh/authorized_keys
ssh-keyscan -H YOUR_VPS_IP                              # check it matches the server's real host key
```

### 3. In GitHub: Settings → Secrets and variables → Actions

**Secrets**

| Name | Value |
|------|-------|
| `VPS_SSH_KEY` | Contents of the private key file `matii_deploy` |
| `VPS_KNOWN_HOSTS` | Output of `ssh-keyscan -H YOUR_VPS_IP` |

**Variables**

| Name | Default | Notes |
|------|---------|-------|
| `VPS_HOST` | (none) | **Required.** The deploy job is skipped until this is set. |
| `VPS_USER` | `deploy` | |
| `VPS_PORT` | `22` | |
| `VPS_APP_DIR` | `/opt/matii` | |
| `DOMAIN` | `matiitechnologies.com` | Used for the smoke test and environment link. |
| `NEXT_PUBLIC_SITE_URL` | `https://matiitechnologies.com` | Baked into the image. |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | empty | Baked into the image. |
| `SEO_INDEXING_ENABLED` | `true` | Set to `false` if this pipeline deploys a staging server. |

The workflow uses the built-in `GITHUB_TOKEN` to push images and to let the VPS pull them during a deploy, so you don't need a registry password. To require approval before each deploy, add required reviewers to the `production` environment under **Settings → Environments**.

Then push to `main` (or use **Run workflow**) and follow the run in the **Actions** tab.

## Updating the VPS by hand

From `/opt/matii` on the VPS:

```bash
sh scripts/deploy.sh             # pull and run the newest build of main
sh scripts/deploy.sh <commit>    # run a specific build, e.g. to roll back
```

The images are private by default, so log in once with a GitHub personal access token that has the `read:packages` scope: `docker login ghcr.io -u Henabakos`. Alternatively, make the two packages public under your GitHub profile → **Packages**.

Rolling back replaces only the app. Database migrations are not reversed, so roll back only to a commit whose code works with the current schema.

### Keeping the server itself up to date

- OS security patches: `sudo apt install unattended-upgrades && sudo dpkg-reconfigure -plow unattended-upgrades`.
- Postgres and Caddy patch releases: `docker compose --env-file .env.production pull db caddy && docker compose --env-file .env.production up -d db caddy`. Postgres restarts for a few seconds.
