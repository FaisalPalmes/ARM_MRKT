# Calendar

One file per month, `YYYY-MM.md`. **The source of truth for what goes out when.** The content file it points at is the source of truth for status and approval; the hub joins the two.

Each file opens with the month's pillar mix, then one table:

| Date | Channel | Pillar | Title | Content | Notes |
|---|---|---|---|---|---|
| 2026-09-25 | instagram | grill | Khorovats launch | content/posts/2026-09-25-khorovats-launch.md | |

- `Date`: `YYYY-MM-DD`. Rows without an ISO date are ignored by the build.
- `Channel`: `instagram` | `facebook` | `meta-ads` | `email`.
- `Pillar`: a key from `context/pillars.md`.
- `Content`: repo-relative path. Empty until drafted — the hub shows the slot as "not drafted" and flags it inside 7 days.

Rejected pieces stay in the table with the file; the file carries `status: rejected` and the reason.
