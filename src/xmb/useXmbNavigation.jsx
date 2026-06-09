import { useEffect, useReducer } from 'react';
import { useLocation, useNavigate, useNavigationType, useParams } from 'react-router-dom';
import { CATEGORIES, getCategoryIndexBySlug, findItemIndexBySlug } from './xmbConfig';
import { navReducer } from './navReducer';

const SIZES = CATEGORIES.map((category) => category.items.length);

export function stateFromParams(params) {
  const categoryIndex = Math.max(0, getCategoryIndexBySlug(params.categorySlug ?? 'profile'));
  const itemIndex = params.itemSlug
    ? Math.max(0, findItemIndexBySlug(categoryIndex, params.itemSlug))
    : 0;
  return { categoryIndex, itemIndex, isOpen: Boolean(params.itemSlug) };
}

export function urlForState(state) {
  const category = CATEGORIES[state.categoryIndex];
  if (!state.isOpen) {
    return `/${category.slug}`;
  }
  const item = category.items[state.itemIndex];
  return `/${category.slug}/${item.slug}`;
}

const boundReducer = (state, action) => navReducer(SIZES, state, action);

function useXmbNavigation() {
  const params = useParams();
  const navigate = useNavigate();
  const navigationType = useNavigationType();
  const location = useLocation();

  const [state, dispatch] = useReducer(boundReducer, params, stateFromParams);

  // Live navigation (PUSH): reflect local state into the URL.
  useEffect(() => {
    const url = urlForState(state);
    if (url !== location.pathname) {
      navigate(url);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  // Browser back/forward (POP): pull state from the URL.
  useEffect(() => {
    if (navigationType === 'POP') {
      dispatch({ type: 'SET', ...stateFromParams(params) });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, navigationType]);

  const category = CATEGORIES[state.categoryIndex];
  const item = category.items[state.itemIndex];

  return { state, dispatch, categories: CATEGORIES, category, item };
}

export default useXmbNavigation;
