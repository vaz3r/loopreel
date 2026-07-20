#!/usr/bin/env bash
set -euo pipefail

# Test spacing on all 4 templates

API_URL="${API_URL:-http://localhost:3000}"
RENDER_URL="${RENDER_URL:-http://localhost:3000}"
ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
RENDER_PKG="$ROOT_DIR/apps/worker-render"

RED='\033[0;31m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
NC='\033[0m'

log()  { echo -e "${CYAN}[test]${NC} $*"; }
ok()   { echo -e "${GREEN}[ok]${NC} $*"; }
err()  { echo -e "${RED}[error]${NC} $*" >&2; }

TEMPLATES=("void-editorial" "archive-paper" "industrial-brutal" "custom-brand")
OUTPUT_BASE="$ROOT_DIR/slides-output/all-templates"

for TEMPLATE in "${TEMPLATES[@]}"; do
  log "━━━ Testing: $TEMPLATE ━━━"
  OUTPUT_DIR="$OUTPUT_BASE/$TEMPLATE"
  mkdir -p "$OUTPUT_DIR"

  # Create job
  CREATE_RESPONSE=$(curl -sf -X POST "$API_URL/api/jobs" \
    -H "Content-Type: application/json" \
    -d "{\"sourceUrl\": \"https://example.com/test-$TEMPLATE\", \"templateId\": \"$TEMPLATE\", \"platform\": \"instagram-feed\"}")

  JOB_ID=$(echo "$CREATE_RESPONSE" | grep -o '"jobId"[[:space:]]*:[[:space:]]*"[^"]*"' | sed 's/.*"jobId"[[:space:]]*:[[:space:]]*"//' | sed 's/"$//')
  ok "Job created: $JOB_ID"

  # Wait for completion
  MAX_WAIT=300
  ELAPSED=0
  while [[ $ELAPSED -lt $MAX_WAIT ]]; do
    RESPONSE=$(curl -sf "$API_URL/api/jobs/$JOB_ID" 2>/dev/null || echo '{}')
    STATUS=$(echo "$RESPONSE" | grep -o '"status"[[:space:]]*:[[:space:]]*"[^"]*"' | sed 's/.*"status"[[:space:]]*:[[:space:]]*"//' | sed 's/"$//')
    case "$STATUS" in
      complete) break ;;
      failed)
        ERROR_MSG=$(echo "$RESPONSE" | grep -o '"errorMessage"[[:space:]]*:[[:space:]]*"[^"]*"' | sed 's/.*"errorMessage"[[:space:]]*:[[:space:]]*"//' | sed 's/"$//')
        err "Job failed: $ERROR_MSG"
        continue 2
        ;;
      *) sleep 3; ELAPSED=$((ELAPSED + 3)) ;;
    esac
  done

  if [[ "$STATUS" != "complete" ]]; then
    err "Timed out for $TEMPLATE"
    continue
  fi

  # Get slide count
  RESPONSE=$(curl -sf "$API_URL/api/jobs/$JOB_ID")
  SLIDE_COUNT=$(echo "$RESPONSE" | grep -o '"slideCount"[[:space:]]*:[[:space:]]*[0-9]*' | sed 's/.*://' | tr -d ' ')
  ok "Slides: $SLIDE_COUNT"

  # Render each slide
  for i in $(seq 0 $((SLIDE_COUNT - 1))); do
    HTML=$(curl -sf "$RENDER_URL/internal/render/$JOB_ID/$i" 2>/dev/null || echo "")
    if [[ -z "$HTML" ]]; then
      echo "  Slide $((i + 1))/$SLIDE_COUNT FAILED"
      continue
    fi

    HTML_FILE="$OUTPUT_DIR/slide-$((i + 1)).html"
    PNG_FILE="$OUTPUT_DIR/$TEMPLATE-slide-$((i + 1)).png"
    echo "$HTML" > "$HTML_FILE"

    (cd "$ROOT_DIR" && node scripts/smart-screenshot.mjs \
      "$HTML_FILE" \
      "$PNG_FILE" \
      "1080,1350" 2>/dev/null)

    if [[ -f "$PNG_FILE" ]]; then
      SIZE=$(stat -c%s "$PNG_FILE" 2>/dev/null || echo "?")
      echo "  Slide $((i + 1))/$SLIDE_COUNT OK ($SIZE bytes)"
    else
      echo "  Slide $((i + 1))/$SLIDE_COUNT FAILED"
    fi
  done

  ok "$TEMPLATE complete"
  echo ""
done

ok "All templates done! Output: $OUTPUT_BASE/"