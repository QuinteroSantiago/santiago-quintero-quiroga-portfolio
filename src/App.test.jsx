import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App routing', () => {
  it('renders the homepage sections at /', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Santiago Quintero');
    expect(screen.getByRole('heading', { name: 'Work' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Education' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Portfolio' })).toBeInTheDocument();
    expect(screen.getByText('Get in touch')).toBeInTheDocument();
    expect(document.getElementById('work')).toBeInTheDocument();
    expect(document.getElementById('projects')).toBeInTheDocument();
    expect(document.getElementById('contact')).toBeInTheDocument();
  });

  it('renders 404 for an unknown path', () => {
    render(
      <MemoryRouter initialEntries={['/does-not-exist']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
  });
});
