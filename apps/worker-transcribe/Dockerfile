FROM node:24-slim AS base
ENV CI=true
RUN corepack enable && corepack prepare pnpm@11.13.1 --activate
WORKDIR /app

FROM base AS deps
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY packages/db/package.json ./packages/db/
COPY packages/schemas/package.json ./packages/schemas/
COPY packages/types/package.json ./packages/types/
COPY packages/storage/package.json ./packages/storage/
COPY packages/queue/package.json ./packages/queue/
COPY packages/errors/package.json ./packages/errors/
COPY apps/worker-transcribe/package.json ./apps/worker-transcribe/
RUN pnpm install --frozen-lockfile

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages/*/node_modules ./packages/*/node_modules/
COPY --from=deps /app/apps/*/node_modules ./apps/*/node_modules/
COPY . .
RUN pnpm --filter @loopreel/db build
RUN pnpm --filter @loopreel/schemas build
RUN pnpm --filter @loopreel/types build
RUN pnpm --filter @loopreel/storage build
RUN pnpm --filter @loopreel/queue build
RUN pnpm --filter @loopreel/errors build
RUN pnpm --filter @loopreel/worker-transcribe build

FROM base AS runner
WORKDIR /app
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY packages/db/package.json ./packages/db/
COPY packages/schemas/package.json ./packages/schemas/
COPY packages/types/package.json ./packages/types/
COPY packages/storage/package.json ./packages/storage/
COPY packages/queue/package.json ./packages/queue/
COPY packages/errors/package.json ./packages/errors/
COPY apps/worker-transcribe/package.json ./apps/worker-transcribe/
RUN pnpm install --frozen-lockfile --prod
COPY --from=builder /app/packages/db/dist ./packages/db/dist
COPY --from=builder /app/packages/db/migrations ./packages/db/migrations
COPY --from=builder /app/packages/schemas/dist ./packages/schemas/dist
COPY --from=builder /app/packages/types/dist ./packages/types/dist
COPY --from=builder /app/packages/storage/dist ./packages/storage/dist
COPY --from=builder /app/packages/queue/dist ./packages/queue/dist
COPY --from=builder /app/packages/errors/dist ./packages/errors/dist
COPY --from=builder /app/apps/worker-transcribe/dist ./apps/worker-transcribe/dist

CMD ["node", "apps/worker-transcribe/dist/index.js"]
