# AGENTS.md — AA Records

## Project identity

AA Records is a dark cyber/neon underground music label website built with React and Vite.

The site vibe is:

* underground music label
* AI-powered creative studio
* cyber terminal / neon interface
* Polish + English street/AI aesthetic
* audio-first experience with a persistent player

Public site:

* https://aa-records.vercel.app/

Main technical stack:

* React
* Vite
* Tailwind-style utility classes / CSS
* local audio files in `public/music`
* main app logic mostly in `src/App.jsx`

## Prime directive

Do not break the audio player.

The player, playlist switching, audio paths, current track state, progress, visualizer, and mobile bottom-player behavior are core product features.

When making changes:

* preserve existing tracks
* preserve existing playlists
* preserve existing player controls
* preserve working audio paths
* preserve visualizer behavior unless explicitly asked to change it
* do not rebuild the app from scratch
* prefer small targeted edits over large refactors

## Important files

Most important files:

* `src/App.jsx` — main app UI, player logic, views, playlists, track metadata
* `src/App.css` — global/custom styling if present
* `package.json` — scripts and dependencies
* `scripts/check-audio-tracks.mjs` — audio smoke test
* `public/music/*` — real audio assets

Do not add new npm packages unless the task clearly requires it.

Do not move audio files unless explicitly asked.

Do not rename existing audio files unless all references and tests are updated.

## Audio rules

Audio files are product-critical.

Before adding or changing tracks:

1. Inspect `public/music`.
2. Use only real existing files for playable tracks.
3. If a track is planned but audio is missing, mark it as `coming soon` and do not give it a playable `src`.
4. Coming soon tracks must not fail `npm run test:audio`.
5. Do not preload all audio files at once.
6. Player CTA buttons must use the existing player logic.

The audio smoke test should check playable tracks only.

## Testing commands

After meaningful changes, run:

```powershell
npm run test:audio
npm run lint
npm run build
```

If only copy/text changed, still consider running:

```powershell
npm run build
```

If audio metadata or files changed, always run:

```powershell
npm run test:audio
```

Report clearly:

* which commands passed
* which commands failed
* what was changed to fix failures

## Development workflow

For larger changes:

1. Read the task/spec file first.
2. Inspect relevant files.
3. Present a short plan.
4. Wait for approval if the user asked for approval first.
5. Make targeted edits.
6. Run tests/build.
7. Summarize changed files and behavior.

For small changes:

* edit only the necessary files
* avoid unrelated cleanup
* avoid formatting churn
* do not rewrite large sections unnecessarily

## Design rules

Keep the current AA Records style:

* dark background
* neon green / purple / cyan / amber accents
* cyber glow
* underground label feel
* strong album/track cards
* mobile-first spacing
* persistent bottom player must remain usable

Preferred microcopy:

* transmission live
* build passed
* from chaos to track
* AI Companion Sessions
* Forge signal online
* Codex Kitchen
* Local Forge
* audio check online

Avoid:

* generic corporate SaaS style
* plain white sections
* boring stock music layout
* huge walls of text on homepage

## Feature rules

Good feature additions:

* new album/EP sections
* featured transmissions
* track vibe badges
* audio health badge
* copy-link UX
* custom track lab CTA
* lore/timeline sections
* Codex Kitchen Log
* Buchon 555 / arcade teasers
* visualizer labels
* mobile polish

Avoid:

* backend payments
* authentication
* analytics/tracking
* external APIs
* autoplay audio
* complex game loops unless explicitly requested
* breaking existing navigation

## Mobile rules

Always consider mobile:

* bottom player must not hide important CTA buttons
* long track titles should wrap or truncate cleanly
* cards should not overflow horizontally
* spacing should remain comfortable
* navigation should remain usable

## Git hygiene

Before final summary, check:

```powershell
git status
git diff --stat
```

Do not commit unless explicitly asked.

Suggested commit style:

* `Add Fire Into Form EP and expand AA Records experience`
* `Polish AA Records mobile player and track cards`
* `Add Codex Kitchen Log and custom track lab CTA`

## Communication style

Respond in Polish unless the user asks otherwise.

Be direct, practical, and concise.

When finishing work, report:

1. changed files
2. new sections/features
3. test results
4. how to verify locally
5. any known limitations

Do not pretend tests passed if they were not run.
