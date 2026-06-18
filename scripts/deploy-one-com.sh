#!/usr/bin/env bash
# Manual deploy to one.com (same files as GitHub Actions). Requires rsync + SSH.
# Usage:
#   export ONE_COM_HOST="ssh.cwx7lhli3.service.one"
#   export ONE_COM_USER="cwx7lhli3_ssh"
#   export ONE_COM_REMOTE_DIR="www"
#   export ONE_COM_PASS="..."
#   ./scripts/deploy-one-com.sh

set -euo pipefail

: "${ONE_COM_HOST:?Set ONE_COM_HOST}"
: "${ONE_COM_USER:?Set ONE_COM_USER}"
: "${ONE_COM_REMOTE_DIR:?Set ONE_COM_REMOTE_DIR (e.g. www)}"
: "${ONE_COM_PASS:?Set ONE_COM_PASS}"

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
REMOTE="${ONE_COM_USER}@${ONE_COM_HOST}:${ONE_COM_REMOTE_DIR}/"

export RSYNC_RSH="ssh -p 22 -o StrictHostKeyChecking=accept-new"
if command -v sshpass >/dev/null 2>&1; then
  export RSYNC_RSH="sshpass -e ssh -p 22 -o StrictHostKeyChecking=accept-new"
  export SSHPASS="${ONE_COM_PASS}"
fi

rsync -avz --delete \
  --exclude '.git/' \
  --exclude '.github/' \
  --exclude 'docs/' \
  --exclude 'scripts/' \
  --exclude 'README.md' \
  --exclude '.gitattributes' \
  --exclude '.gitignore' \
  "${ROOT}/" "${REMOTE}"

echo "Deploy finished."
