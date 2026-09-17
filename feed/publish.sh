#!/usr/bin/env bash
# Publishes feed/dist/content.json into the owner portal repo. Manual, on purpose.
# Read the JSON it prints before you type yes. Nothing about how content is made may surface in that repo.
#
# Usage: feed/publish.sh [--dry-run]
# Needs in .env:  PORTAL_REPO_PATH  (local clone of FaisalPalmes/ARMAN_OWNER_PORTAL)
#                 PORTAL_FEED_PATH  (path inside that repo where content.json is expected — see PORTAL_FEED_CONTRACT.md)
set -euo pipefail
cd "$(dirname "$0")/.."

# GUARD (17 Sept 2026): the portal at FaisalPalmes/ARMAN_OWNER_PORTAL reads a richer content.json
# than the v1 contract this feed emits. Pushing this file would blank Arman's page. Remove this
# block only once feed/build-feed.js emits the portal's real shape and the contract is updated.
echo "publish: REFUSING. The feed's shape does not match the portal's content.json yet. See context/decisions.md, 17 Sept." >&2
exit 1

if [ -f .env ]; then set -a; . ./.env; set +a; fi
: "${PORTAL_REPO_PATH:?set PORTAL_REPO_PATH in .env}"
: "${PORTAL_FEED_PATH:?set PORTAL_FEED_PATH in .env}"

DRY=0
for a in "$@"; do
  case "$a" in
    --dry-run) DRY=1 ;;
    *) echo "unknown argument: $a" >&2; exit 2 ;;
  esac
done

[ -d "$PORTAL_REPO_PATH/.git" ] || { echo "not a git repo: $PORTAL_REPO_PATH" >&2; exit 1; }

# Identity guard: the portal repo's history is client-visible.
NAME=$(git -C "$PORTAL_REPO_PATH" config user.name || true)
EMAIL=$(git -C "$PORTAL_REPO_PATH" config user.email || true)
if [ -z "$NAME" ] || [ -z "$EMAIL" ] || echo "$NAME $EMAIL" | grep -qiE 'claude|anthropic|bot|noreply'; then
  echo "Refusing: git identity in the portal repo is '$NAME <$EMAIL>'. Set your own name and email there first." >&2
  exit 1
fi

node feed/build-feed.js
SRC=feed/dist/content.json
DEST="$PORTAL_REPO_PATH/$PORTAL_FEED_PATH"
BRANCH=$(git -C "$PORTAL_REPO_PATH" rev-parse --abbrev-ref HEAD)

echo
echo "---- content.json ----"
cat "$SRC"
echo "----------------------"
echo "Copy to:   $DEST"
echo "Commit on: $BRANCH in $PORTAL_REPO_PATH, then push."
if [ "$DRY" = 1 ]; then echo "Dry run. Nothing written."; exit 0; fi

read -r -p "Have you read it? Type yes to publish: " ans
[ "$ans" = "yes" ] || { echo "Aborted."; exit 1; }

mkdir -p "$(dirname "$DEST")"
cp "$SRC" "$DEST"
git -C "$PORTAL_REPO_PATH" add -- "$PORTAL_FEED_PATH"
if git -C "$PORTAL_REPO_PATH" diff --cached --quiet; then
  echo "content.json unchanged. Nothing to commit."
  exit 0
fi
git -C "$PORTAL_REPO_PATH" commit -q -m "Update content feed, $(date +%Y-%m-%d)"
git -C "$PORTAL_REPO_PATH" push
echo "Published."
