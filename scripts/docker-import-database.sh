#!/bin/sh
# Copy all content from an existing PostgreSQL database (e.g. Neon) into the
# Docker Compose `db` service, replacing what is there.
#
# Usage: SOURCE_DATABASE_URL='postgresql://...' sh scripts/docker-import-database.sh
# Use the direct (non -pooler) Neon URL. Run from the project root.
set -eu

: "${SOURCE_DATABASE_URL:?Set SOURCE_DATABASE_URL to the database to copy from}"
ENV_FILE="${ENV_FILE:-.env.production}"
compose() { MSYS_NO_PATHCONV=1 docker compose --env-file "$ENV_FILE" "$@"; }

compose up -d --wait db
echo "Copying public schema into the Docker database..."
# pg_dump runs in a throwaway postgres:18 container so the host needs no client tools.
MSYS_NO_PATHCONV=1 docker run --rm postgres:18-alpine \
  pg_dump "$SOURCE_DATABASE_URL" --schema=public --format=custom --no-owner --no-acl \
  | compose exec -T db sh -c 'pg_restore --clean --if-exists --no-owner --no-acl --single-transaction -U "$POSTGRES_USER" -d "$POSTGRES_DB"'
compose exec -T db sh -c 'psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -At' <<'SQL'
select 'Imported ' || (select count(*) from "BlogPost") || ' blog posts, ' || (select count(*) from "Project") || ' projects, ' || (select count(*) from "ServicePillar") || ' service pillars';
SQL
# The CMS data cache lives in the next_cache volume and would keep serving the
# previous content, so clear it when the app is running.
if [ -n "$(compose ps -q web)" ]; then
  compose exec -T web rm -rf /app/.next/cache/fetch-cache
  compose restart web
fi
echo "Done."
