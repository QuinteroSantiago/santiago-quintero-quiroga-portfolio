import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CategoryBar from './CategoryBar';

const categories = [
  { slug: 'profile', label: 'Profile', icon: '◉' },
  { slug: 'experience', label: 'Experience', icon: '⌘' },
];

describe('CategoryBar', () => {
  it('renders all category labels', () => {
    render(<CategoryBar categories={categories} activeIndex={0} />);
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Experience')).toBeInTheDocument();
  });

  it('marks the active category with aria-current', () => {
    render(<CategoryBar categories={categories} activeIndex={1} />);
    expect(screen.getByText('Experience').closest('[role="menuitem"]'))
      .toHaveAttribute('aria-current', 'true');
  });

  it('calls onSelect with the index when a category is clicked', async () => {
    const onSelect = vi.fn();
    render(<CategoryBar categories={categories} activeIndex={0} onSelect={onSelect} />);
    await userEvent.click(screen.getByRole('menuitem', { name: 'Experience' }));
    expect(onSelect).toHaveBeenCalledWith(1);
  });
});
