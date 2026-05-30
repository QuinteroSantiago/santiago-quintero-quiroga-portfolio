function parseDetail(detail) {
  const parts = detail.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, index) => {
    if (index % 2 === 1) {
      return <strong key={index} className="text-[var(--text)]">{part}</strong>;
    }
    return part;
  });
}

function DetailList({ label, items }) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="mt-4">
      <p className="eyebrow mb-2">{label}</p>
      <ul className="space-y-1.5 text-sm leading-6 text-[var(--muted)]">
        {items.map((item, index) => (
          <li key={index} className="flex gap-3">
            <span className="mt-2.5 h-px w-3 shrink-0 bg-[var(--border)]" />
            <span>{parseDetail(item)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function hasDetails(...groups) {
  return groups.some((group) => group && group.length > 0);
}

function TimelineItem({ year, title, duration, responsibilities, achievements, details, place }) {
  const hasRoleDetails = hasDetails(responsibilities, achievements, details);

  return (
    <article className="py-5">
      <div className="eyebrow mb-1">{year} / {duration}</div>
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
        <h3 className="text-base font-normal text-[var(--text)]">{title}</h3>
        {place ? <p className="text-sm text-[var(--muted)]">{place}</p> : null}
      </div>
      {hasRoleDetails ? (
        <details className="group mt-3">
          <summary className="cursor-pointer list-none text-sm text-[var(--muted)]">
            <span className="text-link">Details</span>
          </summary>
          <div className="mt-4 border-l border-[var(--border)] pl-4">
            <DetailList label="Responsibilities" items={responsibilities} />
            <DetailList label="Achievements" items={achievements} />
            <DetailList label="Details" items={details} />
          </div>
        </details>
      ) : null}
    </article>
  );
}

export default TimelineItem;
