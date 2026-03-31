import useMediaQuery from '../../hooks/useMediaQuery';

function ResponsiveSelector({
    options,
    value,
    onChange,
    mobileLabel,
    className = '',
}) {
    const isDesktop = useMediaQuery('(min-width: 1000px)');

    if (!isDesktop) {
        return (
            <label className={`inline-flex items-center gap-2 ${className}`}>
                {mobileLabel ? <span className="sr-only">{mobileLabel}</span> : null}
                <select
                    className="rounded bg-gray-200 px-4 py-2 text-black dark:bg-gray-700 dark:text-white"
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
        <div className={`flex flex-wrap justify-center gap-2 ${className}`}>
            {options.map((option) => {
                const isSelected = option.value === value;

                return (
                    <button
                        key={option.value}
                        type="button"
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
