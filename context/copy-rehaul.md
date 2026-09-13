# Armenian Taverna — website copy & section rehaul

*Prepared for the Claude Code website session. Page by page, section by section.*
*Written 19 August 2026.*

---

## READ THIS FIRST — scope and honesty note

I could not load the current build. `armenian-restaurant-one.vercel.app` returns `ROBOTS_DISALLOWED`, which is good news in itself (the "staging is indexable" problem from the 16 August audit appears to be fixed), but it means **this document is not a line-by-line redline against the copy that exists today.** It is a complete replacement architecture and copy set, built from:

- the live legacy site at `armeniantaverna.co.uk` (the old copy, which the new build appears to have inherited)
- the real A4 food menu PDF — every dish name, description and price below is taken from it
- the studioPalmes master build prompt's section library, so the section names below map to components that already exist

If you want section-level surgery instead of replacement, paste the current page copy in and I'll mark it up directly.

**Two corrections that must be made regardless of anything else in this document — see the FACT CHECK section at the end. One of them is a factual error you are about to repeat.**

---

## PART 1 — WHY THE CURRENT COPY READS AS CRINGE

This is worth naming precisely, because "make it more elegant" usually produces copy that is *more* cringe — more adjectives, more poetry, more reaching.

The existing copy has four specific faults:

**1. It claims instead of showing.**
"Warm hospitality and unparalleled service." "One of Manchester's most beloved restaurants." "Mouth-watering dishes." Every one of these could be pasted onto any restaurant in Manchester without changing a word. A claim a competitor could also make is not a selling point, it is filler.

**2. It describes food the way a menu describes food.**
"A tasty combination of smoked salmon, red caviar, lentils & fresh herbs." That is menu language. On a website it reads as a list, not an invitation. Menus list. Websites should make you want the thing.

**3. It reaches for adjectives where facts were available.**
"Traditional Armenian food" is doing no work. "Charcoal-grilled ribeye marinated the village way, brought to the table on the skewer" does all of it. The restaurant has extraordinary raw material — a 1968 founding, a menu that maps the Soviet-era Armenian diaspora, lavash from a tandoor, pomegranate in three separate dishes — and the copy currently uses none of it.

**4. It talks about itself, not to the reader.**
Almost every sentence starts with the restaurant. Almost none address the person deciding where to eat on Friday.

### The fix, in one line

**Elegance comes from restraint and specificity, not from richer adjectives.** Short sentences. Real nouns. Name the dish, name the city, name the year. Let Armenia's actual cultural depth do the work instead of describing it as deep.

### Ban list — never appears anywhere on the site

mouth-watering · unparalleled · beloved · hidden gem · culinary journey · a taste of Armenia · nestled · exquisite · tantalising · a feast for the senses · we pride ourselves · passion for · delight · vibrant · iconic · "Discover what makes us special" · any sentence beginning "At Armenian Taverna, we…"

### Use list — the vocabulary that carries the heritage

khorovats · tonir · lavash · meze · Ararat · pomegranate · charcoal · skewer · Yerevan · Areni · fenugreek · sumac · the long table

---

## PART 2 — SECTION ARCHITECTURE, PAGE BY PAGE

### Recommended page set

| Page | Job | Notes |
|---|---|---|
| Home | The whole pitch in one scroll | |
| Menu | What they sell | |
| Our Story | The humans and the heritage | **full rehaul — Part 3** |
| Private Dining | The premium upsell | recommend cutting until shoot photos exist |
| Wine | Real depth, worth its own page | Armenian + Georgian is a genuine differentiator |
| Visit | Hours, map, address, booking | |

---

## HOME

### The structural problem

The old site is one long scroll where every section is the same shape: heading, paragraph, heading, paragraph. There is no rhythm and no hierarchy, so nothing is emphasised and everything reads at the same volume. It also puts a chef section second — above the food, above the story, above any reason to book.

### Recommended section order

**1 — Full-screen hero**

```
Eyebrow:   MANCHESTER · SINCE 1968
H1:        Armenian Taverna
Sub:       Charcoal, lavash and a long table.
           Armenian cooking on Princes Street for fifty-eight years.
CTA:       Book a table  ·  See the menu
```

Alternative sub if you want it warmer: *"The oldest Armenian kitchen in Manchester. Still family-run, still cooking over charcoal."*

**2 — Opening statement** *(replaces "Discover what makes us special")*

Short. Three lines maximum. This is the section that has to make someone keep scrolling.

```
H2:   Three families. Fifty-eight years. One charcoal grill.

Body: We opened in 1968, when there was no Armenian restaurant in Manchester
      and very little Armenian food anywhere in Britain. Arman and Arusyak are
      the third family to run it. Very little about how we cook has changed.
```

**3 — Khorovats band** *(promo band — full-bleed photo, scrim, one big claim)*

This is the single most important new section on the site. Charcoal grilling is the restaurant's actual differentiator and the current site buries it in a paragraph called "Complicated Cooking Techniques", which is both unappetising and slightly insulting to the reader.

```
Eyebrow: THE GRILL
H2:      Khorovats

Body:    In Armenia the grill is not a section of the menu, it is the reason
         everyone came. Lamb shoulder cut into cubes and skewered. Ribeye
         marinated the village way. Chicken thighs, pork, whole sea bass.
         It arrives still on the skewer under a scatter of raw onion and
         herbs, and it is meant to be pulled apart by everyone at the table
         at the same time.

CTA:     See the grill menu
```

**4 — How to eat here** *(mosaic grid, 3 tiles — NEW SECTION, strongly recommended)*

Most people booking have never eaten Armenian food and quietly worry they will order wrong. This section removes that friction and directly increases bookings. It is also the least "brochure" thing you can put on a restaurant site.

```
H2: How to eat here

Tile 1 — Start with meze
  A spread of small cold and hot plates to share: hummus, ikra, mutabal,
  tabbouleh, panirov borek. Lavash instead of cutlery.

Tile 2 — Then the grill
  One skewer each, or a mixed khorovats down the middle of the table.

Tile 3 — Or let us decide
  The banquets do the ordering for you. From £28.50 a head.
```

Every tile links — meze and grill to the relevant menu anchors, banquet to the banquet section.

**5 — Signature offer band**

```
H2:   Early Bird
Body: Two courses, £21, Monday to Friday, twelve until five.
      Lentil soup or borsch to start, kofte or havi khorovadz to follow —
      the same kitchen, the same grill, at lunch prices.
Note: Not available on bank holidays or between 15 November and 1 January.
CTA:  Book a table
```

**6 — Wine teaser** *(split feature)*

```
Eyebrow: THE LIST
H2:      Wine from where wine was invented

Body:    The oldest winery ever found is a cave at Areni, in the south of
         Armenia. Clay vats, a press, six thousand years old. Our list
         starts there — Armenian and Georgian bottles first, everything
         else second.

CTA:     See the wine list
```

**7 — Reviews** *(review marquee, real Google reviews, linked to the real listing)*

Not the three unattributed quotes currently on the site. And **remove the hard-coded "4.5 from 1,560+ Google reviews"** — it will drift wrong and it violates the no-fake-numbers rule the moment it does.

**8 — Private dining teaser** — only once real photos exist. See that page below.

**9 — Contact band + map**

**10 — Split footer** with the real newsletter form.

---

## MENU

### The structural problem

Thirteen categories is a database, not an experience. If the menu page is a flat wall of every dish at the same weight, nobody reads it and everyone leaves for the PDF.

### Recommended structure

**1 — Image-title banner:** "The Menu"

**2 — Three-way split at the top**, before any dish list:

```
Charcoal Grill  ·  Meze & Small Plates  ·  Banquets
```

Three cards, each linking down the page. This gives the page a shape.

**3 — Khorovats first, not starters first.** It is the reason to come. Give the grill section a wide-strip gallery treatment and let the meze follow it, which is the reverse of menu order and the correct order for a website.

**4 — Rewrite the dish descriptions in the top ten only.** Leave the long tail exactly as the PDF has it. The ten that carry the site:

| Dish | Current | Rewrite |
|---|---|---|
| Tavari Shish Khorovadz £26.50 | "Traditional village style marinated rib-eye, charcoal grilled" | Ribeye, marinated the way it is done in the villages, straight over the charcoal. The most expensive thing we cook and the thing we would order. |
| Shish Khorovadz £19.95 | "Marinated cubes of lean lamb" | Lamb shoulder, cubed and skewered. The dish khorovats means before it means anything else. |
| Nur Havi £18.95 | "Chicken breast marinated in pomegranate sauce" | Chicken breast in pomegranate — the fruit Armenians put on everything from wedding tables to national symbols. |
| Pasus Dolma £15.95 | "Traditional Armenian dish, marinated cabbage stuffed with grated vegetables" | Pickled cabbage leaves rolled around bulgur, lentils, chickpeas and beans. Made for fasting days, which is why the best-known Armenian vegan dish is also one of the oldest. |
| Chef's lavash £4.95 | "Home-made thin traditional bread of Armenia baked in tandoori" | Lavash, rolled thin and baked against the wall of the oven. UNESCO lists the making of it as Armenian cultural heritage. Order it and eat with your hands. |
| Basturma £12.50 | "Finely sliced, air-dried cured beef" | Beef, cured under fenugreek and air-dried until it is dark and dense. Sliced to the thickness of a leaf. |
| Ararat Pie £11.50 | "Deep fried savory pastries filled with minced lamb, parsley, nutmeg & egg" | Named after the mountain every Armenian can see and no Armenian can climb. Lamb, parsley and nutmeg in fried pastry. |
| Borsch £7.50 | "Famous Ukrainian beetroot and vegetable soup" | Ukrainian, and on an Armenian menu for a reason — see Our Story. Beetroot, sour cream, brown bread. |
| Khinkali £16.95 | "Traditional Georgian dumplings with minced veal and pork special spices" | Georgian dumplings. Hold the top knot, bite, drink the broth first, leave the knot on the plate. |
| Armenian Special Salad £6.95 | "Fresh assorted greens topped with pomegranate and mulberry sauce" | Greens under pomegranate and mulberry. Sharp, sweet and the reason nothing on this menu needs a heavy dressing. |

**5 — Banquet block.** Three tiers, priced, with a plain line: *"You order nothing. We bring everything."*

**6 — PDF CTA** at the bottom, not the top.

---

## OUR STORY — full rehaul

**Covered separately in Part 3.**

---

## WINE

### Recommendation

Keep the page. Armenian and Georgian wine is the most genuinely differentiating thing on this site after the charcoal, and almost no Manchester restaurant can claim it.

### Sections

**1 — Image-title banner:** "Wine"

**2 — The Areni opening** — the six-thousand-year story, told once, properly. About 80 words. Do not repeat it anywhere else on the site.

**3 — Armenia** — the reds are already built. Areni noir is the grape to name.

**4 — Georgia** — qvevri, amber wine, Saperavi. Georgia's qvevri winemaking is also UNESCO-listed, which pairs neatly with the lavash line on the Story page.

**5 — Everything else** — brief, unapologetic, secondary.

### Two blockers on this page

- **The placeholder prices must not ship.** The wine list PDF in the project returns no extractable text, so it is almost certainly a scan. Get a photo or a typed version and I'll format the whole price table.
- **"Zara Serobyan, WSET" is still unconfirmed.** See FACT CHECK.

---

## PRIVATE DINING

### Recommendation: cut the page until after the September shoot.

A page whose main component is a carousel of "Photos Coming Soon" slides actively damages the brand — it advertises that the restaurant is not ready. The master build prompt already bans "coming soon" apologies in client-facing text.

**Instead, until 13 September:** one short block at the bottom of the Visit page.

```
H3:   Larger tables and private hire
Body: We take groups, and we have hosted most kinds of occasion in this room
      since 1968. Call 0161 834 9025 and ask for Arman.
CTA:  Call the restaurant
```

Rebuild the full page in week commencing 14 September when there are real photographs of the room.

---

## VISIT

### Sections

**1 — Contact band:** Address · Hours · Phone, in a horizontal row.

**2 — Large embedded map, 60–80vh.**

**3 — Booking block** — the NeroBooking widget, with the phone number beside it as the alternative for anyone who would rather call.

**4 — Getting here** — a genuinely useful paragraph naming the nearest tram stop and the Albert Square context. Local search value and real utility.

**5 — Private hire block** (above, until the page is rebuilt).

### Fix the hours, they are wrong on the live site

Currently published as `Mon to Thurs: 12am - 11pm`, `Fri to Sat: 12am - 12pm`, `Sun: 12am - 10pm`. Midnight to eleven at night, and Friday and Saturday reading as midnight to midday. Confirm with Arman and publish properly — almost certainly noon, not midnight. This also feeds the opening-hours schema, so the error is currently propagating into Google.

---

## PART 3 — OUR STORY, REBUILT

### The insight this page should be built on

There is one fact about this restaurant that no competitor in Manchester can copy, and it is currently nowhere on the site: **the menu is a map of where Armenians ended up.**

Borsch is Ukrainian. Khachapuri and khinkali are Georgian. Pelmeni and olivieh and selodka pod shuboy are Russian. Solyanka is Soviet canteen cooking. None of that is on the menu by accident, and none of it is a compromise. It is there because Armenians were scattered across those places for a century, cooked in those kitchens, and brought the food back. A menu that includes borsch next to khorovats is not a confused menu. It is an accurate one.

That is the story. It is true, it is interesting, it costs nothing to tell, and it turns the menu's one apparent inconsistency into the best thing about it.

### Page structure

```
1.  Hero banner
2.  Arman & Arusyak          ← keeps the couple photograph
3.  1968
4.  Why the food tastes like this
5.  Six dishes and where they come from
6.  The menu is a map          ← the diaspora section
7.  Today
8.  Book a table CTA
```

The chef section is deleted entirely. Nothing replaces it in that slot; the page is stronger without a "meet the team" beat at all.

---

### SECTION 1 — Hero banner

Image-title banner, full-bleed, heading set on the image.

```
Eyebrow:  MANCHESTER · SINCE 1968
H1:       Our Story
Sub:      Three families, fifty-eight years, one charcoal grill.
```

---

### SECTION 2 — Arman & Arusyak

**Split feature. Couple photograph on the left, copy on the right.** This is the photo you are keeping, and it should be the largest image on the page.

```
Eyebrow: THE THIRD FAMILY
H2:      Arman & Arusyak

Body:
Arman and Arusyak came to Manchester from Armenia and took on a restaurant
that had already been here for decades. They are the third family to run it.

They did not arrive with a plan to modernise it. They arrived knowing what
Armenian food is supposed to taste like, and most of what they have done
since has been in service of that — the charcoal, the lavash, the meze
brought out all at once rather than in courses, the insistence that a table
of eight should be eating off the same skewers.

The rest of it is the ordinary work of running a restaurant for years on end.
Arusyak is usually somewhere near the pass. Arman is usually on the floor.
If you have eaten here more than twice, one of them has probably brought
something to your table.
```

*Verify the last paragraph with Arman before publishing — it is written as a true description of how they work, and it should actually be true.*

---

### SECTION 3 — 1968

Plain text section, no image needed. Short.

```
H2:  1968

Body:
The restaurant opened in 1968. There was no Armenian restaurant in Manchester
then, and very little Armenian food anywhere in Britain — a handful of places
in London, and almost nothing outside it.

It has changed hands twice since, and it has never stopped being an Armenian
restaurant. Fifty-eight years is long enough that people who came here on
first dates now bring their grandchildren, which is the only kind of proof
that matters in this business.
```

*If Arman confirms the founding month, use it: "in the spring of 1968" reads far better than the bare year.*

---

### SECTION 4 — Why the food tastes like this

Stat-band or tonal split. Four short blocks. This is the "heritage and richness" section, and it earns it with facts rather than adjectives.

```
H2: Why the food tastes like this

— Charcoal
  Almost nothing worth eating in Armenian cooking is done in a pan. Meat goes
  over open charcoal on a skewer, and it comes off when it is ready and not
  before.

— Greens
  Armenian cooking uses something in the region of three hundred wild greens
  and flowers — for stuffing, for seasoning, for tea. It is why the food is
  aromatic without being heavy, and why the salads need almost no dressing.

— Fire and bread
  Lavash is rolled paper-thin and slapped against the inside wall of a hot
  oven. It comes off in seconds. UNESCO lists the making of it as Armenian
  cultural heritage, which is a formal way of saying that Armenians have
  been arguing about the correct way to do it for a very long time.

— Pomegranate
  On the salad, in the sauce for the chicken, in the sauce for the lamb
  chops. It is the national fruit, it is on half the country's art, and it
  does the job that lemon does in most other cuisines.
```

---

### SECTION 5 — Six dishes and where they come from

Card grid or alternating split features. Each dish gets a heading, two or three sentences, and eventually a photograph from the September shoot.

```
H2: Six dishes and where they come from

KHOROVATS
In Armenia, khorovats is not a dish so much as an occasion. Someone is put
in charge of the fire, everyone else waits, and the meat comes to the table
still on the skewer under a handful of raw onion. Ours is lamb, ribeye,
chicken thigh, pork or whole sea bass.

LAVASH
Thin, soft, blistered from the oven wall. It is not a side. It is what you
eat with — you tear it, you wrap things in it, you use it instead of a fork.
Ask for it warm at the start of the meal and it will still be on the table
at the end.

DOLMA
Vine leaves rolled around spiced minced lamb, rice and herbs, served with
jajuk. Every Armenian family thinks their own version is the correct one.
This one has been made in this kitchen for decades.

PASUS DOLMA
The fasting version, and the older one. Pickled cabbage leaves rolled around
bulgur, lentils, chickpeas and beans, made for the days of the year when no
meat is eaten. It is entirely vegan and it predates anyone deciding that was
a selling point.

BASTURMA
Beef packed in fenugreek and air-dried until it is dark, firm and intensely
savoury, then sliced almost transparent. One of the oldest ways of keeping
meat that anyone has ever devised, and still one of the best things on the
cold starters.

PAKLAVA
Layers of pastry, walnuts and honey. Armenian paklava is less sweet than
most of its neighbours and the spicing is different — cinnamon and clove
rather than rosewater. Have it with an Armenian coffee.
```

*Sense-check paklava, dolma and lavash against how the kitchen actually makes them before publishing — Amir is the right person to ask, and the 22nd/23rd visit is the moment to do it.*

---

### SECTION 6 — The menu is a map

The best section on the page. Full-width, tonal background, no photo needed.

```
H2: Why there is borsch on an Armenian menu

Body:
People notice it. There is Ukrainian borsch on the menu, Georgian khachapuri
and khinkali, Russian pelmeni and olivieh. On a menu that also has khorovats
and lavash, it looks at first like a restaurant that could not decide.

It is the opposite of that. Armenians spent the twentieth century scattered
across all of those places. They cooked in those kitchens, married into those
families, ate at those tables, and when they came home or moved on again they
brought the recipes with them. Borsch is on this menu for the same reason
Armenians are in Manchester.

So the menu is not confused. It is accurate. It is what an Armenian table
actually looks like — the food of the country, and the food of everywhere
the country ended up.
```

---

### SECTION 7 — Today

Short close.

```
H2: Today

Body:
The room has been reworked, there is a proper bar and a lounge now, and the
wine list has been rebuilt around Armenian and Georgian bottles. The grill
has not changed at all.

Fifty-eight years in, it is still a family running a restaurant, which is
the only way this has ever worked.
```

---

### SECTION 8 — CTA band

```
H2:  Come and eat
Sub: Lunch from twelve. The grill runs all day.
CTA: Book a table  ·  0161 834 9025
```

---

## PART 4 — FACT CHECK: FIX BEFORE ANY OF THIS SHIPS

**1. "Third generation" is wrong — do not write it.**
You said third generation. The source says *"Arman & Arusyak are the third restaurateurs to run the restaurant."* Third **owners**, not third generation of one family. Those are completely different claims, and the second one is false — Arman and Arusyak took over a business that other families ran before them. Publishing "third generation" is a fabricated heritage claim on the page whose entire job is being trustworthy about heritage. Every line above says "the third family to run it", which is accurate. **Confirm the exact wording with Arman on the 22nd/23rd.**

**2. "Oldest restaurant business in Manchester" — keep the hedge or drop it.**
The live site says *"said to be the oldest restaurant business in Manchester"*. That hedge is load-bearing. I have not used the claim anywhere above. If Arman can substantiate it, it is a strong line and worth a section. If he cannot, leave it out entirely rather than hedging it in public.

**3. Zara Serobyan, WSET — still unresolved from the 16 August audit.**
A named person with a named professional credential who has never come up from Arman. This is the single highest-risk item on the site. Either Arman confirms she exists and consents, or the name comes off the wine page this week. Do not let this ship on the 13th unresolved.

**4. Chef Yianni Pelekanos — delete every trace.**
Not just the Our Story section. Check the homepage, meta descriptions, image alt text, and JSON-LD. He is on the live legacy site too, so the old site needs it removed at the same time or you will have a departed chef in Google's index pointing at the new one.

**5. "4.5 from 1,560+ Google reviews" — remove the hard-coded numbers.**
Link the real listing instead. Also: the master build prompt already forbids `aggregateRating` in schema built from third-party reviews — worth confirming it did not make it into the JSON-LD.

**6. Opening hours are wrong.** See the Visit page above.

**7. Princes vs Princess Street, M2 4DF vs 4DN.** Still outstanding from the run-up notes. This has to be identical across the site, the schema, Google Business Profile and the footer, or local search suffers.

---

## PART 5 — WHAT TO HAND THE BUILD SESSION, IN ORDER

1. Delete the chef section and every reference to Yianni Pelekanos, sitewide.
2. Rebuild Our Story to the eight sections in Part 3.
3. Reorder the homepage to the ten sections above; kill "Discover what makes us special".
4. Rewrite the ten menu descriptions in the table.
5. Cut the Private Dining page; move the short block to Visit.
6. Remove the hard-coded review numbers; link the real Google listing.
7. Fix the opening hours everywhere including schema.
8. Hold the wine page until the prices and the Zara question are settled.

Items 1, 6 and 7 are corrections and can go immediately. Items 2–5 are the rehaul. Item 8 is blocked on Arman.
