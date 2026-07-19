FROM node:24-slim AS base
ENV CI=true
RUN corepack enable && corepack prepare pnpm@11.13.1 --activate
RUN npx playwright install --with-deps chromium
WORKDIR /app

FROM base AS deps
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY packages/db/package.json ./packages/db/
COPY packages/schemas/package.json ./packages/schemas/
COPY packages/types/package.json ./packages/types/
COPY packages/storage/package.json ./packages/storage/
COPY packages/queue/package.json ./packages/queue/
COPY packages/errors/package.json ./packages/errors/
COPY packages/design/package.json ./packages/design/
COPY packages/templates/package.json ./packages/templates/
COPY apps/worker-render/package.json ./apps/worker-render/
RUN pnpm install --frozen-lockfile

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages/*/node_modules ./packages/*/node_modules/
COPY --from=deps /app/apps/*/node_modules ./apps/*/node_modules/
COPY . .
RUN pnpm --filter @loopreel/schemas build
RUN pnpm --filter @loopreel/types build
RUN pnpm --filter @loopreel/db build
RUN pnpm --filter @loopreel/storage build
RUN pnpm --filter @loopreel/queue build
RUN pnpm --filter @loopreel/errors build
RUN pnpm --filter @loopreel/design build
RUN pnpm --filter @loopreel/templates build
RUN pnpm --filter @loopreel/worker-render build

FROM base AS runner
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/packages/db/dist ./packages/db/dist
COPY --from=builder /app/packages/db/migrations ./packages/db/migrations
COPY --from=builder /app/packages/db/package.json ./packages/db/
COPY --from=builder /app/packages/schemas/dist ./packages/schemas/dist
COPY --from=builder /app/packages/schemas/package.json ./packages/schemas/
COPY --from=builder /app/packages/types/dist ./packages/types/dist
COPY --from=builder /app/packages/types/package.json ./packages/types/
COPY --from=builder /app/packages/storage/dist ./packages/storage/dist
COPY --from=builder /app/packages/storage/package.json ./packages/storage/
COPY --from=builder /app/packages/queue/dist ./packages/queue/dist
COPY --from=builder /app/packages/queue/package.json ./packages/queue/
COPY --from=builder /app/packages/errors/dist ./packages/errors/dist
COPY --from=builder /app/packages/errors/package.json ./packages/errors/
COPY --from=builder /app/packages/design/dist ./packages/design/dist
COPY --from=builder /app/packages/design/package.json ./packages/design/
COPY --from=builder /app/packages/templates/dist ./packages/templates/dist
COPY --from=builder /app/packages/templates/src/editorial-runway/prompt.txt ./packages/templates/dist/editorial-runway/prompt.txt
COPY --from=builder /app/packages/templates/package.json ./packages/templates/
COPY --from=builder /app/apps/worker-render/dist ./apps/worker-render/dist
COPY --from=builder /app/apps/worker-render/package.json ./apps/worker-render/
COPY --from=builder /app/apps/*/node_modules ./apps/*/node_modules/
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-workspace.yaml ./

EXPOSE 8004
CMD ["node", "apps/worker-render/dist/index.js"]
