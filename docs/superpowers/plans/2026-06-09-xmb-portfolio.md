# XMB Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the scrolling portfolio UI with a PSP XrossMediaBar (XMB) shell — a cross-shaped menu navigated with arrow keys and swipe, with synthesized navigation sounds, in the site's existing "Branded Minimalist" palette.

**Architecture:** A single `XmbShell` owns navigation state via a pure reducer (`useXmbNavigation`), renders a horizontal `CategoryBar`, a vertical `ItemColumn`, an ambient `XmbBackground`, and a slide-in `DetailBlade`. A pure config module (`xmbConfig`) maps the six categories to items and per-type detail renderers, sourced from the existing data files. Navigation state syncs to React Router URLs. A `useXmbSound` hook synthesizes cursor/enter/back tones with the Web Audio API.

**Tech Stack:** React 19, React Router 7, Vite 8, Tailwind v4, Web Audio API. Tests: Vitest + jsdom + @testing-library/react.

---

## File Structure

**Created:**
- `vitest.config.js` — test runner config (jsdom env, setup file)
- `src/test/setup.js` — testing-library jest-dom matchers + global mocks
- `src/xmb/xmbConfig.js` — category/item/renderer mapping + slug helpers (pure)
- `src/xmb/xmbConfig.test.js`
- `src/xmb/navReducer.js` — pure navigation state machine
- `src/xmb/navReducer.test.js`
- `src/xmb/useXmbNavigation.jsx` — hook wrapping reducer + URL sync
- `src/xmb/useXmbSound.jsx` — Web Audio synth + mute persistence
- `src/xmb/useXmbSound.test.js`
- `src/xmb/XmbBackground.jsx` — ambient wave + live clock
- `src/xmb/XmbBackground.test.jsx`
- `src/xmb/CategoryBar.jsx`
- `src/xmb/CategoryBar.test.jsx`
- `src/xmb/ItemColumn.jsx`
- `src/xmb/ItemColumn.test.jsx`
- `src/xmb/DetailBlade.jsx` — dispatches to per-type renderers + focus mgmt
- `src/xmb/DetailBlade.test.jsx`
- `src/xmb/renderers/ProfileDetail.jsx`
- `src/xmb/renderers/ExperienceDetail.jsx`
- `src/xmb/renderers/ProjectDetail.jsx`
- `src/xmb/renderers/ReadingDetail.jsx`
- `src/xmb/renderers/FitnessDetail.jsx`
- `src/xmb/renderers/ContactDetail.jsx`
- `src/xmb/renderers/renderers.test.jsx`
- `src/xmb/XmbShell.jsx` — top-level wiring (keyboard, swipe, sound, URL)
- `src/xmb/XmbShell.test.jsx`
- `src/xmb/xmb.css` — XMB-specific styles (wave animation, blade transitions)

**Modified:**
- `package.json` — add test deps + `test` script
- `src/App.jsx` — route everything through `XmbShell`
- `src/styles/tailwind.css` — `@import "../xmb/xmb.css";` + reduced-motion rules

**Reused as-is (imported by renderers, not modified):**
- `src/components/Home/Intro.jsx`, `src/components/Home/Contact.jsx`
- `src/components/Home/TimelineItem.jsx`, `src/components/Home/PortfolioItem.jsx`
- `src/pages/Workout.jsx`, `src/pages/Diet.jsx`, `src/pages/ReadingList.jsx`
- `src/data/*` (work, education, portfolio, books, workouts, diet)

**Removed at the end (Task 11):**
- `src/components/Navigation.jsx`, `src/components/layout/AppLayout.jsx`, `src/components/Footer.jsx` (replaced by the shell)

---

## Task 0: Test tooling

**Files:**
- Modify: `package.json`
- Create: `vitest.config.js`, `src/test/setup.js`

- [ ] **Step 1: Install test dependencies**

Run:
```bash
npm install -D vitest@^2 jsdom@^25 @testing-library/react@^16 @testing-library/jest-dom@^6 @testing-library/user-event@^14
```
Expected: packages added to `devDependencies`, no errors.

- [ ] **Step 2: Add the test script**

In `package.json`, add to `"scripts"`:
```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 3: Create `vitest.config.js`**

```js
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.js'],
    css: false,
  },
});
```

- [ ] **Step 4: Create `src/test/setup.js`**

```js
import '@testing-library/jest-dom/vitest';

// jsdom lacks matchMedia; provide a no-op implementation.
if (!window.matchMedia) {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  });
}
```

- [ ] **Step 5: Add a smoke test and verify the runner works**

Create `src/test/smoke.test.js`:
```js
import { describe, it, expect } from 'vitest';

describe('test runner', () => {
  it('runs', () => {
    expect(1 + 1).toBe(2);
  });
});
```
Run: `npm test`
Expected: PASS (1 passed).

- [ ] **Step 6: Remove the smoke test and commit**

```bash
rm src/test/smoke.test.js
git add package.json package-lock.json vitest.config.js src/test/setup.js
git commit -m "chore: add vitest + testing-library tooling"
```

---

## Task 1: Slug helper + xmbConfig

The config is the single source of truth: six categories, each exposing `items`, each item carrying a `type` (used by the blade to pick a renderer) and the data it needs. All pure — no React.

**Files:**
- Create: `src/xmb/xmbConfig.js`, `src/xmb/xmbConfig.test.js`

- [ ] **Step 1: Write the failing test**

`src/xmb/xmbConfig.test.js`:
```js
import { describe, it, expect } from 'vitest';
import {
  CATEGORIES,
  slugify,
  getCategoryIndexBySlug,
  findItemIndexBySlug,
} from './xmbConfig';

describe('slugify', () => {
  it('kebab-cases and strips punctuation', () => {
    expect(slugify('Chargeback Heaven')).toBe('chargeback-heaven');
    expect(slugify('Silicon Valley Bank')).toBe('silicon-valley-bank');
    expect(slugify("JPMorgan Chase!")).toBe('jpmorgan-chase');
  });
});

describe('CATEGORIES', () => {
  it('has the six categories in order', () => {
    expect(CATEGORIES.map((c) => c.slug)).toEqual([
      'profile', 'experience', 'projects', 'reading', 'fitness', 'contact',
    ]);
  });

  it('every category has at least one item with a unique slug and a type', () => {
    for (const category of CATEGORIES) {
      expect(category.items.length).toBeGreaterThan(0);
      const slugs = category.items.map((i) => i.slug);
      expect(new Set(slugs).size).toBe(slugs.length);
      for (const item of category.items) {
        expect(item.type).toBeTruthy();
        expect(item.title).toBeTruthy();
      }
    }
  });

  it('experience merges work and education (5 jobs + 2 schools = 7)', () => {
    const experience = CATEGORIES.find((c) => c.slug === 'experience');
    expect(experience.items.length).toBe(7);
  });

  it('projects has 10 items', () => {
    const projects = CATEGORIES.find((c) => c.slug === 'projects');
    expect(projects.items.length).toBe(10);
  });
});

describe('lookup helpers', () => {
  it('resolves category index by slug, -1 when missing', () => {
    expect(getCategoryIndexBySlug('projects')).toBe(2);
    expect(getCategoryIndexBySlug('nope')).toBe(-1);
  });

  it('resolves item index within a category, -1 when missing', () => {
    const idx = getCategoryIndexBySlug('experience');
    expect(findItemIndexBySlug(idx, 'corellium')).toBe(0);
    expect(findItemIndexBySlug(idx, 'nope')).toBe(-1);
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm test -- xmbConfig`
Expected: FAIL ("Cannot find module './xmbConfig'").

- [ ] **Step 3: Implement `src/xmb/xmbConfig.js`**

```js
import work from '../data/work';
import education from '../data/education';
import portfolio from '../data/portfolio';
import books from '../data/books';

export function slugify(value) {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const experienceItems = [...work, ...education].map((entry) => ({
  slug: slugify(entry.place),
  title: entry.place,
  subtitle: `${entry.title} · ${entry.year}`,
  type: 'experience',
  data: entry,
}));

const projectItems = portfolio.map((project) => ({
  slug: slugify(project.title),
  title: project.title,
  subtitle: project.stack?.join(' · ') ?? '',
  type: 'project',
  data: project,
}));

const readingItems = Object.keys(books).map((categoryKey) => ({
  slug: slugify(categoryKey),
  title: categoryKey,
  subtitle: `${books[categoryKey]?.length ?? 0} books`,
  type: 'reading',
  data: categoryKey,
}));

export const CATEGORIES = [
  {
    slug: 'profile',
    label: 'Profile',
    icon: '◉',
    items: [
      { slug: 'about', title: 'About', subtitle: 'Who I am', type: 'profile', data: null },
    ],
  },
  {
    slug: 'experience',
    label: 'Experience',
    icon: '⌘',
    items: experienceItems,
  },
  {
    slug: 'projects',
    label: 'Projects',
    icon: '◆',
    items: projectItems,
  },
  {
    slug: 'reading',
    label: 'Reading',
    icon: '▤',
    items: readingItems,
  },
  {
    slug: 'fitness',
    label: 'Fitness',
    icon: '⚡',
    items: [
      { slug: 'workout', title: 'Workout', subtitle: 'Weekly training plan', type: 'fitness-workout', data: null },
      { slug: 'diet', title: 'Diet', subtitle: 'Nutrition plan', type: 'fitness-diet', data: null },
    ],
  },
  {
    slug: 'contact',
    label: 'Contact',
    icon: '✉',
    items: [
      { slug: 'get-in-touch', title: 'Get in touch', subtitle: 'Links & email', type: 'contact', data: null },
    ],
  },
];

export function getCategoryIndexBySlug(slug) {
  return CATEGORIES.findIndex((category) => category.slug === slug);
}

export function findItemIndexBySlug(categoryIndex, itemSlug) {
  const category = CATEGORIES[categoryIndex];
  if (!category) return -1;
  return category.items.findIndex((item) => item.slug === itemSlug);
}
```

- [ ] **Step 4: Run to verify it passes**

Run: `npm test -- xmbConfig`
Expected: PASS. (If counts differ, update the test to match the real data length, not the config.)

- [ ] **Step 5: Commit**

```bash
git add src/xmb/xmbConfig.js src/xmb/xmbConfig.test.js
git commit -m "feat: XMB config + slug helpers"
```

---

## Task 2: Navigation reducer (pure state machine)

**Files:**
- Create: `src/xmb/navReducer.js`, `src/xmb/navReducer.test.js`

State shape: `{ categoryIndex, itemIndex, isOpen }`. Actions: `LEFT`, `RIGHT`, `UP`, `DOWN`, `OPEN`, `CLOSE`, `SET` (from URL). Categories wrap; items clamp; changing category resets `itemIndex` to 0; movement is ignored while `isOpen` except `CLOSE`.

- [ ] **Step 1: Write the failing test**

`src/xmb/navReducer.test.js`:
```js
import { describe, it, expect } from 'vitest';
import { navReducer, initialNavState } from './navReducer';

const sizes = [1, 7, 10, 2, 2, 1]; // items per category (profile..contact)

const reduce = (state, action) => navReducer(sizes, state, action);

describe('navReducer (browsing)', () => {
  it('RIGHT advances category and resets item to 0', () => {
    const s = reduce({ categoryIndex: 1, itemIndex: 3, isOpen: false }, { type: 'RIGHT' });
    expect(s).toEqual({ categoryIndex: 2, itemIndex: 0, isOpen: false });
  });

  it('RIGHT wraps from last to first', () => {
    const s = reduce({ categoryIndex: 5, itemIndex: 0, isOpen: false }, { type: 'RIGHT' });
    expect(s.categoryIndex).toBe(0);
  });

  it('LEFT wraps from first to last', () => {
    const s = reduce({ categoryIndex: 0, itemIndex: 0, isOpen: false }, { type: 'LEFT' });
    expect(s.categoryIndex).toBe(5);
  });

  it('DOWN advances item, clamps at last', () => {
    const a = reduce({ categoryIndex: 1, itemIndex: 0, isOpen: false }, { type: 'DOWN' });
    expect(a.itemIndex).toBe(1);
    const b = reduce({ categoryIndex: 1, itemIndex: 6, isOpen: false }, { type: 'DOWN' });
    expect(b.itemIndex).toBe(6); // clamp, 7 items
  });

  it('UP retreats item, clamps at 0', () => {
    const a = reduce({ categoryIndex: 1, itemIndex: 0, isOpen: false }, { type: 'UP' });
    expect(a.itemIndex).toBe(0);
  });

  it('OPEN sets isOpen true', () => {
    expect(reduce({ categoryIndex: 0, itemIndex: 0, isOpen: false }, { type: 'OPEN' }).isOpen).toBe(true);
  });
});

describe('navReducer (detail open)', () => {
  const open = { categoryIndex: 1, itemIndex: 2, isOpen: true };

  it('ignores LEFT/RIGHT/UP/DOWN while open', () => {
    expect(reduce(open, { type: 'RIGHT' })).toEqual(open);
    expect(reduce(open, { type: 'DOWN' })).toEqual(open);
  });

  it('CLOSE clears isOpen', () => {
    expect(reduce(open, { type: 'CLOSE' }).isOpen).toBe(false);
  });
});

describe('navReducer SET (from URL)', () => {
  it('sets indices and open flag, clamping out-of-range', () => {
    const s = reduce(initialNavState, { type: 'SET', categoryIndex: 2, itemIndex: 99, isOpen: true });
    expect(s).toEqual({ categoryIndex: 2, itemIndex: 9, isOpen: true }); // 10 items clamp to 9
  });

  it('negative indices fall back to 0', () => {
    const s = reduce(initialNavState, { type: 'SET', categoryIndex: -1, itemIndex: -1, isOpen: false });
    expect(s).toEqual({ categoryIndex: 0, itemIndex: 0, isOpen: false });
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm test -- navReducer`
Expected: FAIL ("Cannot find module './navReducer'").

- [ ] **Step 3: Implement `src/xmb/navReducer.js`**

```js
export const initialNavState = { categoryIndex: 0, itemIndex: 0, isOpen: false };

const clamp = (value, max) => Math.max(0, Math.min(value, max));
const wrap = (value, length) => ((value % length) + length) % length;

export function navReducer(sizes, state, action) {
  const itemCount = sizes[state.categoryIndex] ?? 1;

  switch (action.type) {
    case 'LEFT':
    case 'RIGHT': {
      if (state.isOpen) return state;
      const delta = action.type === 'RIGHT' ? 1 : -1;
      return {
        categoryIndex: wrap(state.categoryIndex + delta, sizes.length),
        itemIndex: 0,
        isOpen: false,
      };
    }
    case 'UP':
    case 'DOWN': {
      if (state.isOpen) return state;
      const delta = action.type === 'DOWN' ? 1 : -1;
      return { ...state, itemIndex: clamp(state.itemIndex + delta, itemCount - 1) };
    }
    case 'OPEN':
      return { ...state, isOpen: true };
    case 'CLOSE':
      return { ...state, isOpen: false };
    case 'SET': {
      const categoryIndex = clamp(action.categoryIndex ?? 0, sizes.length - 1);
      const maxItem = (sizes[categoryIndex] ?? 1) - 1;
      return {
        categoryIndex,
        itemIndex: clamp(action.itemIndex ?? 0, maxItem),
        isOpen: Boolean(action.isOpen),
      };
    }
    default:
      return state;
  }
}
```

- [ ] **Step 4: Run to verify it passes**

Run: `npm test -- navReducer`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/xmb/navReducer.js src/xmb/navReducer.test.js
git commit -m "feat: XMB navigation reducer"
```

---

## Task 3: Sound hook (Web Audio synth + mute persistence)

**Files:**
- Create: `src/xmb/useXmbSound.jsx`, `src/xmb/useXmbSound.test.js`

Sound is on by default. Mute persists to `localStorage['xmb-sound-muted']`. `play*` are no-ops while muted. The AudioContext is created lazily on first play (after a user gesture).

- [ ] **Step 1: Write the failing test**

`src/xmb/useXmbSound.test.js`:
```js
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { readInitialMuted, MUTE_STORAGE_KEY, useXmbSound } from './useXmbSound';

describe('readInitialMuted', () => {
  beforeEach(() => window.localStorage.clear());

  it('defaults to false (sound on)', () => {
    expect(readInitialMuted()).toBe(false);
  });

  it('reads true when stored', () => {
    window.localStorage.setItem(MUTE_STORAGE_KEY, 'true');
    expect(readInitialMuted()).toBe(true);
  });
});

describe('useXmbSound', () => {
  beforeEach(() => {
    window.localStorage.clear();
    // Minimal AudioContext mock
    const connect = () => ({ connect });
    globalThis.AudioContext = vi.fn(() => ({
      state: 'running',
      currentTime: 0,
      resume: vi.fn(),
      destination: {},
      createOscillator: () => ({
        type: 'sine', frequency: { setValueAtTime: vi.fn() },
        connect, start: vi.fn(), stop: vi.fn(),
      }),
      createGain: () => ({
        gain: { setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() },
        connect,
      }),
    }));
  });

  it('toggleMuted flips state and persists', () => {
    const { result } = renderHook(() => useXmbSound());
    expect(result.current.muted).toBe(false);
    act(() => result.current.toggleMuted());
    expect(result.current.muted).toBe(true);
    expect(window.localStorage.getItem(MUTE_STORAGE_KEY)).toBe('true');
  });

  it('does not create an AudioContext when muted', () => {
    window.localStorage.setItem(MUTE_STORAGE_KEY, 'true');
    const { result } = renderHook(() => useXmbSound());
    act(() => result.current.playCursor());
    expect(globalThis.AudioContext).not.toHaveBeenCalled();
  });

  it('creates an AudioContext on first play when unmuted', () => {
    const { result } = renderHook(() => useXmbSound());
    act(() => result.current.playCursor());
    expect(globalThis.AudioContext).toHaveBeenCalledTimes(1);
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm test -- useXmbSound`
Expected: FAIL ("Cannot find module './useXmbSound'").

- [ ] **Step 3: Implement `src/xmb/useXmbSound.jsx`**

```jsx
import { useCallback, useRef, useState } from 'react';

export const MUTE_STORAGE_KEY = 'xmb-sound-muted';

export function readInitialMuted() {
  if (typeof window === 'undefined') return false;
  return window.localStorage.getItem(MUTE_STORAGE_KEY) === 'true';
}

// Each tone: [frequency Hz, duration s, gain]
const TONES = {
  cursor: [660, 0.06, 0.05],
  enter: [880, 0.12, 0.06],
  back: [440, 0.1, 0.05],
};

function useXmbSound() {
  const [muted, setMuted] = useState(readInitialMuted);
  const mutedRef = useRef(muted);
  mutedRef.current = muted;
  const contextRef = useRef(null);

  const getContext = useCallback(() => {
    if (!contextRef.current) {
      const Ctor = window.AudioContext || window.webkitAudioContext;
      if (!Ctor) return null;
      contextRef.current = new Ctor();
    }
    if (contextRef.current.state === 'suspended') {
      contextRef.current.resume();
    }
    return contextRef.current;
  }, []);

  const play = useCallback((name) => {
    if (mutedRef.current) return;
    const ctx = getContext();
    if (!ctx) return;
    const [freq, duration, gainValue] = TONES[name];
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);
    gain.gain.setValueAtTime(gainValue, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + duration);
  }, [getContext]);

  const toggleMuted = useCallback(() => {
    setMuted((current) => {
      const next = !current;
      window.localStorage.setItem(MUTE_STORAGE_KEY, String(next));
      return next;
    });
  }, []);

  return {
    muted,
    toggleMuted,
    playCursor: useCallback(() => play('cursor'), [play]),
    playEnter: useCallback(() => play('enter'), [play]),
    playBack: useCallback(() => play('back'), [play]),
  };
}

export { useXmbSound };
export default useXmbSound;
```

- [ ] **Step 4: Run to verify it passes**

Run: `npm test -- useXmbSound`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/xmb/useXmbSound.jsx src/xmb/useXmbSound.test.js
git commit -m "feat: XMB Web Audio sound hook"
```

---

## Task 4: Ambient background (wave + live clock)

**Files:**
- Create: `src/xmb/XmbBackground.jsx`, `src/xmb/XmbBackground.test.jsx`, `src/xmb/xmb.css`

- [ ] **Step 1: Write the failing test**

`src/xmb/XmbBackground.test.jsx`:
```jsx
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import XmbBackground, { formatClock } from './XmbBackground';

describe('formatClock', () => {
  it('formats time and date', () => {
    const date = new Date('2026-06-09T14:32:00');
    const { time, day } = formatClock(date);
    expect(time).toMatch(/\d{1,2}:\d{2}/);
    expect(day).toMatch(/JUN/);
  });
});

describe('XmbBackground', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('renders a clock region', () => {
    render(<XmbBackground />);
    expect(screen.getByTestId('xmb-clock')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm test -- XmbBackground`
Expected: FAIL ("Cannot find module './XmbBackground'").

- [ ] **Step 3: Implement `src/xmb/XmbBackground.jsx`**

```jsx
import { useEffect, useState } from 'react';

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

export function formatClock(date) {
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const time = `${hours}:${minutes}`;
  const day = `${MONTHS[date.getMonth()]} ${date.getDate()}`;
  return { time, day };
}

function XmbBackground() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const { time, day } = formatClock(now);

  return (
    <div className="xmb-bg" aria-hidden="true">
      <div className="xmb-wave" />
      <div className="xmb-clock" data-testid="xmb-clock">
        <span className="xmb-clock-time">{time}</span>
        <span className="xmb-clock-day">{day}</span>
      </div>
    </div>
  );
}

export default XmbBackground;
```

- [ ] **Step 4: Create `src/xmb/xmb.css`**

```css
.xmb-bg {
  position: fixed;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

.xmb-wave {
  position: absolute;
  inset: -20%;
  background: repeating-linear-gradient(
    115deg,
    transparent 0 38px,
    var(--accent-soft) 38px 39px
  );
  opacity: 0.6;
  animation: xmb-drift 18s linear infinite;
}

@keyframes xmb-drift {
  from { transform: translateX(0); }
  to { transform: translateX(39px); }
}

.xmb-clock {
  position: absolute;
  top: 1.25rem;
  right: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.1rem;
  font-family: var(--font-mono);
  color: var(--muted);
}
.xmb-clock-time { font-size: 1.1rem; color: var(--text); }
.xmb-clock-day { font-size: 0.7rem; letter-spacing: 0.1em; }

/* DetailBlade slide-in */
.xmb-blade {
  transition: transform 220ms ease, opacity 220ms ease;
  transform: translateX(100%);
  opacity: 0;
}
.xmb-blade.is-open {
  transform: translateX(0);
  opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
  .xmb-wave { animation: none; }
  .xmb-blade { transition: none; }
}
```

- [ ] **Step 5: Wire the stylesheet in `src/styles/tailwind.css`**

Add after the `@import "tailwindcss";` line:
```css
@import "../xmb/xmb.css";
```

- [ ] **Step 6: Run to verify it passes**

Run: `npm test -- XmbBackground`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add src/xmb/XmbBackground.jsx src/xmb/XmbBackground.test.jsx src/xmb/xmb.css src/styles/tailwind.css
git commit -m "feat: XMB ambient background + clock"
```

---

## Task 5: CategoryBar

**Files:**
- Create: `src/xmb/CategoryBar.jsx`, `src/xmb/CategoryBar.test.jsx`

- [ ] **Step 1: Write the failing test**

`src/xmb/CategoryBar.test.jsx`:
```jsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CategoryBar from './CategoryBar';

const categories = [
  { slug: 'profile', label: 'Profile', icon: '◉' },
  { slug: 'experience', label: 'Experience', icon: '⌘' },
];

describe('CategoryBar', () => {
  it('renders all category labels', () => {
    render(<CategoryBar categories={categories} activeIndex={0} />);
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Experience')).toBeInTheDocument();
  });

  it('marks the active category with aria-current', () => {
    render(<CategoryBar categories={categories} activeIndex={1} />);
    expect(screen.getByText('Experience').closest('[role="menuitem"]'))
      .toHaveAttribute('aria-current', 'true');
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm test -- CategoryBar`
Expected: FAIL ("Cannot find module './CategoryBar'").

- [ ] **Step 3: Implement `src/xmb/CategoryBar.jsx`**

```jsx
function CategoryBar({ categories, activeIndex }) {
  return (
    <div className="flex items-center gap-8 sm:gap-12" role="menubar" aria-label="Categories">
      {categories.map((category, index) => {
        const isActive = index === activeIndex;
        return (
          <div
            key={category.slug}
            role="menuitem"
            aria-current={isActive ? 'true' : undefined}
            className={`flex flex-col items-center gap-2 transition-all duration-200 ${
              isActive ? 'scale-110 opacity-100' : 'opacity-45'
            }`}
          >
            <span
              className={`flex h-12 w-12 items-center justify-center rounded-lg border text-xl ${
                isActive
                  ? 'border-[var(--text)] bg-[var(--accent-soft)]'
                  : 'border-[var(--border)]'
              }`}
            >
              {category.icon}
            </span>
            <span className="eyebrow">{category.label}</span>
          </div>
        );
      })}
    </div>
  );
}

export default CategoryBar;
```

- [ ] **Step 4: Run to verify it passes**

Run: `npm test -- CategoryBar`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/xmb/CategoryBar.jsx src/xmb/CategoryBar.test.jsx
git commit -m "feat: XMB category bar"
```

---

## Task 6: ItemColumn

**Files:**
- Create: `src/xmb/ItemColumn.jsx`, `src/xmb/ItemColumn.test.jsx`

- [ ] **Step 1: Write the failing test**

`src/xmb/ItemColumn.test.jsx`:
```jsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ItemColumn from './ItemColumn';

const items = [
  { slug: 'corellium', title: 'Corellium', subtitle: 'SWE · 2023–Now' },
  { slug: 'svb', title: 'Silicon Valley Bank', subtitle: 'SWE · 2022–23' },
];

describe('ItemColumn', () => {
  it('renders item titles and subtitles', () => {
    render(<ItemColumn items={items} activeIndex={0} />);
    expect(screen.getByText('Corellium')).toBeInTheDocument();
    expect(screen.getByText('SWE · 2022–23')).toBeInTheDocument();
  });

  it('marks the active item with aria-current', () => {
    render(<ItemColumn items={items} activeIndex={1} />);
    expect(screen.getByText('Silicon Valley Bank').closest('[role="menuitem"]'))
      .toHaveAttribute('aria-current', 'true');
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm test -- ItemColumn`
Expected: FAIL ("Cannot find module './ItemColumn'").

- [ ] **Step 3: Implement `src/xmb/ItemColumn.jsx`**

```jsx
function ItemColumn({ items, activeIndex }) {
  return (
    <ul className="flex flex-col gap-3" role="menu" aria-label="Items">
      {items.map((item, index) => {
        const isActive = index === activeIndex;
        return (
          <li
            key={item.slug}
            role="menuitem"
            aria-current={isActive ? 'true' : undefined}
            className={`flex items-baseline gap-3 transition-opacity ${
              isActive ? 'opacity-100' : 'opacity-55'
            }`}
          >
            <span
              className={`text-sm ${isActive ? 'font-semibold text-[var(--text)]' : 'text-[var(--muted)]'}`}
            >
              {item.title}
            </span>
            {item.subtitle ? (
              <span className="text-xs text-[var(--muted)]">{item.subtitle}</span>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}

export default ItemColumn;
```

- [ ] **Step 4: Run to verify it passes**

Run: `npm test -- ItemColumn`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/xmb/ItemColumn.jsx src/xmb/ItemColumn.test.jsx
git commit -m "feat: XMB item column"
```

---

## Task 7: Detail renderers

Each renderer takes a single `item` and renders its content, reusing existing components/pages. Keep them thin.

**Files:**
- Create: `src/xmb/renderers/ProfileDetail.jsx`, `ExperienceDetail.jsx`, `ProjectDetail.jsx`, `ReadingDetail.jsx`, `FitnessDetail.jsx`, `ContactDetail.jsx`, `renderers.test.jsx`

- [ ] **Step 1: Write the failing test**

`src/xmb/renderers/renderers.test.jsx`:
```jsx
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import ProfileDetail from './ProfileDetail';
import ExperienceDetail from './ExperienceDetail';
import ProjectDetail from './ProjectDetail';
import ContactDetail from './ContactDetail';

const wrap = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>);

describe('renderers', () => {
  it('ProfileDetail shows the name', () => {
    wrap(<ProfileDetail />);
    expect(screen.getByText(/Santiago Quintero/i)).toBeInTheDocument();
  });

  it('ExperienceDetail shows place and title', () => {
    const item = { data: { place: 'Corellium', title: 'SWE', year: '2023 - Present', responsibilities: ['Did things'], achievements: [] } };
    wrap(<ExperienceDetail item={item} />);
    expect(screen.getByText('Corellium')).toBeInTheDocument();
    expect(screen.getByText('Did things')).toBeInTheDocument();
  });

  it('ProjectDetail shows project title and a link', () => {
    const item = { data: { title: 'Chargeback Heaven', stack: ['React'], link: 'https://example.com', date: '2024' } };
    wrap(<ProjectDetail item={item} />);
    expect(screen.getByText('Chargeback Heaven')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /visit/i })).toHaveAttribute('href', 'https://example.com');
  });

  it('ContactDetail shows LinkedIn and GitHub links', () => {
    wrap(<ContactDetail />);
    expect(screen.getByRole('link', { name: /linkedin/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /github/i })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm test -- renderers`
Expected: FAIL ("Cannot find module './ProfileDetail'").

- [ ] **Step 3: Implement the renderers**

`src/xmb/renderers/ProfileDetail.jsx`:
```jsx
import Intro from '../../components/Home/Intro';

function ProfileDetail() {
  return <Intro />;
}

export default ProfileDetail;
```

`src/xmb/renderers/ExperienceDetail.jsx`:
```jsx
function ExperienceDetail({ item }) {
  const { place, title, year, responsibilities = [], achievements = [], details = [] } = item.data;
  return (
    <article className="max-w-2xl">
      <p className="eyebrow mb-2">{year}</p>
      <h2 className="text-2xl font-normal text-[var(--text)]">{place}</h2>
      <p className="mt-1 text-sm text-[var(--muted)]">{title}</p>

      {responsibilities.length > 0 && (
        <ul className="mt-6 flex flex-col gap-2">
          {responsibilities.map((line, index) => (
            <li key={index} className="text-sm leading-7 text-[var(--muted)]">{line}</li>
          ))}
        </ul>
      )}
      {achievements.length > 0 && (
        <>
          <p className="eyebrow mt-6 mb-2">Achievements</p>
          <ul className="flex flex-col gap-2">
            {achievements.map((line, index) => (
              <li key={index} className="text-sm leading-7 text-[var(--muted)]">{line}</li>
            ))}
          </ul>
        </>
      )}
      {details.length > 0 && (
        <ul className="mt-6 flex flex-col gap-2">
          {details.map((line, index) => (
            <li key={index} className="text-sm leading-7 text-[var(--muted)]">{line}</li>
          ))}
        </ul>
      )}
    </article>
  );
}

export default ExperienceDetail;
```

`src/xmb/renderers/ProjectDetail.jsx`:
```jsx
function ProjectDetail({ item }) {
  const { title, stack = [], link, date, details } = item.data;
  return (
    <article className="max-w-2xl">
      <p className="eyebrow mb-2">{date}</p>
      <h2 className="text-2xl font-normal text-[var(--text)]">{title}</h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {stack.map((tech) => (
          <span key={tech} className="soft-chip rounded px-2 py-0.5 text-xs">{tech}</span>
        ))}
      </div>
      {details ? <p className="mt-5 text-sm leading-7 text-[var(--muted)]">{details}</p> : null}
      {link ? (
        <a href={link} target="_blank" rel="noreferrer" className="text-link mt-5 inline-block text-sm">
          Visit project →
        </a>
      ) : null}
    </article>
  );
}

export default ProjectDetail;
```

`src/xmb/renderers/ReadingDetail.jsx` (reuses the existing ReadingList page, which already renders the full table UI):
```jsx
import ReadingList from '../../pages/ReadingList';

function ReadingDetail() {
  return <ReadingList />;
}

export default ReadingDetail;
```

`src/xmb/renderers/FitnessDetail.jsx`:
```jsx
import Workout from '../../pages/Workout';
import Diet from '../../pages/Diet';

function FitnessDetail({ item }) {
  if (item.type === 'fitness-diet') {
    return <Diet />;
  }
  return <Workout />;
}

export default FitnessDetail;
```

`src/xmb/renderers/ContactDetail.jsx`:
```jsx
import Contact from '../../components/Home/Contact';

function ContactDetail() {
  return <Contact />;
}

export default ContactDetail;
```

- [ ] **Step 4: Run to verify it passes**

Run: `npm test -- renderers`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/xmb/renderers
git commit -m "feat: XMB detail renderers"
```

---

## Task 8: DetailBlade (dispatch + focus management)

**Files:**
- Create: `src/xmb/DetailBlade.jsx`, `src/xmb/DetailBlade.test.jsx`

Dispatches to the right renderer based on `item.type`, slides in when `isOpen`, and moves focus into itself on open.

- [ ] **Step 1: Write the failing test**

`src/xmb/DetailBlade.test.jsx`:
```jsx
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DetailBlade from './DetailBlade';

const wrap = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>);

const experienceItem = {
  type: 'experience',
  title: 'Corellium',
  data: { place: 'Corellium', title: 'SWE', year: '2023', responsibilities: ['Built things'], achievements: [] },
};

describe('DetailBlade', () => {
  it('renders the matching renderer when open', () => {
    wrap(<DetailBlade item={experienceItem} isOpen onClose={() => {}} />);
    expect(screen.getByText('Built things')).toBeInTheDocument();
  });

  it('has is-open class only when open', () => {
    const { rerender } = wrap(<DetailBlade item={experienceItem} isOpen={false} onClose={() => {}} />);
    expect(screen.getByTestId('xmb-blade')).not.toHaveClass('is-open');
    rerender(<MemoryRouter><DetailBlade item={experienceItem} isOpen onClose={() => {}} /></MemoryRouter>);
    expect(screen.getByTestId('xmb-blade')).toHaveClass('is-open');
  });

  it('calls onClose when the close button is clicked', async () => {
    const onClose = vi.fn();
    wrap(<DetailBlade item={experienceItem} isOpen onClose={onClose} />);
    await userEvent.click(screen.getByRole('button', { name: /back/i }));
    expect(onClose).toHaveBeenCalled();
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm test -- DetailBlade`
Expected: FAIL ("Cannot find module './DetailBlade'").

- [ ] **Step 3: Implement `src/xmb/DetailBlade.jsx`**

```jsx
import { useEffect, useRef } from 'react';
import ProfileDetail from './renderers/ProfileDetail';
import ExperienceDetail from './renderers/ExperienceDetail';
import ProjectDetail from './renderers/ProjectDetail';
import ReadingDetail from './renderers/ReadingDetail';
import FitnessDetail from './renderers/FitnessDetail';
import ContactDetail from './renderers/ContactDetail';

const RENDERERS = {
  profile: ProfileDetail,
  experience: ExperienceDetail,
  project: ProjectDetail,
  reading: ReadingDetail,
  'fitness-workout': FitnessDetail,
  'fitness-diet': FitnessDetail,
  contact: ContactDetail,
};

// Heavy content widens the blade toward full width.
const WIDE_TYPES = new Set(['reading', 'fitness-workout', 'fitness-diet']);

function DetailBlade({ item, isOpen, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    if (isOpen && ref.current) {
      ref.current.focus();
    }
  }, [isOpen, item]);

  const Renderer = item ? RENDERERS[item.type] : null;
  const wide = item && WIDE_TYPES.has(item.type);

  return (
    <section
      ref={ref}
      tabIndex={-1}
      data-testid="xmb-blade"
      role="dialog"
      aria-modal="false"
      aria-label={item ? item.title : 'Detail'}
      aria-hidden={!isOpen}
      className={`xmb-blade fixed right-0 top-0 z-20 h-full overflow-y-auto border-l border-[var(--border)] bg-[var(--surface)] p-6 sm:p-10 ${
        wide ? 'w-full lg:w-[70%]' : 'w-full sm:w-[60%] lg:w-[50%]'
      } ${isOpen ? 'is-open' : ''}`}
    >
      <button
        type="button"
        onClick={onClose}
        className="eyebrow mb-6 flex items-center gap-2 text-[var(--muted)] hover:text-[var(--text)]"
      >
        ◀ Back
      </button>
      {Renderer && isOpen ? <Renderer item={item} /> : null}
    </section>
  );
}

export default DetailBlade;
```

- [ ] **Step 4: Run to verify it passes**

Run: `npm test -- DetailBlade`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/xmb/DetailBlade.jsx src/xmb/DetailBlade.test.jsx
git commit -m "feat: XMB detail blade with renderer dispatch"
```

---

## Task 9: useXmbNavigation hook (reducer + URL sync)

**Files:**
- Create: `src/xmb/useXmbNavigation.jsx`

This hook binds the pure reducer to React Router. **Local reducer state is authoritative** — the highlighted browsing item is NOT encoded in the URL (browsing URLs are just `/:categorySlug`), so deriving it from the URL would reset the cursor on every move. Instead: initialize state from params (for deep links), sync state→URL after live navigation (PUSH), and sync URL→state only on browser back/forward (POP). The `:itemSlug` segment is present **only when the blade is open** — that is how a deep link opens the blade. No new test file — exercised by the `XmbShell` integration test in Task 10.

- [ ] **Step 1: Implement `src/xmb/useXmbNavigation.jsx`**

Create the file with exactly these contents:
```jsx
import { useCallback, useEffect, useReducer } from 'react';
import { useLocation, useNavigate, useNavigationType, useParams } from 'react-router-dom';
import { CATEGORIES, getCategoryIndexBySlug, findItemIndexBySlug } from './xmbConfig';
import { navReducer } from './navReducer';

const SIZES = CATEGORIES.map((category) => category.items.length);

export function stateFromParams(params) {
  const categoryIndex = Math.max(0, getCategoryIndexBySlug(params.categorySlug ?? 'profile'));
  const itemIndex = params.itemSlug
    ? Math.max(0, findItemIndexBySlug(categoryIndex, params.itemSlug))
    : 0;
  return { categoryIndex, itemIndex, isOpen: Boolean(params.itemSlug) };
}

export function urlForState(state) {
  const category = CATEGORIES[state.categoryIndex];
  if (!state.isOpen) {
    return `/${category.slug}`;
  }
  const item = category.items[state.itemIndex];
  return `/${category.slug}/${item.slug}`;
}

const boundReducer = (state, action) => navReducer(SIZES, state, action);

function useXmbNavigation() {
  const params = useParams();
  const navigate = useNavigate();
  const navigationType = useNavigationType();
  const location = useLocation();

  const [state, dispatch] = useReducer(boundReducer, params, stateFromParams);

  // Live navigation (PUSH): reflect local state into the URL.
  useEffect(() => {
    const url = urlForState(state);
    if (url !== location.pathname) {
      navigate(url);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  // Browser back/forward (POP): pull state from the URL.
  useEffect(() => {
    if (navigationType === 'POP') {
      dispatch({ type: 'SET', ...stateFromParams(params) });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, navigationType]);

  const category = CATEGORIES[state.categoryIndex];
  const item = category.items[state.itemIndex];

  return { state, dispatch, categories: CATEGORIES, category, item };
}

export default useXmbNavigation;
```

- [ ] **Step 2: Verify the project still builds (no test yet)**

Run: `npm run build`
Expected: build succeeds (this file is not yet imported, so this just confirms no syntax errors once imported in Task 10; if build doesn't pick it up, this step is a no-op and Task 10's test covers it).

- [ ] **Step 3: Commit**

```bash
git add src/xmb/useXmbNavigation.jsx
git commit -m "feat: XMB navigation hook with URL sync"
```

---

## Task 10: XmbShell (wire keyboard, swipe, sound, URL) + routing

**Files:**
- Create: `src/xmb/XmbShell.jsx`, `src/xmb/XmbShell.test.jsx`
- Modify: `src/App.jsx`

- [ ] **Step 1: Write the failing integration test**

`src/xmb/XmbShell.test.jsx`:
```jsx
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import XmbShell from './XmbShell';

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/" element={<XmbShell />} />
        <Route path="/:categorySlug" element={<XmbShell />} />
        <Route path="/:categorySlug/:itemSlug" element={<XmbShell />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('XmbShell', () => {
  beforeEach(() => {
    globalThis.AudioContext = vi.fn(() => ({
      state: 'running', currentTime: 0, resume: vi.fn(), destination: {},
      createOscillator: () => ({ type: 'sine', frequency: { setValueAtTime: vi.fn() }, connect: () => ({ connect: () => {} }), start: vi.fn(), stop: vi.fn() }),
      createGain: () => ({ gain: { setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() }, connect: () => ({ connect: () => {} }) }),
    }));
  });

  it('renders all six category labels at root', () => {
    renderAt('/');
    ['Profile', 'Experience', 'Projects', 'Reading', 'Fitness', 'Contact'].forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it('ArrowRight moves to the next category', async () => {
    renderAt('/profile');
    await userEvent.keyboard('{ArrowRight}');
    // Experience items appear (Corellium is the first job)
    expect(await screen.findByText('Corellium')).toBeInTheDocument();
  });

  it('deep link opens the blade with the item content', () => {
    renderAt('/experience/corellium');
    expect(screen.getByTestId('xmb-blade')).toHaveClass('is-open');
  });

  it('Enter opens the blade, Escape closes it', async () => {
    renderAt('/experience');
    await userEvent.keyboard('{Enter}');
    expect(screen.getByTestId('xmb-blade')).toHaveClass('is-open');
    await userEvent.keyboard('{Escape}');
    expect(screen.getByTestId('xmb-blade')).not.toHaveClass('is-open');
  });

  it('renders a sound toggle button', () => {
    renderAt('/');
    expect(screen.getByRole('button', { name: /sound|mute/i })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm test -- XmbShell`
Expected: FAIL ("Cannot find module './XmbShell'").

- [ ] **Step 3: Implement `src/xmb/XmbShell.jsx`**

```jsx
import { useEffect, useRef } from 'react';
import useXmbNavigation from './useXmbNavigation';
import useXmbSound from './useXmbSound';
import useTheme from '../hooks/useTheme';
import XmbBackground from './XmbBackground';
import CategoryBar from './CategoryBar';
import ItemColumn from './ItemColumn';
import DetailBlade from './DetailBlade';

const KEY_ACTIONS = {
  ArrowLeft: 'LEFT',
  ArrowRight: 'RIGHT',
  ArrowUp: 'UP',
  ArrowDown: 'DOWN',
  Enter: 'OPEN',
  ' ': 'OPEN',
  Escape: 'CLOSE',
  Backspace: 'CLOSE',
};

const SWIPE_THRESHOLD = 40;

function XmbShell() {
  const { state, dispatch, categories, category, item } = useXmbNavigation();
  const { muted, toggleMuted, playCursor, playEnter, playBack } = useXmbSound();
  const { theme, toggleTheme } = useTheme();
  const touchStart = useRef(null);

  const soundForAction = (action) => {
    if (action === 'OPEN') playEnter();
    else if (action === 'CLOSE') playBack();
    else playCursor();
  };

  useEffect(() => {
    const onKeyDown = (event) => {
      // In detail view, only CLOSE keys are handled; let content scroll otherwise.
      let action = KEY_ACTIONS[event.key];
      if (!action) return;
      if (state.isOpen && action !== 'CLOSE') {
        if (action === 'LEFT') action = 'CLOSE';
        else return;
      }
      event.preventDefault();
      soundForAction(action);
      dispatch({ type: action });
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  const onTouchStart = (event) => {
    const touch = event.changedTouches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const onTouchEnd = (event) => {
    if (!touchStart.current) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - touchStart.current.x;
    const dy = touch.clientY - touchStart.current.y;
    touchStart.current = null;

    let action = null;
    if (Math.abs(dx) > Math.abs(dy)) {
      if (Math.abs(dx) < SWIPE_THRESHOLD) return;
      action = dx < 0 ? 'RIGHT' : 'LEFT';
      if (state.isOpen) action = dx > 0 ? 'CLOSE' : null;
    } else {
      if (Math.abs(dy) < SWIPE_THRESHOLD) return;
      action = dy < 0 ? 'DOWN' : 'UP';
      if (state.isOpen) return;
    }
    if (!action) return;
    soundForAction(action);
    dispatch({ type: action });
  };

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden font-inter text-[var(--text)]"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <XmbBackground />

      <div className="absolute right-6 top-6 z-30 flex gap-3">
        <button
          type="button"
          onClick={toggleTheme}
          className="eyebrow text-[var(--muted)] hover:text-[var(--text)]"
        >
          {theme === 'dark' ? 'Light' : 'Dark'}
        </button>
        <button
          type="button"
          aria-label={muted ? 'Unmute sound' : 'Mute sound'}
          onClick={toggleMuted}
          className="eyebrow text-[var(--muted)] hover:text-[var(--text)]"
        >
          {muted ? 'Sound off' : 'Sound on'}
        </button>
      </div>

      <main className="relative z-10 flex min-h-screen flex-col justify-center gap-12 px-6 sm:px-12">
        <CategoryBar categories={categories} activeIndex={state.categoryIndex} />
        <ItemColumn items={category.items} activeIndex={state.itemIndex} />
      </main>

      <DetailBlade
        item={item}
        isOpen={state.isOpen}
        onClose={() => {
          playBack();
          dispatch({ type: 'CLOSE' });
        }}
      />

      <p className="absolute bottom-4 right-6 z-10 text-xs text-[var(--muted)]">
        ▲ ▼ ◀ ▶ navigate · X open · O back
      </p>
    </div>
  );
}

export default XmbShell;
```

- [ ] **Step 4: Run to verify it passes**

Run: `npm test -- XmbShell`
Expected: PASS. If the keyboard test fails because focus is on the blade button, ensure the `keydown` listener is on `window` (it is) — the test types globally.

- [ ] **Step 5: Rewire `src/App.jsx`**

Replace the entire file with:
```jsx
import XmbShell from './xmb/XmbShell';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<XmbShell />} />
      <Route path="/:categorySlug" element={<XmbShell />} />
      <Route path="/:categorySlug/:itemSlug" element={<XmbShell />} />
    </Routes>
  );
}

export default App;
```

- [ ] **Step 6: Run the full suite and build**

Run: `npm test`
Expected: all PASS.
Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 7: Commit**

```bash
git add src/xmb/XmbShell.jsx src/xmb/XmbShell.test.jsx src/App.jsx
git commit -m "feat: XmbShell + route everything through the XMB"
```

---

## Task 11: Cleanup, accessibility polish, manual verification

**Files:**
- Remove: `src/components/Navigation.jsx`, `src/components/layout/AppLayout.jsx`, `src/components/Footer.jsx`
- Modify: `src/pages/404.jsx` (route unknown categories into the shell or a simple message)

- [ ] **Step 1: Confirm the removed chrome is unreferenced**

Run: `grep -rn "AppLayout\|components/Navigation\|components/Footer" src`
Expected: no results (only the now-deleted files referenced them). If anything remains, update it to not import these.

- [ ] **Step 2: Remove the obsolete chrome**

```bash
git rm src/components/Navigation.jsx src/components/layout/AppLayout.jsx src/components/Footer.jsx
```

- [ ] **Step 3: Handle unknown category slugs**

Unknown `:categorySlug` currently clamps to Profile (via `Math.max(0, ...)` in `deriveState`). Confirm this is acceptable by adding a test to `src/xmb/XmbShell.test.jsx`:
```jsx
  it('unknown category falls back to Profile without crashing', () => {
    renderAt('/totally-unknown');
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });
```
Run: `npm test -- XmbShell`
Expected: PASS.

- [ ] **Step 4: Add reduced-motion + ARIA verification test**

Append to `src/xmb/XmbBackground.test.jsx`:
```jsx
  it('wave element is aria-hidden', () => {
    render(<XmbBackground />);
    expect(document.querySelector('.xmb-bg')).toHaveAttribute('aria-hidden', 'true');
  });
```
Run: `npm test -- XmbBackground`
Expected: PASS. (Reduced-motion behavior itself is enforced by the CSS `@media (prefers-reduced-motion: reduce)` block added in Task 4 — verified manually in Step 6.)

- [ ] **Step 5: Run the full suite, lint, and build**

Run: `npm test`
Expected: all PASS.
Run: `npm run lint`
Expected: no errors (fix any unused imports flagged in the deleted-chrome area).
Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 6: Manual verification (REQUIRED — invoke the `verify` or `run` skill)**

Start the dev server (`npm run dev`) and confirm in a browser:
1. Arrow keys move the cross; each move plays a soft blip.
2. `Enter`/`X` opens the blade with the right content; `Esc`/`O`/`←` closes it with the back tone.
3. The URL updates as you navigate (`/experience/corellium`) and a hard refresh on that URL opens the same state.
4. The sound toggle mutes/unmutes and the choice survives a refresh.
5. Light/dark toggle still works and the wave/clock render in both.
6. With OS "reduce motion" enabled, the wave animation and blade slide are disabled.
7. On a narrow viewport (or touch emulation), swipes move the cross and open/close the blade.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "chore: remove old chrome, finalize XMB accessibility + verification"
```

---

## Self-Review Notes

- **Spec coverage:** navigation model (Tasks 2, 10), content structure (Task 1), detail blade (Tasks 7, 8), URL sync (Tasks 9, 10), look/ambient (Task 4), sound (Task 3), touch (Task 10), accessibility (Tasks 8, 11), architecture (all). ✔
- **Heavy-content blade widening** → `WIDE_TYPES` in Task 8. ✔
- **Light/dark retained** → theme toggle wired in Task 10, CSS vars reused throughout. ✔
- **No placeholders:** every code step contains complete code; commands include expected output.
- **Type consistency:** action strings (`LEFT/RIGHT/UP/DOWN/OPEN/CLOSE/SET`), state shape (`categoryIndex/itemIndex/isOpen`), item `type` strings, and renderer keys match across Tasks 1, 2, 7, 8, 9, 10.
```
