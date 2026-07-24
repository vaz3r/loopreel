FROM node:24-slim AS base
ENV CI=true
RUN corepack enable && corepack prepare pnpm@11.13.1 --activate
WORKDIR /app

FROM base AS deps
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY packages/schemas/package.json ./packages/schemas/
COPY packages/types/package.json ./packages/types/
COPY packages/loop/package.json ./packages/loop/
RUN pnpm install --frozen-lockfile

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages/*/node_modules ./packages/*/node_modules/
COPY . .
RUN pnpm --filter @loopreel/schemas build
RUN pnpm --filter @loopreel/types build

FROM base AS runner
WORKDIR /app
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY packages/schemas/package.json ./packages/schemas/
COPY packages/types/package.json ./packages/types/
COPY packages/loop/package.json ./packages/loop/
RUN pnpm install --frozen-lockfile
COPY --from=builder /app/packages/schemas/dist ./packages/schemas/dist
COPY --from=builder /app/packages/types/dist ./packages/types/dist
COPY packages/loop ./packages/loop

EXPOSE 5173
CMD ["pnpm", "--filter", "@loopreel/loop", "exec", "vite", "--host"]
