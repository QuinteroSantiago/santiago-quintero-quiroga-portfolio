function Table({ columns, data, caption }) {
    return (
        <div className="overflow-x-auto rounded border border-[var(--border)]">
            <table className="w-full min-w-[38rem] border-separate border-spacing-0 text-sm">
                {caption ? <caption className="sr-only">{caption}</caption> : null}
                <thead>
                    <tr className="border-b border-[var(--border)]">
                        {columns.map((column) => (
                            <th
                                scope="col"
                                key={column.key}
                                className="px-4 py-2.5 text-left text-xs font-medium uppercase tracking-widest text-[var(--muted)]"
                            >
                                {column.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr
                            key={row.id ?? row.title ?? row.name ?? `${rowIndex}-${columns[0]?.key ?? 'row'}`}
                            className="border-t border-[var(--border)] transition-colors hover:bg-[var(--surface-strong)]"
                        >
                            {columns.map((column) => (
                                <td key={column.key} className="px-4 py-3 align-top text-[var(--muted)]">
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
