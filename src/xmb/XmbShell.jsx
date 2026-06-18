import { useEffect, useRef } from 'react';
import useXmbNavigation from './useXmbNavigation';
import useXmbSound from './useXmbSound';
import useTheme from '../hooks/useTheme';
import XmbBackground from './XmbBackground';
import CategoryBar from './CategoryBar';
import ItemColumn from './ItemColumn';
import DetailBlade from './DetailBlade';

const KEY_ACTIONS = {
  ArrowLeft: 'LEFT',
  ArrowRight: 'RIGHT',
  ArrowUp: 'UP',
  ArrowDown: 'DOWN',
  Enter: 'OPEN',
  ' ': 'OPEN',
  Escape: 'CLOSE',
  Backspace: 'CLOSE',
};

const SWIPE_THRESHOLD = 40;

function XmbShell() {
  const { state, dispatch, categories, category, item } = useXmbNavigation();
  const { muted, toggleMuted, playCursor, playEnter, playBack } = useXmbSound();
  const { theme, toggleTheme } = useTheme();
  const touchStart = useRef(null);

  const soundForAction = (action) => {
    if (action === 'OPEN') playEnter();
    else if (action === 'CLOSE') playBack();
    else playCursor();
  };

  // Pointer/tap handlers (primary input on touch devices, also work on desktop).
  const selectCategory = (index) => {
    playCursor();
    dispatch({ type: 'SET', categoryIndex: index, itemIndex: 0, isOpen: false });
  };

  const openItem = (index) => {
    playEnter();
    dispatch({ type: 'SET', categoryIndex: state.categoryIndex, itemIndex: index, isOpen: true });
  };

  // Live drag scrolling commits a single navigation when the finger lifts.
  const changeItem = (index) => {
    dispatch({ type: 'SET', categoryIndex: state.categoryIndex, itemIndex: index, isOpen: false });
  };

  useEffect(() => {
    const onKeyDown = (event) => {
      let action = KEY_ACTIONS[event.key];
      if (!action) return;
      if (state.isOpen && action !== 'CLOSE') {
        if (action === 'LEFT') action = 'CLOSE';
        else return;
      }
      event.preventDefault();
      soundForAction(action);
      dispatch({ type: action });
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  const onTouchStart = (event) => {
    const touch = event.changedTouches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const onTouchEnd = (event) => {
    if (!touchStart.current) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - touchStart.current.x;
    const dy = touch.clientY - touchStart.current.y;
    touchStart.current = null;

    // Vertical drags are handled by the item column itself (finger-tracked
    // scrolling); the shell only owns horizontal swipes between categories.
    if (Math.abs(dx) <= Math.abs(dy)) return;
    if (Math.abs(dx) < SWIPE_THRESHOLD) return;
    let action = dx < 0 ? 'RIGHT' : 'LEFT';
    if (state.isOpen) action = dx > 0 ? 'CLOSE' : null;
    if (!action) return;
    soundForAction(action);
    dispatch({ type: action });
  };

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden font-inter text-[var(--text)]"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <XmbBackground />

      {/* The full-width detail blade covers these on mobile; hide them while
          open so they don't collide with the blade's Back button. */}
      <div
        className={`absolute left-6 top-6 z-30 gap-3 ${
          state.isOpen ? 'hidden sm:flex' : 'flex'
        }`}
      >
        <button
          type="button"
          onClick={toggleTheme}
          className="eyebrow text-[var(--muted)] hover:text-[var(--text)]"
        >
          {theme === 'dark' ? 'Light' : 'Dark'}
        </button>
        <button
          type="button"
          aria-label={muted ? 'Unmute sound' : 'Mute sound'}
          onClick={toggleMuted}
          className="eyebrow text-[var(--muted)] hover:text-[var(--text)]"
        >
          {muted ? 'Sound off' : 'Sound on'}
        </button>
      </div>

      <main className="relative z-10 flex min-h-screen flex-col justify-center gap-4 px-6 sm:gap-6 sm:px-12">
        <CategoryBar categories={categories} activeIndex={state.categoryIndex} onSelect={selectCategory} />
        <ItemColumn
          items={category.items}
          activeIndex={state.itemIndex}
          onChangeIndex={changeItem}
          onTick={playCursor}
          onOpen={openItem}
          disabled={state.isOpen}
        />
      </main>

      <DetailBlade
        item={item}
        isOpen={state.isOpen}
        onClose={() => {
          playBack();
          dispatch({ type: 'CLOSE' });
        }}
      />

      <p className="absolute bottom-4 right-6 z-10 text-xs text-[var(--muted)]">
        ▲ ▼ ◀ ▶ navigate · X open · O back
      </p>
    </div>
  );
}

export default XmbShell;
