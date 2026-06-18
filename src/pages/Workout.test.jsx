import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Workout from './Workout';

// Workout split: Monday/Wednesday/Friday lifting, with Monday soccer and
// Tuesday VO2 conditioning kept in the weekly schedule.
function renderOn(dateString) {
  vi.setSystemTime(new Date(dateString));
  return render(<Workout />);
}

describe('Workout default schedule', () => {
  beforeEach(() => vi.useFakeTimers({ toFake: ['Date'] }));
  afterEach(() => vi.useRealTimers());

  it('defaults to the day view on today when today is a workout day (Monday)', () => {
    renderOn('2026-06-08T10:00:00'); // Monday
    expect(screen.getByRole('button', { name: 'Day' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'Week' })).toHaveAttribute('aria-pressed', 'false');
    // Monday's session title is shown (single-day view).
    expect(screen.getByText('Upper + Soccer')).toBeInTheDocument();
    expect(screen.getByText('Soccer (high-intensity)')).toBeInTheDocument();
  });

  it('treats Tuesday VO2 conditioning as a scheduled day', () => {
    renderOn('2026-06-09T10:00:00'); // Tuesday
    expect(screen.getByRole('button', { name: 'Day' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'Week' })).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByText('VO2 Conditioning')).toBeInTheDocument();
    expect(screen.getByText('Norwegian 4x4 Intervals')).toBeInTheDocument();
  });

  it('defaults to the weekly view on a rest day (Sunday)', () => {
    renderOn('2026-06-14T10:00:00'); // Sunday
    expect(screen.getByRole('button', { name: 'Week' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'Day' })).toHaveAttribute('aria-pressed', 'false');
    // Weekly view renders every session, not just one.
    expect(screen.getByText('Upper + Soccer')).toBeInTheDocument();
    expect(screen.getByText('VO2 Conditioning')).toBeInTheDocument();
    expect(screen.getByText('Lower')).toBeInTheDocument();
    expect(screen.getByText('Full Body')).toBeInTheDocument();
  });

  it('keeps every weekly volume card in range', () => {
    renderOn('2026-06-14T10:00:00'); // Sunday
    expect(screen.getAllByText('In range')).toHaveLength(10);
  });
});
