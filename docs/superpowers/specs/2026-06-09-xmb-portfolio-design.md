# XMB Portfolio — Design Spec

**Date:** 2026-06-09
**Status:** Approved (pending implementation plan)
**Author:** Santiago Quintero (with Claude)

## Summary

Replace the current scrolling portfolio UI with a **PSP XrossMediaBar (XMB) shell**: a
cross-shaped menu navigated entirely with arrow keys (and swipe on touch), with
synthesized navigation sounds. The XMB *is* the site — visitors land in the cross,
arrow-navigate categories and items, and press X to open content in a slide-in detail
blade.

Visual direction: **Branded Minimalist** — XMB mechanics rendered in the site's existing
warm cream/dark palette with mono labels, not the literal Sony-blue PSP skin.

## Goals

- Full XMB shell as the primary (and only) navigation paradigm.
- Arrow-key navigation: `←/→` categories, `↑/↓` items, `X`/`Enter` open, `O`/`Esc`/`Back` close.
- Synthesized navigation sounds (cursor / enter / back), on by default with a mute toggle.
- Preserve all existing content with no rewriting — drive everything from current data files.
- Keep deep-linkable, SEO-friendly URLs synced to navigation state.
- Remain accessible (keyboard-first, reduced-motion, ARIA, managed focus).
- Work on touch via swipe gestures.

## Non-Goals (YAGNI)

- No new content or copywriting.
- No literal Sony PSP asset reproduction (no ripped audio, no Sony-blue theme).
- No on-screen D-pad (swipe is the touch model).
- No multiplayer/network/settings sub-systems from the real XMB.
- No CMS / content editing UI.

## Navigation Model (State Machine)

Two states:

### BROWSING (cross is live)
- `←` / `→` — switch category (wraps around the ends).
- `↑` / `↓` — move through items in the active category.
- `X` / `Enter` — open the selected item → transitions to DETAIL.
- Each cursor move plays the **cursor** sound; opening plays the **enter** sound.

### DETAIL (blade open)
- `↑` / `↓` — scroll the blade content.
- `O` / `Esc` / `Backspace` / `←` — close the blade → transitions to BROWSING.
- Closing plays the **back** sound.

State is owned by `XmbShell` via a `useXmbNavigation` hook. Category index, item index,
and open/closed state are the core variables. Navigation is also reachable by tap/swipe
(touch) and reflects into the URL (see URLs section).

## Content Structure

Six categories, each populated from existing data files. **No content is rewritten.**

| Category    | Items                                  | Source                      |
|-------------|----------------------------------------|-----------------------------|
| Profile     | Bio, photo, "what I'm up to"           | `Intro` component / profile |
| Experience  | Each job + each school (chronological) | `work.js`, `education.js`   |
| Projects    | Each portfolio project                 | `portfolio.js`              |
| Reading     | Current / Wishlist                     | `books.js`                  |
| Fitness     | Workout plan, Diet                     | `workouts.js`, `diet.js`    |
| Contact     | Email, GitHub, links                   | `Contact` component         |

`Experience` merges the current Work + Education timelines; `Fitness` merges
Workout + Diet. Ordering within Experience is reverse-chronological (newest first),
consistent with the current timeline.

## Detail Blade

- Cross stays pinned on the left; the blade slides in from the right with the item content.
- Default blade width fits typical items (job description, project write-up).
- **Heavy content** (the workout planner, the full reading table) widens the blade toward
  full-width via a "deep" state.
- Content is produced by **per-type renderers** that reuse existing components
  (`Table`, timeline/portfolio sub-components) rather than re-implementing them:
  - `ProfileDetail`, `ExperienceDetail`, `ProjectDetail`, `ReadingDetail`,
    `FitnessDetail` (workout planner + diet), `ContactDetail`.

## URLs & Routing

Navigation state syncs to the URL via React Router so the portfolio stays shareable and
indexable:

- Category selection → `/experience`, `/projects`, `/reading`, `/fitness`, `/profile`, `/contact`.
- Open item → `/experience/corellium`, `/projects/chargeback-heaven`, etc. (slugified).
- Landing on a deep link opens the cross with that category/item selected (and the blade
  open if the URL includes an item).
- Browser back/forward map to navigation transitions.
- A redirect/normalization handles `/` → the default category (Profile) and unknown paths → 404 within the shell.

Item slugs are derived deterministically from titles (kebab-case), defined in `xmbConfig`.

## Look & Ambient Details (Direction B)

- Warm dark palette and cream light palette from existing CSS variables; mono category labels;
  a single accent line under the active category.
- **Ambient wave**: a subtle animated wave behind the cross (CSS/canvas), more visible in dark mode.
- **Live clock/date** in the top corner (PSP nod).
- The existing **light/dark theme toggle is retained**; the XMB renders in both palettes.

## Sound System

- `useXmbSound` synthesizes three short tones via the **Web Audio API** (cursor / enter / back).
  No audio files shipped.
- **On by default.** A visible mute toggle in a corner persists the choice to `localStorage`.
- Audio context is created/resumed on the first user gesture (keypress / tap), per browser
  autoplay policy. If `localStorage` says muted, no sound plays.

## Touch / Mobile

- Swipe `←/→` between categories, swipe `↑/↓` through items, tap an item to open.
- Swipe-right or tap-back closes the blade.
- Same state machine as keyboard; gestures dispatch the same transitions.
- Layout adapts to small screens (cross may compress; blade goes full-width on open).

## Accessibility

- Keyboard navigation is the primary interface.
- `prefers-reduced-motion` disables the wave animation and slide transitions (instant swaps).
- ARIA roles/labels on the cross (menu/menuitem semantics) and the blade (dialog/region).
- Focus is moved into the blade on open and returned to the active item on close.
- Sound respects a muted preference; nothing autoplays without a gesture.
- All content remains present in the DOM and readable by assistive tech.

## Architecture

```
XmbShell                ← owns nav state, keyboard+swipe handlers, sound triggers, URL sync
 ├─ XmbBackground       ← animated wave + clock/date (reduced-motion aware)
 ├─ CategoryBar         ← horizontal category row
 ├─ ItemColumn          ← vertical items for the active category
 └─ DetailBlade         ← slides in; dispatches to per-type renderers
      ├─ ProfileDetail / ExperienceDetail / ProjectDetail
      └─ ReadingDetail / FitnessDetail / ContactDetail

hooks:
  useXmbNavigation      ← state machine (category/item indices, open state, transitions)
  useXmbSound           ← Web Audio synth (cursor/enter/back) + mute persistence

config:
  xmbConfig.js          ← maps categories → items → renderer + slug, pulls from existing data
```

- `App.jsx` routing is reworked around `XmbShell`.
- The current `Navigation`, `AppLayout`, and `Footer` chrome is replaced/absorbed by the shell.
- Existing page components (`Home`, `Workout`, `ReadingList`, `Diet`) are refactored into
  blade renderers that reuse their data and sub-components; standalone page routes are removed
  in favor of category/item routes.

## Component Responsibilities (isolation)

- **XmbShell** — single source of truth for navigation; renders background, bar, column, blade;
  wires input (keyboard/swipe) → `useXmbNavigation`; triggers sounds; syncs URL. Depends on
  `useXmbNavigation`, `useXmbSound`, `xmbConfig`.
- **CategoryBar** — pure render of categories given `categories` + `activeIndex`. No state.
- **ItemColumn** — pure render of items given the active category's items + `activeItemIndex`. No state.
- **DetailBlade** — given the active item + open flag, renders the correct per-type renderer;
  manages its own scroll and focus. No global nav state.
- **Per-type renderers** — given one item's data, render its content. Independent and testable.
- **useXmbNavigation** — given config + current URL, exposes state + transition functions. No DOM.
- **useXmbSound** — exposes `playCursor/playEnter/playBack` + mute state. Encapsulates Web Audio.

## Testing Strategy

- **useXmbNavigation**: unit-test transitions (wrap-around, open/close, bounds) as a pure reducer.
- **xmbConfig**: assert every data item maps to a slug and a renderer; slugs are unique.
- **useXmbSound**: mute persistence and gesture-gating logic (Web Audio mocked).
- **Renderers**: render each per-type renderer with sample data; assert content present.
- **Integration**: keyboard sequence drives expected category/item/URL; deep-link opens correct state.
- **Accessibility**: reduced-motion disables animation; focus moves into/out of blade; ARIA present.

## Open Questions

None at design time. (Light/dark retained; URLs synced — both confirmed.)
