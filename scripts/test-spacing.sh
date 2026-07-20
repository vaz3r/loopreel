#!/usr/bin/env bash
set -euo pipefail

# Test script to verify spacing between regmarks and content
# Creates a test job and renders slides to check spacing

API_URL="${API_URL:-http://localhost:3000}"
RENDER_URL="${RENDER_URL:-http://localhost:5173}"
OUTPUT_DIR="./slides-output/spacing-test"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
RENDER_PKG="$ROOT_DIR/apps/worker-render"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

log()  { echo -e "${CYAN}[test]${NC} $*"; }
ok()   { echo -e "${GREEN}[ok]${NC} $*"; }
warn() { echo -e "${YELLOW}[warn]${NC} $*"; }
err()  { echo -e "${RED}[error]${NC} $*" >&2; }

# Check if API is running
HTTP_CODE=$(curl -so /dev/null -w "%{http_code}" "$API_URL/api/jobs/00000000-0000-0000-0000-000000000000" 2>/dev/null || echo "000")
if [[ "$HTTP_CODE" == "000" ]]; then
  err "API not reachable at $API_URL"
  exit 1
fi
ok "API is up at $API_URL"

# Check if Vite dev server is running
if ! curl -sf "$RENDER_URL" -o /dev/null 2>/dev/null; then
  err "Vite dev server not reachable at $RENDER_URL"
  exit 1
fi
ok "Vite dev server is up at $RENDER_URL"

# Create test job with mock content
log "Creating test job with mock content..."

# Use the mock LLM endpoint to create a test job
CREATE_RESPONSE=$(curl -sf -X POST "$API_URL/api/jobs" \
  -H "Content-Type: application/json" \
  -d '{"sourceUrl": "https://example.com/test-spacing", "templateId": "void-editorial", "platform": "instagram-feed"}')

JOB_ID=$(echo "$CREATE_RESPONSE" | grep -o '"jobId"[[:space:]]*:[[:space:]]*"[^"]*"' | sed 's/.*"jobId"[[:space:]]*:[[:space:"]*//' | sed 's/"$//')

if [[ -z "$JOB_ID" ]]; then
  err "Failed to parse job ID from response: $CREATE_RESPONSE"
  exit 1
fi
ok "Test job created: $JOB_ID"

# Wait for job to complete
log "Waiting for job to complete..."
MAX_WAIT=300
ELAPSED=0

while [[ $ELAPSED -lt $MAX_WAIT ]]; do
  RESPONSE=$(curl -sf "$API_URL/api/jobs/$JOB_ID" 2>/dev/null || echo '{}')
  STATUS=$(echo "$RESPONSE" | grep -o '"status"[[:space:]]*:[[:space:]]*"[^"]*"' | sed 's/.*"status"[[:space:]]*:[[:space:"]*//' | sed 's/"$//')

  case "$STATUS" in
    complete)
      break
      ;;
    failed)
      ERROR_MSG=$(echo "$RESPONSE" | grep -o '"errorMessage"[[:space:]]*:[[:space:]]*"[^"]*"' | sed 's/.*"errorMessage"[[:space:]]*:[[:space:"]*//' | sed 's/"$//')
      err "Job failed: $ERROR_MSG"
      exit 1
      ;;
    *)
      printf "\r  [%ds] %s" "$ELAPSED" "$STATUS"
      sleep 3
      ELAPSED=$((ELAPSED + 3))
      ;;
  esac
done

echo ""
if [[ "$STATUS" != "complete" ]]; then
  err "Timed out after ${MAX_WAIT}s (last status: $STATUS)"
  exit 1
fi
ok "Job complete!"

# Get slide count
RESPONSE=$(curl -sf "$API_URL/api/jobs/$JOB_ID")
SLIDE_COUNT=$(echo "$RESPONSE" | grep -o '"slideCount"[[:space:]]*:[[:space:]]*[0-9]*' | sed 's/.*://' | tr -d ' ')

if [[ -z "$SLIDE_COUNT" || "$SLIDE_COUNT" -eq 0 ]]; then
  err "No slides found"
  exit 1
fi
ok "Slides to render: $SLIDE_COUNT"

# Create output directory
mkdir -p "$OUTPUT_DIR"
OUTPUT_DIR="$(cd "$OUTPUT_DIR" && pwd)"

# Render each slide
log "Capturing slides to check spacing..."
echo ""

CAPTURED=0
for i in $(seq 0 $((SLIDE_COUNT - 1))); do
  URL="$RENDER_URL/render/$JOB_ID/$i?template=void-editorial"
  FILENAME="void-editorial-slide-$((i + 1)).png"
  FILEPATH="$OUTPUT_DIR/$FILENAME"

  (cd "$RENDER_PKG" && npx playwright screenshot \
    --viewport-size="1080,1080" \
    --wait-for-timeout=3000 \
    "$URL" \
    "$FILEPATH" 2>/dev/null)

  if [[ -f "$FILEPATH" ]]; then
    SIZE=$(stat -c%s "$FILEPATH" 2>/dev/null || stat -f%z "$FILEPATH" 2>/dev/null || echo "?")
    ok "  Slide $((i + 1))/$SLIDE_COUNT  $FILENAME  ($SIZE bytes)"
    CAPTURED=$((CAPTURED + 1))
  else
    warn "  Slide $((i + 1))/$SLIDE_COUNT  FAILED"
  fi
done

# Summary
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
ok "Done! $CAPTURED/$SLIDE_COUNT slides captured."
echo ""
echo "  Job ID:    $JOB_ID"
echo "  Template:  void-editorial"
echo "  Output:    $OUTPUT_DIR/"
echo ""
echo "Check the rendered slides to verify spacing between regmarks and content."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"