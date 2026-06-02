# CODEX TASK — AA Records Money Tools Expansion

You are working in the AA Records React/Vite project.

Follow `AGENTS.md` if present.

Main goal:
Expand AA Records from only a music/player site into a small AI-powered creator tools platform.

We want to implement selected money/traffic ideas:

1. AA Tools / Forge Tools — mini-app studio section
2. Viral roast / diss / hype generator
3. AI Artist Page in 24h service page/section
4. Buchon 555 browser mini-game teaser / light playable MVP
5. Prompt packs / generator packs section

Do NOT implement idea 4 right now.
Do NOT implement idea 7 right now.

Important:

* Do not break the audio player.
* Do not remove existing tracks, albums, EPs, views, or player logic.
* Do not add backend, auth, database, analytics, payments, external APIs, or new npm packages unless absolutely necessary.
* Prefer simple React state and local UI logic.
* Keep current AA Records vibe: dark cyber/neon, underground, AI-powered, Polish/English street-tech style.
* All new features must be mobile-friendly.
* Bottom player must remain usable.
* If a feature requires real AI/API later, implement a frontend mock/template generator for now.

Before editing:

1. Inspect `src/App.jsx`, `package.json`, `AGENTS.md`, and current app structure.
2. Identify existing navigation/view system.
3. Present a short plan and list of files you will change.
4. Wait for approval if this task is being run interactively.

After approval:
Implement the changes.

========================================
PART 1 — Add “AA Tools / Forge Tools”
=====================================

Add a new main navigation item/view:

Label options:

* “Forge Tools”
* or “AA Tools”

Use “Forge Tools” unless the existing nav style suggests shorter labels.

The new view should feel like a toolbox for creators.

Hero copy:
Title:
AA Forge Tools

Subtitle:
Mini generatory dla twórców, raperów, ekip, streamerów i ludzi, którzy chcą zamienić chaos w content.

Microcopy ideas:

* “from chaos to content”
* “prompt → vibe → drop”
* “creator tools powered by AA Records”
* “Forge signal online”

The page should show 3–4 cards:

1. Rap Name Generator
2. Diss / Roast / Hype Generator
3. Suno Prompt Generator
4. Artist Launch Kit Preview

Each card should have:

* icon or emoji-style visual
* short description
* CTA button
* status badge: “live”, “beta”, or “coming soon”

If the app currently uses icons from lucide-react, use existing imported icons or add imports from lucide-react only if the package already exists.

========================================
PART 2 — Rap Name Generator
===========================

Implement a lightweight frontend generator.

Inputs:

* vibe: dark / funny / cyber / street / cosmic
* language: Polish / English / mixed
* optional seed word or nickname

Output:
Generate 5 rap names from local arrays/templates.

Examples:

* Buchon Nova
* Cyber Husar
* Dymny Oracle
* Lil Beton
* Forge Kid
* Black Knight Danny
* Neon Szpon
* Aion Bando

Add buttons:

* “Generate”
* “Copy result”

No API.
No backend.
Use local arrays and randomization.

Add small disclaimer:
“Generator jest dla zabawy — wybierz, przerób, użyj jako inspiracji.”

========================================
PART 3 — Viral Diss / Roast / Hype Generator
============================================

Add a fun content generator.

Inputs:

* target/name
* mode: hype / roast / diss / birthday / gym motivation
* intensity: soft / medium / savage, but keep it playful and non-hateful
* language: Polish / English / mixed

Output:
Generate:

1. 4-line verse
2. hook idea
3. TikTok caption
4. Suno-style prompt

Rules:

* Keep it playful.
* Do not generate hate toward protected classes.
* No threats or real-world violence.
* Make “diss” comedic/rap-battle style, not harmful harassment.

Example output style:
Verse:
“Daniel wchodzi, neon świeci,
Codex gotuje, beat już leci...”

Buttons:

* “Generate”
* “Copy verse”
* “Copy Suno prompt”

This generator should be a strong traffic/meme feature.

========================================
PART 4 — Suno Prompt Generator
==============================

Add a simple prompt generator for music creation.

Inputs:

* genre: trap / phonk / drill / house / cyberpunk / emotional cinematic / comedy rap
* mood: dark / funny / epic / romantic / chaotic / spiritual
* language: Polish / English / mixed
* vocal: male rap / female vocal / duet / robotic / choir
* theme: free text

Output:
A complete structured prompt, for example:
“Polish cyber trap anthem, dark neon atmosphere, male rap vocal, heavy 808, cinematic intro, theme: building an AI music label from chaos, catchy hook, high energy, club-ready mix.”

Buttons:

* “Generate prompt”
* “Copy prompt”

Add a note:
“Użyj tego jako start, potem dopracuj tekst i strukturę w swoim generatorze muzyki.”

No mention that any specific artist’s voice should be cloned.
Do not encourage copying real artists’ voices.

========================================
PART 5 — AI Artist Page in 24h Service Section
==============================================

Add a service/offer section, likely inside Forge Tools or as its own card on homepage.

Title:
AI Artist Page in 24h

Subtitle:
Mini strona dla artysty, rapera, DJ-a, streamera lub projektu AI music — player, bio, linki, cover vibe i CTA.

Packages:

1. Starter Card — £49

   * one-page artist card
   * bio + links
   * visual vibe section
2. Full Drop Page — £99

   * artist page
   * player section
   * release/track cards
   * CTA buttons
3. Forge Pack — £149

   * page concept
   * copywriting
   * prompt pack for cover/visuals
   * deployment guidance

CTA:
“Zapytaj o stronę”

CTA should use mailto for now.

Mailto subject:
AA Records — Artist Page Request

Mail body should include:

* Alias:
* Music/project vibe:
* Links:
* Package:
* Deadline:
* Contact:

No Stripe, no payment system.

========================================
PART 6 — Buchon 555 Browser Mini-Game
=====================================

Upgrade the existing Buchon 555 teaser into a very light playable MVP if possible.

Game:

* User taps/clicks a button to increase score.
* Goal: 555 taps.
* Show progress bar.
* Show funny milestones:

  * 55: “Buchon się budzi”
  * 111: “Forge signal detected”
  * 222: “Codex Kitchen heating”
  * 333: “Neon combo”
  * 444: “Black Knight approaching”
  * 555: “Drop unlocked”
* At 555, show unlock message:
  “Buchon 555 unlocked — teraz odpal Fire Into Form.”

Optional:

* Button to play a featured track using existing player logic, if safe.
* Save best score/progress in localStorage.
* Add reset button.

Rules:

* No audio autoplay.
* No complex game loop.
* No new packages.
* Keep it lightweight.
* Must work on mobile.

========================================
PART 7 — Prompt Packs / Generator Packs Section
===============================================

Add a section for future digital products.

Title:
AA Prompt Packs

Subtitle:
Gotowe paczki promptów i struktur dla ludzi, którzy chcą szybciej tworzyć tracki, okładki, TikToki i mini projekty.

Cards:

1. Cyber Trap Suno Pack

   * 100 prompt ideas
   * status: coming soon
2. Cover Art Prompt Pack

   * album covers, neon visuals, AI label aesthetics
   * status: coming soon
3. TikTok Hook Formula Pack

   * captions, hooks, video ideas
   * status: coming soon
4. AI Music Launch Kit Lite

   * release plan, AGENTS.md sample, Codex task prompt, checklist
   * status: preview

Add CTA:
“Notify me / Ask for pack”

Use mailto:
Subject:
AA Records — Prompt Pack Request

Mail body:

* Pack name:
* Email/contact:
* What style do you create?:

Do not implement downloads yet.
Do not implement payment yet.

========================================
PART 8 — Homepage integration
=============================

On homepage, add a compact “Forge Tools” teaser section.

It should include:

* headline: “New: AA Forge Tools”
* 3 quick cards:

  * Generate rap name
  * Build Suno prompt
  * Unlock Buchon 555
* CTA: “Open Forge Tools”

Do not make homepage too long.
Keep it polished and scannable.

========================================
PART 9 — Navigation and state
=============================

If the app uses `currentView`, add new view:

* `tools` or `forge-tools`

Add nav item:

* Forge Tools

Make sure clicking it changes view correctly.

If existing nav is crowded on mobile:

* Keep label short: “Tools”
* Or place it in secondary nav if current app has one.

========================================
PART 10 — Technical quality
===========================

Keep implementation simple.

Good approach:

* Add local arrays/templates for generators inside `src/App.jsx`.
* Add small helper functions:

  * pickRandom
  * generateRapNames
  * generateDissPack
  * generateSunoPrompt
  * copyToClipboardWithStatus
* Reuse existing visual card styles/classes where possible.
* If current file is already large, still avoid major refactor unless necessary.

Clipboard:

* Use `navigator.clipboard.writeText` when available.
* Show “Skopiowano” feedback.
* Fallback gracefully if clipboard is unavailable.

LocalStorage:

* Use it only for Buchon best score/progress.
* Wrap localStorage access safely.

Accessibility:

* Buttons should be real `<button>`.
* Inputs should have labels or clear placeholder text.
* Do not rely only on color for status.

========================================
PART 11 — Tests / validation
============================

After changes, run:

npm run test:audio
npm run lint
npm run build

If possible also run:

npm run preview

But do not block if preview is interactive.

Verify:

* Existing player still works.
* Existing albums/tracks still show.
* Forge Tools nav opens.
* Generators generate output.
* Copy buttons work or fail gracefully.
* Buchon 555 increments score and reset works.
* Mobile layout does not overflow.

========================================
OUTPUT FORMAT
=============

When done, respond in Polish with:

1. Changed files.
2. Added features.
3. How to test locally.
4. Test results:

   * npm run test:audio
   * npm run lint
   * npm run build
5. Known limitations / next steps.
6. Suggested commit message.

Suggested commit message:
Add AA Forge Tools and creator monetization features

Do not commit unless explicitly asked.
