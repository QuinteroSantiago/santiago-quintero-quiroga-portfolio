import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { readInitialMuted, MUTE_STORAGE_KEY, useXmbSound } from './useXmbSound';

describe('readInitialMuted', () => {
  beforeEach(() => window.localStorage.clear());

  it('defaults to false (sound on)', () => {
    expect(readInitialMuted()).toBe(false);
  });

  it('reads true when stored', () => {
    window.localStorage.setItem(MUTE_STORAGE_KEY, 'true');
    expect(readInitialMuted()).toBe(true);
  });
});

describe('useXmbSound', () => {
  beforeEach(() => {
    window.localStorage.clear();
    // Minimal AudioContext mock
    const connect = () => ({ connect });
    globalThis.AudioContext = vi.fn(() => ({
      state: 'running',
      currentTime: 0,
      resume: vi.fn(),
      destination: {},
      createOscillator: () => ({
        type: 'sine', frequency: { setValueAtTime: vi.fn() },
        connect, start: vi.fn(), stop: vi.fn(),
      }),
      createGain: () => ({
        gain: { setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() },
        connect,
      }),
    }));
  });

  it('toggleMuted flips state and persists', () => {
    const { result } = renderHook(() => useXmbSound());
    expect(result.current.muted).toBe(false);
    act(() => result.current.toggleMuted());
    expect(result.current.muted).toBe(true);
    expect(window.localStorage.getItem(MUTE_STORAGE_KEY)).toBe('true');
  });

  it('does not create an AudioContext when muted', () => {
    window.localStorage.setItem(MUTE_STORAGE_KEY, 'true');
    const { result } = renderHook(() => useXmbSound());
    act(() => result.current.playCursor());
    expect(globalThis.AudioContext).not.toHaveBeenCalled();
  });

  it('creates an AudioContext on first play when unmuted', () => {
    const { result } = renderHook(() => useXmbSound());
    act(() => result.current.playCursor());
    expect(globalThis.AudioContext).toHaveBeenCalledTimes(1);
  });
});
