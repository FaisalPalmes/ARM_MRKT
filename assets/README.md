# Assets

`index.json` is the record of every photo and video the operation can use. **Nothing is referenced in a post, ad, email or the website unless it has an entry here.** After four shoot days there will be hundreds of files; a content engine that can't answer "which image goes with this post" stalls in week one.

## Where the files are
The binaries are **not committed**. `assets/files/` is gitignored — put a working copy there if you want to look at them locally. The originals live in Faisal's synced folder (location: to confirm at ingest). The index refers to files by filename only, so the filename must be unique and never change once indexed.

Naming: `YYYY-MM-DD_subject_detail_NN.ext` — shoot day, what it is, a distinguishing detail, a two-digit counter. Example: `2026-09-05_grill_skewers_low_01.jpg`.

## How to add an asset
1. Next free id: `A0001`, `A0002`, … sequential, never reused.
2. Add an entry (below). `people` and `consent` are mandatory. If anyone identifiable is in frame, `consent` must be `recorded — <who>, <date>, <where the signed form is>` or the asset is unusable. Use `MISSING` when consent is needed and not yet recorded; the hub flags it.
3. Set `updated` at the top of the file to today.
4. Never delete an entry. If a file is withdrawn, add `"withdrawn": "YYYY-MM-DD — reason"`.

## Entry

```json
{
  "id": "A0001",
  "file": "2026-09-05_grill_skewers_low_01.jpg",
  "type": "photo",
  "shot_day": "2026-09-05",
  "added": "2026-09-14",
  "subject": "Mixed khorovats on the grill, low angle, coals visible",
  "dish": ["shish khorovadz", "havi khorovadz"],
  "room": "kitchen",
  "people": "hands only, no faces",
  "consent": "n/a",
  "orientation": "landscape",
  "crops_available": ["21:9", "4:5", "1:1"],
  "banner_grade": true,
  "empty_quadrant": "bottom-left",
  "tags": ["grill", "fire", "hero", "pillar:grill"],
  "used": [
    {"where": "website/home/hero", "date": "2026-09-21"},
    {"where": "ig/post", "date": "2026-09-25", "content": "content/posts/2026-09-25-khorovats-launch.md"}
  ],
  "notes": "Best of the B1 candidates. Second attempt from day 4."
}
```

Field notes:
- `type`: `photo` | `video` | `reel` | `graphic`.
- `added`: the day it was indexed. The hub uses it for "recently added" and "unused for 30+ days".
- `room`: `kitchen` | `grill` | `dining` | `bar` | `lounge` | `exterior` | `table` — whatever is true; keep the vocabulary small.
- `people`: `none` | `hands only, no faces` | `staff — <names>` | `guests — <count>, faces visible` | …
- `consent`: `n/a` | `recorded — …` | `MISSING`.
- `orientation`: `landscape` | `portrait` | `square`.
- `banner_grade`: true if it survives a 21:9 crop with room for text.
- `empty_quadrant`: where text can sit, or `none`.
- `tags`: free, but always include one `pillar:<key>` from `context/pillars.md`.
- `used[]`: **append, never overwrite.** It is how the engine avoids running the same hero twice in a month.
