import { useEffect, useRef } from 'react';

// Named icons render as monochrome SVGs (currentColor) so they stay congruent
// with the glyph icons across light/dark and active/inactive states.
const SVG_ICONS = {
  barbell: (
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
      <line x1="3.5" y1="12" x2="20.5" y2="12" />
      <line x1="6.5" y1="6.5" x2="6.5" y2="17.5" />
      <line x1="17.5" y1="6.5" x2="17.5" y2="17.5" />
      <line x1="3.5" y1="9" x2="3.5" y2="15" />
      <line x1="20.5" y1="9" x2="20.5" y2="15" />
    </svg>
  ),
};

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
              {SVG_ICONS[category.icon] ?? category.icon}
            </span>
            <span className="eyebrow">{category.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export default CategoryBar;
