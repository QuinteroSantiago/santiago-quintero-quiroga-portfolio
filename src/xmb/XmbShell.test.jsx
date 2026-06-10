import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import XmbShell from './XmbShell';

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/" element={<XmbShell />} />
        <Route path="/:categorySlug" element={<XmbShell />} />
        <Route path="/:categorySlug/:itemSlug" element={<XmbShell />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('XmbShell', () => {
  beforeEach(() => {
    globalThis.AudioContext = vi.fn(() => ({
      state: 'running', currentTime: 0, resume: vi.fn(), destination: {},
      createOscillator: () => ({ type: 'sine', frequency: { setValueAtTime: vi.fn() }, connect: () => ({ connect: () => {} }), start: vi.fn(), stop: vi.fn() }),
      createGain: () => ({ gain: { setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() }, connect: () => ({ connect: () => {} }) }),
    }));
  });

  it('renders all six category labels at root', () => {
    renderAt('/');
    ['Profile', 'Experience', 'Projects', 'Reading', 'Fitness', 'Contact'].forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it('ArrowRight moves to the next category', async () => {
    renderAt('/profile');
    await userEvent.keyboard('{ArrowRight}');
    expect(await screen.findByText('Corellium')).toBeInTheDocument();
  });

  it('deep link opens the blade with the item content', () => {
    renderAt('/experience/corellium');
    expect(screen.getByTestId('xmb-blade')).toHaveClass('is-open');
  });

  it('Enter opens the blade, Escape closes it', async () => {
    renderAt('/experience');
    await userEvent.keyboard('{Enter}');
    expect(screen.getByTestId('xmb-blade')).toHaveClass('is-open');
    await userEvent.keyboard('{Escape}');
    expect(screen.getByTestId('xmb-blade')).not.toHaveClass('is-open');
  });

  it('renders a sound toggle button', () => {
    renderAt('/');
    expect(screen.getByRole('button', { name: /sound|mute/i })).toBeInTheDocument();
  });

  it('unknown category falls back to Profile without crashing', () => {
    renderAt('/totally-unknown');
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });
});
