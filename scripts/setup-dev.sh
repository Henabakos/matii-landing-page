#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

# Keep dependency caches and writable development data out of Git.
export XDG_DATA_HOME="${XDG_DATA_HOME:-$PWD/.local/share}"
export XDG_CACHE_HOME="${XDG_CACHE_HOME:-$PWD/.local/cache}"
mkdir -p .local

# pnpm 11 requires explicit approval of dependency installation scripts.
# Preserve any existing workspace configuration; remove only our temporary file.
if [ ! -e pnpm-workspace.yaml ]; then
  trap 'rm -f pnpm-workspace.yaml' EXIT
  cat > pnpm-workspace.yaml <<'YAML'
allowBuilds:
  '@parcel/watcher': true
  '@prisma/client': true
  '@prisma/engines': true
  '@swc/core': true
  esbuild: true
  prisma: true
  sharp: true
  unrs-resolver: true
YAML
fi
pnpm install --frozen-lockfile --store-dir "${MATII_PNPM_STORE:-$PWD/.local/pnpm-store}"

# Never seed automatically: the seed script deletes existing content.
if [ ! -e .local/dev.db ]; then
  cp prisma/dev.db .local/dev.db
fi
export DATABASE_URL="${DATABASE_URL:-file:../.local/dev.db}"
node_modules/.bin/prisma generate
node_modules/.bin/prisma db push
