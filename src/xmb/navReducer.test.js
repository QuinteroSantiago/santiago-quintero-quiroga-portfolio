import { describe, it, expect } from 'vitest';
import { navReducer, initialNavState } from './navReducer';

const sizes = [1, 7, 10, 2, 2, 1]; // items per category (profile..contact)

const reduce = (state, action) => navReducer(sizes, state, action);

describe('navReducer (browsing)', () => {
  it('RIGHT advances category and resets item to 0', () => {
    const s = reduce({ categoryIndex: 1, itemIndex: 3, isOpen: false }, { type: 'RIGHT' });
    expect(s).toEqual({ categoryIndex: 2, itemIndex: 0, isOpen: false });
  });

  it('RIGHT wraps from last to first', () => {
    const s = reduce({ categoryIndex: 5, itemIndex: 0, isOpen: false }, { type: 'RIGHT' });
    expect(s.categoryIndex).toBe(0);
  });

  it('LEFT wraps from first to last', () => {
    const s = reduce({ categoryIndex: 0, itemIndex: 0, isOpen: false }, { type: 'LEFT' });
    expect(s.categoryIndex).toBe(5);
  });

  it('DOWN advances item, clamps at last', () => {
    const a = reduce({ categoryIndex: 1, itemIndex: 0, isOpen: false }, { type: 'DOWN' });
    expect(a.itemIndex).toBe(1);
    const b = reduce({ categoryIndex: 1, itemIndex: 6, isOpen: false }, { type: 'DOWN' });
    expect(b.itemIndex).toBe(6); // clamp, 7 items
  });

  it('UP retreats item, clamps at 0', () => {
    const a = reduce({ categoryIndex: 1, itemIndex: 0, isOpen: false }, { type: 'UP' });
    expect(a.itemIndex).toBe(0);
  });

  it('OPEN sets isOpen true', () => {
    expect(reduce({ categoryIndex: 0, itemIndex: 0, isOpen: false }, { type: 'OPEN' }).isOpen).toBe(true);
  });
});

describe('navReducer (detail open)', () => {
  const open = { categoryIndex: 1, itemIndex: 2, isOpen: true };

  it('ignores LEFT/RIGHT/UP/DOWN while open', () => {
    expect(reduce(open, { type: 'RIGHT' })).toEqual(open);
    expect(reduce(open, { type: 'DOWN' })).toEqual(open);
  });

  it('CLOSE clears isOpen', () => {
    expect(reduce(open, { type: 'CLOSE' }).isOpen).toBe(false);
  });
});

describe('navReducer SET (from URL)', () => {
  it('sets indices and open flag, clamping out-of-range', () => {
    const s = reduce(initialNavState, { type: 'SET', categoryIndex: 2, itemIndex: 99, isOpen: true });
    expect(s).toEqual({ categoryIndex: 2, itemIndex: 9, isOpen: true }); // 10 items clamp to 9
  });

  it('negative indices fall back to 0', () => {
    const s = reduce(initialNavState, { type: 'SET', categoryIndex: -1, itemIndex: -1, isOpen: false });
    expect(s).toEqual({ categoryIndex: 0, itemIndex: 0, isOpen: false });
  });
});
