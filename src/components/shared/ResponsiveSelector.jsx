import useMediaQuery from '../../hooks/useMediaQuery';

function ResponsiveSelector({
    label,
    options,
    value,
    onChange,
    mobileLabel,
    className = '',
}) {
    const isDesktop = useMediaQuery('(min-width: 1000px)');
    const accessibleLabel = mobileLabel || label;

    if (!isDesktop) {
        return (
            <label className={`inline-flex items-center gap-2 ${className}`}>
                {accessibleLabel ? <span className="sr-only">{accessibleLabel}</span> : null}
                <select
                    className="rounded border border-[var(--border)] bg-[var(--surface-strong)] px-3 py-1.5 text-sm text-[var(--text)]"
                    aria-label={accessibleLabel}
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </label>
        );
    }

    return (
        <div
            role="radiogroup"
            aria-label={label || accessibleLabel}
            className={`flex flex-wrap gap-1 ${className}`}
        >
            {options.map((option) => {
                const isSelected = option.value === value;

                return (
                    <button
                        key={option.value}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        aria-pressed={isSelected}
                        className={`rounded px-3 py-1.5 text-sm transition-colors ${
                            isSelected
                                ? 'bg-[var(--text)] text-[var(--bg)]'
                                : 'border border-[var(--border)] text-[var(--muted)] hover:text-[var(--text)]'
                        }`}
                        onClick={() => onChange(option.value)}
                    >
                        {option.label}
                    </button>
                );
            })}
        </div>
    );
}

export default ResponsiveSelector;
