#!/bin/bash
set -e

# Generate runtime-config.js from environment variables at container start.
# Cloud Run secrets are injected as env vars; this script makes them available
# to the static frontend via window.RUNTIME_CONFIG.

RUNTIME_CONFIG_PATH="/usr/share/nginx/html/runtime-config.js"

# Prefer API_KEY, fall back to GEMINI_API_KEY for compatibility.
RESOLVED_API_KEY="${API_KEY:-${GEMINI_API_KEY:-}}"

cat > "${RUNTIME_CONFIG_PATH}" <<EOF
window.RUNTIME_CONFIG = {
  API_KEY: "${RESOLVED_API_KEY}",
  GEMINI_API_KEY: "${RESOLVED_API_KEY}"
};
EOF

echo "runtime-config.js generated at ${RUNTIME_CONFIG_PATH}"
