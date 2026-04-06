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
    <div className="mt-5">
      <p className="eyebrow mb-2">{label}</p>
      <ul className="space-y-2 text-sm leading-6 text-[var(--muted)]">
        {items.map((item, index) => (
          <li key={index} className="flex gap-3">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--muted)]" />
            <span>{parseDetail(item)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TimelineItem({ year, imgUrl, title, duration, responsibilities, achievements, details, place }) {
  return (
    <article className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
      <div className="flex items-start gap-4">
        <img src={imgUrl} alt={title} className="h-12 w-12 rounded border border-[var(--border)] bg-[var(--surface-strong)] object-cover p-0.5" />
        <div>
          <div className="eyebrow mb-1">{year} · {duration}</div>
          <h3 className="text-lg font-semibold text-[var(--text)]">{title}</h3>
          {place ? <p className="mt-0.5 text-sm text-[var(--muted)]">{place}</p> : null}
        </div>
      </div>

      <DetailList label="Responsibilities" items={responsibilities} />
      <DetailList label="Achievements" items={achievements} />
      <DetailList label="Details" items={details} />
    </article>
  );
}

export default TimelineItem;
