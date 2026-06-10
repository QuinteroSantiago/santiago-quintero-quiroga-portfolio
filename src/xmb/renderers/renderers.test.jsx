import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import ProfileDetail from './ProfileDetail';
import ExperienceDetail from './ExperienceDetail';
import ProjectDetail from './ProjectDetail';
import ContactDetail from './ContactDetail';
import ReadingDetail from './ReadingDetail';
import books from '../../data/books';

const wrap = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>);

describe('renderers', () => {
  it('ProfileDetail shows the name', () => {
    wrap(<ProfileDetail />);
    expect(screen.getByText(/Santiago Quintero/i)).toBeInTheDocument();
  });

  it('ExperienceDetail shows place and title', () => {
    const item = { data: { place: 'Corellium', title: 'SWE', year: '2023 - Present', responsibilities: ['Did things'], achievements: [] } };
    wrap(<ExperienceDetail item={item} />);
    expect(screen.getByText('Corellium')).toBeInTheDocument();
    expect(screen.getByText('Did things')).toBeInTheDocument();
  });

  it('ExperienceDetail renders **markdown bold** as <strong>, not literal asterisks', () => {
    const item = { data: { place: 'Corellium', title: 'SWE', year: '2023', responsibilities: ['**CI/CD Ownership**: ran pipelines'], achievements: [] } };
    const { container } = wrap(<ExperienceDetail item={item} />);
    expect(container.querySelector('strong')).toHaveTextContent('CI/CD Ownership');
    expect(container.textContent).not.toContain('**');
  });

  it('ProjectDetail shows project title and a link', () => {
    const item = { data: { title: 'Chargeback Heaven', stack: ['React'], link: 'https://example.com', date: '2024' } };
    wrap(<ProjectDetail item={item} />);
    expect(screen.getByText('Chargeback Heaven')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /visit/i })).toHaveAttribute('href', 'https://example.com');
  });

  it('ContactDetail shows LinkedIn and GitHub links', () => {
    wrap(<ContactDetail />);
    expect(screen.getByRole('link', { name: /linkedin/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /github/i })).toBeInTheDocument();
  });

  it('ReadingDetail shows the opened category and hides the in-page category switcher', () => {
    const archiveTitle = books.Archive[0].title;
    wrap(<ReadingDetail item={{ type: 'reading', data: 'Archive' }} />);
    // Heading reflects the category opened from the XMB menu.
    expect(screen.getByRole('heading', { name: 'Archive' })).toBeInTheDocument();
    // An actual Archive book is rendered (not the empty Current default).
    expect(screen.getByText(archiveTitle)).toBeInTheDocument();
    // The duplicate in-page category switcher is gone.
    expect(screen.queryByLabelText('Select a reading category')).not.toBeInTheDocument();
  });
});
