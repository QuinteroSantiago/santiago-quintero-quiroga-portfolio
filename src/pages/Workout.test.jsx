import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Workout from './Workout';

// Workout split: Monday, Tuesday, Thursday, Friday. Wednesday/Saturday/Sunday are rest days.
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
    expect(screen.getByText('Upper (Pull Emphasis)')).toBeInTheDocument();
  });

  it('defaults to the weekly view on a rest day (Wednesday)', () => {
    renderOn('2026-06-10T10:00:00'); // Wednesday
    expect(screen.getByRole('button', { name: 'Week' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'Day' })).toHaveAttribute('aria-pressed', 'false');
    // Weekly view renders every session, not just one.
    expect(screen.getByText('Upper (Pull Emphasis)')).toBeInTheDocument();
    expect(screen.getByText('Upper (Push Emphasis)')).toBeInTheDocument();
  });
});
