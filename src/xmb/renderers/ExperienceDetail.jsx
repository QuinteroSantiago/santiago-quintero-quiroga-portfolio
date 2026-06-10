// Render inline **bold** markers (used throughout the work/education data) as <strong>.
function renderRichText(text) {
  return text.split(/\*\*(.*?)\*\*/g).map((part, index) =>
    index % 2 === 1 ? (
      <strong key={index} className="font-medium text-[var(--text)]">{part}</strong>
    ) : (
      part
    ),
  );
}

function ExperienceDetail({ item }) {
  const { place, title, year, responsibilities = [], achievements = [], details = [] } = item.data;
  return (
    <article className="max-w-2xl">
      {item.image ? (
        <span className="mb-5 flex h-16 w-16 items-center justify-center overflow-hidden rounded-lg border border-[var(--border)] bg-white">
          <img src={item.image} alt={`${place} logo`} className="h-full w-full object-contain p-2" />
        </span>
      ) : null}
      <p className="eyebrow mb-2">{year}</p>
      <h2 className="text-2xl font-normal text-[var(--text)]">{place}</h2>
      <p className="mt-1 text-sm text-[var(--muted)]">{title}</p>

      {responsibilities.length > 0 && (
        <ul className="mt-6 flex flex-col gap-2">
          {responsibilities.map((line, index) => (
            <li key={index} className="text-sm leading-7 text-[var(--muted)]">{renderRichText(line)}</li>
          ))}
        </ul>
      )}
      {achievements.length > 0 && (
        <>
          <p className="eyebrow mt-6 mb-2">Achievements</p>
          <ul className="flex flex-col gap-2">
            {achievements.map((line, index) => (
              <li key={index} className="text-sm leading-7 text-[var(--muted)]">{renderRichText(line)}</li>
            ))}
          </ul>
        </>
      )}
      {details.length > 0 && (
        <ul className="mt-6 flex flex-col gap-2">
          {details.map((line, index) => (
            <li key={index} className="text-sm leading-7 text-[var(--muted)]">{renderRichText(line)}</li>
          ))}
        </ul>
      )}
    </article>
  );
}

export default ExperienceDetail;
