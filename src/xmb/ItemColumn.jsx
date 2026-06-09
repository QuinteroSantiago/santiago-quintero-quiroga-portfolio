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
