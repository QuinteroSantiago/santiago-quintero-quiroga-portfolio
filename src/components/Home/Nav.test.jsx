import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Nav from './Nav';

describe('Nav', () => {
  it('renders the logo link and section anchors', () => {
    render(<Nav />);
    expect(screen.getByRole('link', { name: 'Santiago Quintero' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Work' })).toHaveAttribute('href', '#work');
    expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '#projects');
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '#contact');
  });

  it('toggles the theme label when clicked', async () => {
    const user = userEvent.setup();
    render(<Nav />);
    const button = screen.getByRole('button');
    const initialLabel = button.textContent;
    await user.click(button);
    expect(button.textContent).not.toBe(initialLabel);
  });
});
