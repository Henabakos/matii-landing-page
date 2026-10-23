#!/bin/sh
# Deploy (or roll back) the site on the VPS from images built by GitHub Actions.
#
# Usage, from the app directory on the VPS:
#   sh scripts/deploy.sh             # newest build of main
#   sh scripts/deploy.sh <commit>    # a specific build, e.g. to roll back
#
# IMAGE_REPOSITORY (e.g. ghcr.io/henabakos/matii-landing-page) comes from the
# environment or .env.production. Pulling a private image needs a prior
# `docker login ghcr.io`; the CI workflow does this for its own deploys.
set -eu
cd "$(dirname "$0")/.."

if [ ! -f .env.production ]; then
  echo "Missing .env.production: copy .env.production.example and fill it in." >&2
  exit 1
fi
if [ -z "${IMAGE_REPOSITORY:-}" ] && ! grep -q '^IMAGE_REPOSITORY=..' .env.production; then
  echo "Set IMAGE_REPOSITORY in .env.production." >&2
  exit 1
fi
# Shell variables take precedence over the env file in Compose interpolation.
export IMAGE_TAG="${1:-latest}"
compose() { docker compose --env-file .env.production "$@"; }

echo "Deploying image tag $IMAGE_TAG"
compose pull migrate web
# Migrations run first; web is replaced only if they succeed, and --wait fails
# the deploy if the new container does not become healthy.
compose up -d --no-build --wait --remove-orphans
docker image prune -f >/dev/null
compose ps
echo "Deployed $IMAGE_TAG"
