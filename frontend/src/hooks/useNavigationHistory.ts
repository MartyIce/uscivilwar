import { useState, useCallback, useMemo } from 'react';

export type HistoryItem =
  | { type: 'event'; eventId: number }
  | { type: 'person'; personName: string }
  | { type: 'city'; cityName: string }
  | { type: 'state'; stateName: string };

export interface NavigationHistory {
  current: HistoryItem | null;
  canGoBack: boolean;
  canGoForward: boolean;
  navigate: (item: HistoryItem) => void;
  goBack: () => void;
  goForward: () => void;
  clear: () => void;
}

export function useNavigationHistory(): NavigationHistory {
  // Combined state to ensure atomic updates (fixes race condition when clicking rapidly)
  const [state, setState] = useState<{ history: HistoryItem[]; index: number }>({
    history: [],
    index: -1,
  });

  const current = useMemo(() => {
    if (state.index >= 0 && state.index < state.history.length) {
      return state.history[state.index];
    }
    return null;
  }, [state.history, state.index]);

  const canGoBack = state.index > 0;
  const canGoForward = state.index < state.history.length - 1;

  const navigate = useCallback((item: HistoryItem) => {
    setState((prev) => ({
      // Clear forward history and add new item
      history: [...prev.history.slice(0, prev.index + 1), item],
      index: prev.index + 1,
    }));
  }, []);

  const goBack = useCallback(() => {
    setState((prev) => {
      if (prev.index > 0) {
        return { ...prev, index: prev.index - 1 };
      }
      return prev;
    });
  }, []);

  const goForward = useCallback(() => {
    setState((prev) => {
      if (prev.index < prev.history.length - 1) {
        return { ...prev, index: prev.index + 1 };
      }
      return prev;
    });
  }, []);

  const clear = useCallback(() => {
    setState({ history: [], index: -1 });
  }, []);

  return {
    current,
    canGoBack,
    canGoForward,
    navigate,
    goBack,
    goForward,
    clear,
  };
}
