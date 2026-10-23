# syntax=docker/dockerfile:1.7
# Production image for the MATII TECHNOLOGIES site (Next.js standalone + Prisma).

ARG NODE_IMAGE=node:22-alpine

# OS packages shared by every stage. Prisma's query engine needs OpenSSL.
FROM ${NODE_IMAGE} AS os
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

FROM os AS pnpm
RUN corepack enable && corepack prepare pnpm@10.33.2 --activate

FROM pnpm AS deps
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

FROM pnpm AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Inlined into the client bundle and baked into prerendered robots.txt and
# next.config headers, so they must be known at build time. Keep
# SEO_INDEXING_ENABLED=false for staging images.
ARG NEXT_PUBLIC_SITE_URL=https://matiitechnologies.com
ARG NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
ARG SEO_INDEXING_ENABLED=false
ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL} \
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=${NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME} \
    SEO_INDEXING_ENABLED=${SEO_INDEXING_ENABLED}
# Pages read the CMS at request time, so the build needs no database access.
RUN pnpm exec prisma generate && pnpm exec next build

# One-shot job that applies committed migrations (needs DATABASE_URL/DIRECT_URL).
FROM builder AS migrator
CMD ["pnpm", "exec", "prisma", "migrate", "deploy"]

FROM os AS runner
ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME=0.0.0.0
RUN addgroup -S -g 1001 nodejs && adduser -S -u 1001 -G nodejs nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# ISR and optimized-image cache; mounted as a volume in docker-compose.yml.
RUN mkdir -p .next/cache && chown nextjs:nodejs .next/cache
USER nextjs
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
    CMD wget -qO /dev/null http://127.0.0.1:3000/robots.txt || exit 1
CMD ["node", "server.js"]
