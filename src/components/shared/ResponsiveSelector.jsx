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
                    className="rounded bg-gray-200 px-4 py-2 text-black dark:bg-gray-700 dark:text-white"
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
            className={`flex flex-wrap justify-center gap-2 ${className}`}
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
                        className={`rounded px-4 py-2 transition-colors ${
                            isSelected
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-black dark:bg-gray-700 dark:text-white'
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
