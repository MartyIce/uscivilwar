import { useState, useCallback, useMemo } from 'react';

export type HistoryItem =
  | { type: 'event'; eventId: number }
  | { type: 'person'; personName: string };

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
  // History stack and current position
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const current = useMemo(() => {
    if (currentIndex >= 0 && currentIndex < history.length) {
      return history[currentIndex];
    }
    return null;
  }, [history, currentIndex]);

  const canGoBack = currentIndex > 0;
  const canGoForward = currentIndex < history.length - 1;

  const navigate = useCallback((item: HistoryItem) => {
    setHistory((prev) => {
      // Clear forward history and add new item
      const newHistory = prev.slice(0, currentIndex + 1);
      newHistory.push(item);
      return newHistory;
    });
    setCurrentIndex((prev) => prev + 1);
  }, [currentIndex]);

  const goBack = useCallback(() => {
    if (canGoBack) {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [canGoBack]);

  const goForward = useCallback(() => {
    if (canGoForward) {
      setCurrentIndex((prev) => prev + 1);
    }
  }, [canGoForward]);

  const clear = useCallback(() => {
    setHistory([]);
    setCurrentIndex(-1);
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
