import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import XmbBackground, { formatClock } from './XmbBackground';

describe('formatClock', () => {
  it('formats time and date', () => {
    const date = new Date('2026-06-09T14:32:00');
    const { time, day } = formatClock(date);
    expect(time).toMatch(/\d{1,2}:\d{2}/);
    expect(day).toMatch(/JUN/);
  });
});

describe('XmbBackground', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('renders a clock region', () => {
    render(<XmbBackground />);
    expect(screen.getByTestId('xmb-clock')).toBeInTheDocument();
  });

  it('wave element is aria-hidden', () => {
    render(<XmbBackground />);
    expect(document.querySelector('.xmb-bg')).toHaveAttribute('aria-hidden', 'true');
  });
});
