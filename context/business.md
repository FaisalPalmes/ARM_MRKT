# Armenian Taverna — the business

Source: `context/handover.md` §1–2 (Cowork marketing session, 13 Sept 2026). When a fact below is confirmed or corrected, change it here and log the change in `decisions.md`. This file is the only place a fact about the business should be looked up.

## Identity
- **Armenian Taverna** — trading as Armenian Taverna Limited. Branded *Armenian · Bar · Restaurant · Lounge*.
- **Address: UNCONFIRMED.** Believed to be 3–5 Princes Street, Manchester M2 4DF. Open questions: Princes vs Princess; 4DF vs 4DN. Once settled it must be identical everywhere (website, Google, Meta, email footer). Until then, do not put the address in anything client-facing.
- Phone: 0161 834 9025
- Web: armeniantaverna.co.uk
- VAT: 184878154
- **Since 1968.** 58 years in 2026.
- Family-run. Arman and Arusyak are the **third family to run it** — the third *owners*. Never write "third generation"; it is false.

## The food
- **Charcoal grill (khorovats)** is the core and the differentiator.
- **Meze** served all at once, not in courses.
- **Lavash** from the tandoor.
- Dolma, basturma, paklava.
- Georgian, Ukrainian and Russian dishes are on the menu because that is where Armenians settled in the twentieth century. The menu is a map of the diaspora, not a confused menu. Say it that way.
- Banquets for groups.
- **Early Bird: two courses £21, Monday–Friday 12–5.** Not available 15 November – 1 January. This is the only place a price appears in promotional content.
- Armenian and Georgian wine list. Armenian brandy. Cocktails. The bar and lounge is half the brand and the half nobody tells.

## Google Business Profile
4.5 stars from about 1,600 reviews, as recorded on 13 Sept 2026. The single most valuable marketing asset the business owns. Check the live count before quoting it; never round up.

## People
| Who | Role | Notes |
|---|---|---|
| **Arman** | Owner | WhatsApp. Busy. Patient, but a run of software bugs earlier in the year strained trust. Deliver with proof, close loops fast, never over-promise a date. |
| **Arusyak** | Co-owner, Arman's wife | |
| **Sophie** | Front of house | Runs the current social posts. Route staff comms through her. Asked whether she'd appear on camera — answer pending. |
| **Amir** | Chef | Kitchen-side contact. Never named in content (no chef is). |
| **Arman's developer** | Handles the old site | May have portal repo access one day. Nothing internal ever lives in the portal repo. |

## Facts that are easy to get wrong
- Third *family*, not third generation.
- Founded 1968. 58 years in 2026.
- Chef Yianni Pelekanos has left. Never name a chef. (Still on the live site as of 13 Sept — the website session's fix.)
- "Zara Serobyan, WSET" is unverified. Never name her.
- Outdoor seating is unverified. Never claim it.
- Street and postcode unconfirmed. See Identity above.
- Armenian script: only from the checked list once Arman has proofed it. Never load-bearing.

## The deal
- £1,600 one-off + **£490/month retainer** (£40 website, £390 Meta bundle, £60 managed email).
- One-off staged: about £900 on photo/video approval, £550 on website approval, £150 on email setup and go-live.
- **Retainer starts 1 October.** Billed at the start of the month.
- **Ad budget £200/month, on Arman's card.** We never handle money.
- **Status as of 13 Sept 2026:** Arman has **not confirmed** the staged payments or the 1 October start. No written contract — proposal only. Faisal chases these; the hub surfaces them until closed. Nothing commercial ever crosses to the portal.

## Timeline
| Date | Event |
|---|---|
| 5, 6, 12, 13 Sept 2026 | Shoot — four days. What's in the can: **unknown, ask Faisal**. |
| w/c 14 Sept | Editing |
| 21 Sept | Armenian Independence Day — a content moment every year |
| w/c 21 Sept | Website live |
| Late Sept | Meta ads live (no fixed date; depends on Meta admin access) |
| **1 Oct** | Retainer starts |
| 15 Nov – 1 Jan | Early Bird not available |

## Channels and accounts
- **Instagram + Facebook** organic. Sophie currently posts. Plan: Faisal produces, Sophie or Faisal posts, always after approval. Never auto-posted.
- **Meta ads.** Objective: enquiries and bookings, not reach. Landing: the NeroBooking widget (`https://eu.neropay.app/nerobooking/widget/24883`) or the Early Bird page. Two creatives live at all times, one always being tested. Alcohol content needs age targeting per Meta policy. Blocked until Faisal has Meta Business Suite admin.
- **Email.** Brevo. One send per week. Arman owns the account and invites Faisal as a user. Double opt-in carrying the 10% welcome code. GDPR: consent wording, privacy policy on the site, unsubscribe on every send. Site capture is built but gated behind `EMAIL_CAPTURE_ENABLED` and off until the Brevo account exists.
- **Google Business Profile.** Two hours of ready work in `context/google-profile-plan.md` (to import). Blocked until Faisal has manager access. GBP posts live 7 days, so weekly is the cadence.

## Other sessions
- **Owner portal** — Arman's dashboard at `arman-owner-portal.vercel.app`, repo `FaisalPalmes/ARMAN_OWNER_PORTAL`. It consumes `content.json` from this repo and nothing else. Contract: `feed/PORTAL_FEED_CONTRACT.md`.
- **Website build** — on a Vercel preview, live about w/c 21 Sept. Not this repo's concern. Never touch website code.
