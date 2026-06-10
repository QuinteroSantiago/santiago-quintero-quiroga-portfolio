export const initialNavState = { categoryIndex: 0, itemIndex: 0, isOpen: false };

const clamp = (value, max) => Math.max(0, Math.min(value, max));
const wrap = (value, length) => ((value % length) + length) % length;

export function navReducer(sizes, state, action) {
  const itemCount = sizes[state.categoryIndex] ?? 1;

  switch (action.type) {
    case 'LEFT':
    case 'RIGHT': {
      if (state.isOpen) return state;
      const delta = action.type === 'RIGHT' ? 1 : -1;
      return {
        categoryIndex: wrap(state.categoryIndex + delta, sizes.length),
        itemIndex: 0,
        isOpen: false,
      };
    }
    case 'UP':
    case 'DOWN': {
      if (state.isOpen) return state;
      const delta = action.type === 'DOWN' ? 1 : -1;
      return { ...state, itemIndex: clamp(state.itemIndex + delta, itemCount - 1) };
    }
    case 'OPEN':
      return { ...state, isOpen: true };
    case 'CLOSE':
      return { ...state, isOpen: false };
    case 'SET': {
      const categoryIndex = clamp(action.categoryIndex ?? 0, sizes.length - 1);
      const maxItem = (sizes[categoryIndex] ?? 1) - 1;
      return {
        categoryIndex,
        itemIndex: clamp(action.itemIndex ?? 0, maxItem),
        isOpen: Boolean(action.isOpen),
      };
    }
    default:
      return state;
  }
}
