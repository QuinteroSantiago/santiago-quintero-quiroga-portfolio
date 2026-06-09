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

    let action = null;
    if (Math.abs(dx) > Math.abs(dy)) {
      if (Math.abs(dx) < SWIPE_THRESHOLD) return;
      action = dx < 0 ? 'RIGHT' : 'LEFT';
      if (state.isOpen) action = dx > 0 ? 'CLOSE' : null;
    } else {
      if (Math.abs(dy) < SWIPE_THRESHOLD) return;
      action = dy < 0 ? 'DOWN' : 'UP';
      if (state.isOpen) return;
    }
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

      <div className="absolute right-6 top-6 z-30 flex gap-3">
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

      <main className="relative z-10 flex min-h-screen flex-col justify-center gap-12 px-6 sm:px-12">
        <CategoryBar categories={categories} activeIndex={state.categoryIndex} />
        <ItemColumn items={category.items} activeIndex={state.itemIndex} />
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
