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
    <div className="mt-6">
      <p className="eyebrow mb-3">{label}</p>
      <ul className="space-y-3 text-[15px] leading-7 text-[var(--muted)]">
        {items.map((item, index) => (
          <li key={index} className="flex gap-3">
            <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
            <span>{parseDetail(item)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TimelineItem({ year, imgUrl, title, duration, responsibilities, achievements, details, place }) {
  return (
    <article className="surface-card rounded-[1.75rem] p-6 sm:p-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex items-start gap-4">
          <img src={imgUrl} alt={title} className="h-16 w-16 rounded-2xl border border-[var(--border)] bg-white object-cover p-1" />
          <div>
            <div className="eyebrow mb-2">{year} • {duration}</div>
            <h3 className="font-display text-3xl leading-tight text-[var(--text)]">{title}</h3>
            {place ? <p className="mt-1 text-sm text-[var(--muted)]">{place}</p> : null}
          </div>
        </div>
      </div>

      <DetailList label="Responsibilities" items={responsibilities} />
      <DetailList label="Achievements" items={achievements} />
      <DetailList label="Details" items={details} />
    </article>
  );
}

export default TimelineItem;
