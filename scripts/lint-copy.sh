#!/usr/bin/env bash
# Scores a content file's body twice: the slopmonster linter (.claude/skills/slopmonster) for
# AI tells and invented proof, then this client's own ban list from context/voice.md and
# CLAUDE.md. Run it before setting `status: awaiting-approval`. Exit 0 only when every file
# passes both. Frontmatter is skipped; only the body is scored.
#
# Usage: scripts/lint-copy.sh content/posts/2026-09-25-khorovats-launch.md [more files...]
set -uo pipefail
cd "$(dirname "$0")/.."
LINT=.claude/skills/slopmonster/tools/deslop.py
[ -f "$LINT" ] || { echo "lint-copy: $LINT missing" >&2; exit 2; }
[ $# -gt 0 ] || { echo "usage: scripts/lint-copy.sh <content file>..." >&2; exit 2; }

# Case-insensitive, matched as plain text. Keep in step with context/voice.md.
BANNED=(
  # the ban list
  "mouth-watering" "mouthwatering" "unparalleled" "beloved" "hidden gem" "culinary journey"
  "a taste of armenia" "nestled" "exquisite" "tantalising" "tantalizing" "feast for the senses"
  "we pride ourselves" "passion for" "delight" "vibrant" "iconic" "discover what makes us special"
  "at armenian taverna, we"
  # facts that must never appear
  "third generation" "third-generation" "one family's" "pelekanos" "serobyan" "wset"
  "outdoor seating" "al fresco"
  # caption rules
  "foodies" "#foodie" "#instafood" "#foodporn" "who's hungry" " guys" " fam "
)

status=0
for f in "$@"; do
  [ -f "$f" ] || { echo "lint-copy: no such file: $f" >&2; status=1; continue; }
  body=$(awk 'NR==1 && $0=="---"{fm=1; next} fm && $0=="---"{fm=0; next} !fm' "$f")
  echo "══ $f"
  python3 "$LINT" --markdown --text "$body" || status=1
  hits=0
  for p in "${BANNED[@]}"; do
    matches=$(printf '%s\n' "$body" | grep -inF -- "$p" || true)
    if [ -n "$matches" ]; then
      hits=1
      printf '%s\n' "$matches" | sed "s/^\([0-9]*\):.*/    · banned '${p}' (body line \1)/"
    fi
  done
  if [ "$hits" = 1 ]; then echo "  client ban list: FAIL"; status=1; else echo "  client ban list: clean"; fi
  # Restaurant proof nouns the upstream linter does not know. A number next to one of these
  # is a claim: verify it on the live listing that day, or cut it. Prices are not caught.
  proof=$(printf '%s\n' "$body" | grep -inoE '[0-9][0-9,.]*[+]?[[:space:]]*(happy[[:space:]]+|satisfied[[:space:]]+|loyal[[:space:]]+)?(diners?|guests?|customers?|reviews?|ratings?|bookings?|covers|tables|stars?|regulars)\b' || true)
  if [ -n "$proof" ]; then
    printf '%s\n' "$proof" | sed "s/^\([0-9]*\):\(.*\)/    · proof claim '\2' (body line \1): verify today or cut/"
    echo "  proof claims: FAIL"; status=1
  else
    echo "  proof claims: none"
  fi
  echo
done
[ "$status" = 0 ] && echo "lint-copy: all clean" || echo "lint-copy: not ready for awaiting-approval"
exit $status
