import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Workout from './Workout';

// Workout split: Monday through Saturday (Wednesday is the VO2 conditioning
// day). Sunday is the only rest day.
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
    expect(screen.getByText('Soccer (High-Intensity)')).toBeInTheDocument();
  });

  it('defaults to the weekly view on a rest day (Sunday)', () => {
    renderOn('2026-06-14T10:00:00'); // Sunday
    expect(screen.getByRole('button', { name: 'Week' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'Day' })).toHaveAttribute('aria-pressed', 'false');
    // Weekly view renders every session, not just one.
    expect(screen.getByText('Soccer (High-Intensity)')).toBeInTheDocument();
    expect(screen.getByText('Lower (Deadlift Focus)')).toBeInTheDocument();
  });
});
