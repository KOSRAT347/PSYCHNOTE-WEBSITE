# PSYCHNOTE - trial copy (separate from the live site)

`.env.local` was deliberately removed. This copy is NOT linked to `woozy-bird-924`.
Never copy the old `.env.local` here and never run `npx convex dev` against the live deployment.

1. `npm i`
2. `npm run dev` -> Convex asks you to log in and CREATE A NEW project. Choose "new project".
3. Open the local URL. Anonymous auth works on the new project; it starts with empty data.

Included in this first slice: crisis bar + quick exit, 4 languages (ar / Sorani / Badini in Arabic script / en)
for header, tabs, welcome and footer. Kurdish texts are DRAFTS and need native review.
Inner pages (mood, assessment, ...) are still Arabic-only until translated.

Slice 2: mood support suggestions (Arabic) with crisis-text check, guided breathing, mobile bottom nav.
Before publishing: fill src/config/emergency.ts with VERIFIED helplines.

Slice 3: mood chart + weekday insight, PHQ-9/GAD-7 (client-side, not stored), grounding 5-4-3-2-1, font size + simple dark mode.
Not done: Kurdish for inner pages; review of existing Assessment; proper dark: theme.

Slice 4: Assessment fixes (self-esteem reverse scoring, notice banner); mood section translated to ckb/bdn (DRAFT). Non-Arabic support text uses the general category only.

Slice 5: Emergency section fully translated (UI + 4 techniques, client-side). Remaining untranslated: Dashboard, Theories, Disorders, Safety, Menu, StudentCorner, DailyContent, Assessment (+backend questions/solutions), ScreeningScales.
