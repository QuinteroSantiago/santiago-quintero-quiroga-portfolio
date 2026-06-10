function ItemColumn({ items, activeIndex, onOpen }) {
  return (
    <ul className="flex flex-col gap-3" role="menu" aria-label="Items">
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
  );
}

export default ItemColumn;
