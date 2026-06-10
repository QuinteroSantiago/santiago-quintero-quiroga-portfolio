import { useCallback, useEffect, useRef, useState } from 'react';

export const MUTE_STORAGE_KEY = 'xmb-sound-muted';

export function readInitialMuted() {
  if (typeof window === 'undefined') return false;
  return window.localStorage.getItem(MUTE_STORAGE_KEY) === 'true';
}

// Each tone: [frequency Hz, duration s, gain]
const TONES = {
  cursor: [660, 0.06, 0.05],
  enter: [880, 0.12, 0.06],
  back: [440, 0.1, 0.05],
};

function useXmbSound() {
  const [muted, setMuted] = useState(readInitialMuted);
  const mutedRef = useRef(muted);
  const contextRef = useRef(null);

  // Keep the ref in sync so the memoized play() closure reads the latest mute state.
  useEffect(() => {
    mutedRef.current = muted;
  }, [muted]);

  const getContext = useCallback(() => {
    if (!contextRef.current) {
      const Ctor = window.AudioContext || window.webkitAudioContext;
      if (!Ctor) return null;
      contextRef.current = new Ctor();
    }
    if (contextRef.current.state === 'suspended') {
      contextRef.current.resume();
    }
    return contextRef.current;
  }, []);

  const play = useCallback((name) => {
    if (mutedRef.current) return;
    const ctx = getContext();
    if (!ctx) return;
    const [freq, duration, gainValue] = TONES[name];
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);
    gain.gain.setValueAtTime(gainValue, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + duration);
  }, [getContext]);

  const toggleMuted = useCallback(() => {
    setMuted((current) => {
      const next = !current;
      window.localStorage.setItem(MUTE_STORAGE_KEY, String(next));
      return next;
    });
  }, []);

  return {
    muted,
    toggleMuted,
    playCursor: useCallback(() => play('cursor'), [play]),
    playEnter: useCallback(() => play('enter'), [play]),
    playBack: useCallback(() => play('back'), [play]),
  };
}

export { useXmbSound };
export default useXmbSound;
