function Table({ columns, data, caption }) {
    return (
        <div className="overflow-x-auto rounded-[1.25rem] border border-[var(--border)] bg-[var(--surface-strong)]">
            <table className="mx-auto w-full min-w-[42rem] border-separate border-spacing-0">
                {caption ? <caption className="sr-only">{caption}</caption> : null}
                <thead className="bg-[var(--accent-soft)] text-[var(--text)]">
                    <tr>
                        {columns.map((column) => (
                            <th scope="col" key={column.key} className="px-4 pb-4 pt-4 text-left text-sm font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                                {column.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr
                            key={row.id ?? row.title ?? row.name ?? `${rowIndex}-${columns[0]?.key ?? 'row'}`}
                            className={`transition-colors hover:bg-[var(--accent-soft)] ${
                                rowIndex % 2 === 0 ? 'bg-transparent' : 'bg-[rgba(127,101,81,0.04)]'
                            }`}
                        >
                            {columns.map((column) => (
                                <td key={column.key} className="border-t border-[var(--border)] px-4 pb-4 pt-4 align-top font-light text-[var(--muted)]">
                                    {column.render ? column.render(row[column.key], row) : row[column.key] ?? '—'}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;
