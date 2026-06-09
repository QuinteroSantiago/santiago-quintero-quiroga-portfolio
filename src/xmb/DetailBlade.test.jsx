import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DetailBlade from './DetailBlade';

const wrap = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>);

const experienceItem = {
  type: 'experience',
  title: 'Corellium',
  data: { place: 'Corellium', title: 'SWE', year: '2023', responsibilities: ['Built things'], achievements: [] },
};

describe('DetailBlade', () => {
  it('renders the matching renderer when open', () => {
    wrap(<DetailBlade item={experienceItem} isOpen onClose={() => {}} />);
    expect(screen.getByText('Built things')).toBeInTheDocument();
  });

  it('has is-open class only when open', () => {
    const { rerender } = wrap(<DetailBlade item={experienceItem} isOpen={false} onClose={() => {}} />);
    expect(screen.getByTestId('xmb-blade')).not.toHaveClass('is-open');
    rerender(<MemoryRouter><DetailBlade item={experienceItem} isOpen onClose={() => {}} /></MemoryRouter>);
    expect(screen.getByTestId('xmb-blade')).toHaveClass('is-open');
  });

  it('calls onClose when the close button is clicked', async () => {
    const onClose = vi.fn();
    wrap(<DetailBlade item={experienceItem} isOpen onClose={onClose} />);
    await userEvent.click(screen.getByRole('button', { name: /back/i }));
    expect(onClose).toHaveBeenCalled();
  });
});
