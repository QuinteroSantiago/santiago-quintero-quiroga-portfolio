import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import NotFound from './404';

describe('NotFound', () => {
  it('renders the not-found message and a link home', () => {
    render(<NotFound />);
    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Back home' })).toHaveAttribute('href', '/');
  });
});
