# Deployment & Operations (V1)

## Overview
Loopreel V1 is designed to be fully portable for local development via Docker Compose, and easily deployable in production using a distributed topology (Oracle Cloud VPS + Home Server connected via Tailscale mesh VPN).

## Specification

### Development Environment (Docker Compose)
A single `docker-compose.yml` file at the repository root orchestrates the entire local stack.

**Services:**
- `postgres`: PostgreSQL 16
- `redis`: Redis 7
- `api`: The Fastify API server
- `web`: The Vite React frontend
- `worker-relay`: Dedicated singleton outbox poller
- `worker-ingest`: Handles yt-dlp & cheerio
- `worker-transcribe`: Handles faster-whisper API calls
- `worker-structure`: Handles LLM API calls
- `worker-render`: Handles Playwright rendering pool
- `faster-whisper`: Local transcription HTTP server (e.g., `onerahmet/openai-whisper-asr-webservice`)

### Production Topology
Production splits the workload across two physical locations connected by Tailscale.

**Oracle Cloud VPS (Public Facing):**
- Fastify API (Public endpoints)
- Vite Web App
- PostgreSQL + Redis
- `worker-relay` (Polling outbox)
- `worker-structure` (I/O bound)
- `worker-render` (Playwright needs robust networking)

**Home Server (Private, Behind NAT):**
- `worker-ingest` (Heavy download bandwidth)
- `worker-transcribe` (Heavy CPU usage)
- `faster-whisper` (Heavy CPU usage)

**Networking:**
The Home Server connects to Postgres and Redis on the Oracle VPS exclusively through the Tailscale IP addresses (e.g., `100.x.y.z`). No database ports are exposed to the public internet.

## Examples

### Local Start
```bash
# Start infrastructure only (DB + Redis)
docker compose up -d postgres redis

# Run migrations (assuming pnpm workspace)
pnpm --filter @loopreel/db run migrate

# Start all applications via Turborepo
npx turbo run dev
```

### Environment Variables (.env)
The system requires a strict `.env` file at the root.

```env
# Infrastructure
DATABASE_URL="postgresql://user:password@localhost:5432/loopreel?schema=public"
REDIS_URL="redis://localhost:6379"

# External APIs
LLM_API_KEY="sk-..."       # DeepSeek or OpenAI key
LLM_BASE_URL="..."         # Only needed for DeepSeek/Alternative hosts

# Cloudflare R2 Storage
R2_ACCOUNT_ID="..."
R2_ACCESS_KEY_ID="..."
R2_SECRET_ACCESS_KEY="..."
R2_BUCKET_NAME="..."
```

## Error Handling & Operations

- **Worker Disconnects:** If a home server worker drops off Tailscale, the API must detect it via the `worker_instances` heartbeat table and alert. Unfinished jobs will time out (TTL) and fail safely.
- **Data Persistence:** Production Postgres requires daily automated logical backups (`pg_dump`) uploaded to an isolated R2 bucket.
- **Migration Failures:** Migrations are run manually in production before new application code deployment. No automated on-start migrations in production to prevent schema corruption.

## Checklist for Implementation
- [ ] Create `docker-compose.yml` defining all services, volumes, and networks.
- [ ] Ensure `.env.example` contains all required keys.
- [ ] Document Tailscale installation and routing configuration for the Home Server.
- [ ] Implement `pg_dump` cron job script for database backups.
