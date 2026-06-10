import { useEffect, useRef } from 'react';

// Category symbols that need to read as recognizable objects are drawn as
// monochrome inline SVGs (currentColor) so they stay congruent with the text
// glyphs across light/dark and active/inactive states.
const ICON_SHAPES = {
  // Profile — minimal person avatar
  avatar: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M5 20c0-3.9 3.1-6 7-6s7 2.1 7 6" />
    </>
  ),
  // Experience — string of pearls (wisdom); open rings, not filled
  pearls: (
    <>
      <path d="M4 10q8 4 16 0" strokeWidth="1" />
      <circle cx="4" cy="10" r="2" strokeWidth="1.1" />
      <circle cx="8" cy="11.5" r="2" strokeWidth="1.1" />
      <circle cx="12" cy="12" r="2" strokeWidth="1.1" />
      <circle cx="16" cy="11.5" r="2" strokeWidth="1.1" />
      <circle cx="20" cy="10" r="2" strokeWidth="1.1" />
    </>
  ),
  // Projects — construction hard hat: tall ribbed shell + small brim (no top knob)
  hardhat: (
    <>
      <path d="M5.5 16.5h13" />
      <path d="M7 16.5a5 8 0 0 1 10 0" />
      <path d="M12 8.5v8" />
      <path d="M9.4 16.5v-4.7" />
      <path d="M14.6 16.5v-4.7" />
    </>
  ),
  // Reading — open book
  book: (
    <path d="M12 7v14M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
  ),
  // Fitness — barbell
  barbell: (
    <>
      <line x1="3.5" y1="12" x2="20.5" y2="12" />
      <line x1="6.5" y1="6.5" x2="6.5" y2="17.5" />
      <line x1="17.5" y1="6.5" x2="17.5" y2="17.5" />
      <line x1="3.5" y1="9" x2="3.5" y2="15" />
      <line x1="20.5" y1="9" x2="20.5" y2="15" />
    </>
  ),
};

function GlyphIcon({ name }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICON_SHAPES[name]}
    </svg>
  );
}

function CategoryBar({ categories, activeIndex, onSelect }) {
  const buttonRefs = useRef([]);

  // Keep the active category in view when navigating on narrow (scrollable) screens.
  useEffect(() => {
    buttonRefs.current[activeIndex]?.scrollIntoView?.({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    });
  }, [activeIndex]);

  return (
    <div
      className="xmb-cat-bar flex items-center gap-6 overflow-x-auto px-1 py-1 sm:gap-12"
      role="menubar"
      aria-label="Categories"
    >
      {categories.map((category, index) => {
        const isActive = index === activeIndex;
        return (
          <button
            type="button"
            key={category.slug}
            ref={(element) => {
              buttonRefs.current[index] = element;
            }}
            role="menuitem"
            aria-label={category.label}
            aria-current={isActive ? 'true' : undefined}
            onClick={() => onSelect?.(index)}
            className={`flex shrink-0 flex-col items-center gap-2 transition-all duration-200 ${
              isActive ? 'scale-110 opacity-100' : 'opacity-45 hover:opacity-80'
            }`}
          >
            <span
              className={`flex h-12 w-12 items-center justify-center rounded-lg border text-xl ${
                isActive
                  ? 'border-[var(--text)] bg-[var(--accent-soft)]'
                  : 'border-[var(--border)]'
              }`}
            >
              {ICON_SHAPES[category.icon] ? <GlyphIcon name={category.icon} /> : category.icon}
            </span>
            <span className="eyebrow">{category.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export default CategoryBar;
