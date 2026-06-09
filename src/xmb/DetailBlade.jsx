import { useEffect, useRef } from 'react';
import ProfileDetail from './renderers/ProfileDetail';
import ExperienceDetail from './renderers/ExperienceDetail';
import ProjectDetail from './renderers/ProjectDetail';
import ReadingDetail from './renderers/ReadingDetail';
import FitnessDetail from './renderers/FitnessDetail';
import ContactDetail from './renderers/ContactDetail';

const RENDERERS = {
  profile: ProfileDetail,
  experience: ExperienceDetail,
  project: ProjectDetail,
  reading: ReadingDetail,
  'fitness-workout': FitnessDetail,
  'fitness-diet': FitnessDetail,
  contact: ContactDetail,
};

// Heavy content widens the blade toward full width.
const WIDE_TYPES = new Set(['reading', 'fitness-workout', 'fitness-diet']);

function DetailBlade({ item, isOpen, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    if (isOpen && ref.current) {
      ref.current.focus();
    }
  }, [isOpen, item]);

  const Renderer = item ? RENDERERS[item.type] : null;
  const wide = item && WIDE_TYPES.has(item.type);

  return (
    <section
      ref={ref}
      tabIndex={-1}
      data-testid="xmb-blade"
      role="dialog"
      aria-modal="false"
      aria-label={item ? item.title : 'Detail'}
      inert={!isOpen}
      className={`xmb-blade fixed right-0 top-0 z-20 h-full overflow-y-auto border-l border-[var(--border)] bg-[var(--surface)] p-6 sm:p-10 ${
        wide ? 'w-full lg:w-[70%]' : 'w-full sm:w-[60%] lg:w-[50%]'
      } ${isOpen ? 'is-open' : ''}`}
    >
      <button
        type="button"
        onClick={onClose}
        className="eyebrow mb-6 flex items-center gap-2 text-[var(--muted)] hover:text-[var(--text)]"
      >
        ◀ Back
      </button>
      {Renderer && isOpen ? <Renderer item={item} /> : null}
    </section>
  );
}

export default DetailBlade;
