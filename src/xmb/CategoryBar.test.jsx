import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
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
});
