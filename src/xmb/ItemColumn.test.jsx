import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ItemColumn from './ItemColumn';

const items = [
  { slug: 'corellium', title: 'Corellium', subtitle: 'SWE · 2023–Now' },
  { slug: 'svb', title: 'Silicon Valley Bank', subtitle: 'SWE · 2022–23' },
];

describe('ItemColumn', () => {
  it('renders item titles and subtitles', () => {
    render(<ItemColumn items={items} activeIndex={0} />);
    expect(screen.getByText('Corellium')).toBeInTheDocument();
    expect(screen.getByText('SWE · 2022–23')).toBeInTheDocument();
  });

  it('marks the active item with aria-current', () => {
    render(<ItemColumn items={items} activeIndex={1} />);
    expect(screen.getByText('Silicon Valley Bank').closest('[role="menuitem"]'))
      .toHaveAttribute('aria-current', 'true');
  });

  it('calls onOpen with the index when an item is clicked', async () => {
    const onOpen = vi.fn();
    render(<ItemColumn items={items} activeIndex={0} onOpen={onOpen} />);
    await userEvent.click(screen.getByRole('menuitem', { name: /Silicon Valley Bank/ }));
    expect(onOpen).toHaveBeenCalledWith(1);
  });
});
