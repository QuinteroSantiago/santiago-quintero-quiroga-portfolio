function ProjectDetail({ item }) {
  const { title, stack = [], link, date, details } = item.data;
  return (
    <article className="max-w-2xl">
      <p className="eyebrow mb-2">{date}</p>
      <h2 className="text-2xl font-normal text-[var(--text)]">{title}</h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {stack.map((tech) => (
          <span key={tech} className="soft-chip rounded px-2 py-0.5 text-xs">{tech}</span>
        ))}
      </div>
      {details ? <p className="mt-5 text-sm leading-7 text-[var(--muted)]">{details}</p> : null}
      {link ? (
        <a href={link} target="_blank" rel="noreferrer" className="text-link mt-5 inline-block text-sm">
          Visit project →
        </a>
      ) : null}
    </article>
  );
}

export default ProjectDetail;
