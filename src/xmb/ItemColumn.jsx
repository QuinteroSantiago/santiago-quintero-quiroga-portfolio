import { useLayoutEffect, useRef, useState } from 'react';

function ItemColumn({ items, activeIndex, onOpen }) {
  const listRef = useRef(null);
  const [offset, setOffset] = useState(0);

  // Keep the active item pinned to a fixed line; scroll the list instead of
  // moving the cursor down (XMB behaviour). Measure real heights so rows with
  // and without logos stay aligned.
  useLayoutEffect(() => {
    const list = listRef.current;
    const active = list?.children[activeIndex];
    if (!active) return;
    const activeMid = active.offsetTop + active.offsetHeight / 2;
    setOffset(-activeMid);
  }, [activeIndex, items]);

  return (
    <div className="xmb-item-viewport">
      <ul
        ref={listRef}
        className="xmb-item-list flex flex-col gap-3"
        style={{ transform: `translateY(${offset}px)` }}
        role="menu"
        aria-label="Items"
      >
        {items.map((item, index) => {
          const isActive = index === activeIndex;
          return (
            <li key={item.slug} role="none">
              <button
                type="button"
                role="menuitem"
                aria-current={isActive ? 'true' : undefined}
                onClick={() => onOpen?.(index)}
                className={`flex items-center gap-3 text-left transition-opacity ${
                  isActive ? 'opacity-100' : 'opacity-55 hover:opacity-80'
                }`}
              >
                {item.image ? (
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-md border border-[var(--border)] bg-white">
                    <img src={item.image} alt="" className="h-full w-full object-contain p-1" />
                  </span>
                ) : null}
                <span className="flex items-baseline gap-3">
                  <span
                    className={`text-sm ${isActive ? 'font-semibold text-[var(--text)]' : 'text-[var(--muted)]'}`}
                  >
                    {item.title}
                  </span>
                  {item.subtitle ? (
                    <span className="text-xs text-[var(--muted)]">{item.subtitle}</span>
                  ) : null}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ItemColumn;
