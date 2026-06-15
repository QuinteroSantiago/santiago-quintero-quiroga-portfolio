import { useLayoutEffect, useRef, useState } from 'react';

// How far a finger must move before we commit to a drag axis.
const AXIS_LOCK = 8;
// A little give past the first/last row so the ends don't feel like a wall.
const RUBBER_BAND = 28;

function ItemColumn({ items, activeIndex, onChangeIndex, onTick, onOpen, disabled = false }) {
  const listRef = useRef(null);
  const gesture = useRef(null);
  const [offset, setOffset] = useState(0);
  // While dragging: { translate, index }. Null when idle.
  const [drag, setDrag] = useState(null);

  // Vertical midpoint of each row, in list coordinates. Used both to pin the
  // active row to the centre line and to find the nearest row while dragging,
  // so rows with and without logos stay aligned.
  const measureMids = () => {
    const list = listRef.current;
    if (!list) return [];
    return Array.from(list.children).map((el) => el.offsetTop + el.offsetHeight / 2);
  };

  useLayoutEffect(() => {
    const mids = measureMids();
    if (mids[activeIndex] == null) return;
    // Measure-then-position: the transform depends on real rendered row
    // heights, which are only known after layout.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOffset(-mids[activeIndex]);
  }, [activeIndex, items]);

  const nearestIndex = (mids, translate) => {
    const target = -translate;
    let best = 0;
    let bestDist = Infinity;
    for (let i = 0; i < mids.length; i += 1) {
      const dist = Math.abs(mids[i] - target);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    }
    return best;
  };

  const onTouchStart = (event) => {
    if (disabled) return;
    const touch = event.touches[0];
    gesture.current = {
      x: touch.clientX,
      y: touch.clientY,
      startOffset: offset,
      mids: measureMids(),
      axis: null,
      index: activeIndex,
    };
  };

  const onTouchMove = (event) => {
    const g = gesture.current;
    if (!g) return;
    const touch = event.touches[0];
    const dx = touch.clientX - g.x;
    const dy = touch.clientY - g.y;

    if (!g.axis) {
      if (Math.abs(dx) < AXIS_LOCK && Math.abs(dy) < AXIS_LOCK) return;
      // Horizontal gestures belong to the category bar (handled by the shell).
      g.axis = Math.abs(dy) > Math.abs(dx) ? 'y' : 'x';
    }
    if (g.axis !== 'y') return;

    const { mids } = g;
    const first = -mids[0];
    const last = -mids[mids.length - 1];
    const translate = Math.max(last - RUBBER_BAND, Math.min(first + RUBBER_BAND, g.startOffset + dy));

    const index = nearestIndex(mids, translate);
    if (index !== g.index) {
      g.index = index;
      onTick?.();
    }
    setDrag({ translate, index });
  };

  const endGesture = () => {
    const g = gesture.current;
    gesture.current = null;
    if (g && g.axis === 'y') {
      const finalIndex = g.index;
      // Settle straight onto the final row so the snap animates from where the
      // finger let go, with no flash back to the old position.
      setOffset(-g.mids[finalIndex]);
      if (finalIndex !== activeIndex) onChangeIndex?.(finalIndex);
    }
    setDrag(null);
  };

  const translateY = drag ? drag.translate : offset;
  const shownIndex = drag ? drag.index : activeIndex;

  return (
    <div
      className="xmb-item-viewport"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={endGesture}
      onTouchCancel={endGesture}
    >
      <ul
        ref={listRef}
        className={`xmb-item-list flex flex-col gap-3${drag ? ' is-dragging' : ''}`}
        style={{ transform: `translateY(${translateY}px)` }}
        role="menu"
        aria-label="Items"
      >
        {items.map((item, index) => {
          const isActive = index === shownIndex;
          return (
            <li key={item.slug} role="none">
              <button
                type="button"
                role="menuitem"
                aria-current={isActive ? 'true' : undefined}
                onClick={() => onOpen?.(index)}
                className={`flex items-center gap-3 text-left transition-opacity ${
                  isActive ? 'opacity-100' : 'opacity-55 hover:opacity-80'
                }`}
              >
                {item.image ? (
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-md border border-[var(--border)] bg-white">
                    <img src={item.image} alt="" className="h-full w-full object-contain p-1" />
                  </span>
                ) : null}
                <span className="flex items-baseline gap-3">
                  <span
                    className={`text-sm ${isActive ? 'font-semibold text-[var(--text)]' : 'text-[var(--muted)]'}`}
                  >
                    {item.title}
                  </span>
                  {item.subtitle ? (
                    <span className="text-xs text-[var(--muted)]">{item.subtitle}</span>
                  ) : null}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ItemColumn;
