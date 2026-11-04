FROM node:24-slim AS base
ENV CI=true
RUN corepack enable && corepack prepare pnpm@11.13.1 --activate
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 python3-pip yt-dlp ffmpeg \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /app

FROM base AS deps
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY packages/db/package.json ./packages/db/
COPY packages/schemas/package.json ./packages/schemas/
COPY packages/storage/package.json ./packages/storage/
COPY packages/queue/package.json ./packages/queue/
COPY apps/worker-ingest/package.json ./apps/worker-ingest/
RUN pnpm install --frozen-lockfile

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages/*/node_modules ./packages/*/node_modules/
COPY --from=deps /app/apps/*/node_modules ./apps/*/node_modules/
COPY . .
RUN pnpm --filter @loopreel/db build
RUN pnpm --filter @loopreel/schemas build
RUN pnpm --filter @loopreel/storage build
RUN pnpm --filter @loopreel/queue build
RUN pnpm --filter @loopreel/worker-ingest build

FROM base AS runner
ENV CI=true
RUN corepack enable && corepack prepare pnpm@11.13.1 --activate
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 python3-pip yt-dlp ffmpeg \
    libnss3 libnspr4 libatk1.0-0 libatk-bridge2.0-0 libcups2 \
    libdrm2 libxkbcommon0 libxcomposite1 libxdamage1 libxrandr2 \
    libgbm1 libpango-1.0-0 libcairo2 libasound2 libatspi2.0-0 \
    libxshmfence1 \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY packages/db/package.json ./packages/db/
COPY packages/schemas/package.json ./packages/schemas/
COPY packages/storage/package.json ./packages/storage/
COPY packages/queue/package.json ./packages/queue/
COPY apps/worker-ingest/package.json ./apps/worker-ingest/
RUN pnpm install --frozen-lockfile --prod
COPY --from=builder /app/packages/db/dist ./packages/db/dist
COPY --from=builder /app/packages/db/migrations ./packages/db/migrations
COPY --from=builder /app/packages/schemas/dist ./packages/schemas/dist
COPY --from=builder /app/packages/storage/dist ./packages/storage/dist
COPY --from=builder /app/packages/queue/dist ./packages/queue/dist
COPY --from=builder /app/apps/worker-ingest/dist ./apps/worker-ingest/dist

CMD ["node", "apps/worker-ingest/dist/index.js"]
