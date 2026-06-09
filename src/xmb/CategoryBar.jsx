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
