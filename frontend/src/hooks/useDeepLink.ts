import { useState, useEffect, useCallback } from 'react';

interface DeepLinkState {
  eventId: number | null;
  personName: string | null;
}

interface UseDeepLinkReturn {
  eventId: number | null;
  personName: string | null;
  setEventId: (id: number | null) => void;
  setPersonName: (name: string | null) => void;
  clearSelection: () => void;
}

/**
 * Custom hook for managing deep linking with URL synchronization.
 *
 * URL format:
 * - ?event=123 - View event with ID 123
 * - ?person=Robert%20E.%20Lee - View person by name
 * - (no params) - No selection
 *
 * When both event and person are in URL, person takes precedence for display
 * but event is preserved for "back to event" navigation.
 */
export function useDeepLink(): UseDeepLinkReturn {
  // Parse initial state from URL
  const parseUrl = useCallback((): DeepLinkState => {
    const params = new URLSearchParams(window.location.search);
    const eventParam = params.get('event');
    const personParam = params.get('person');

    return {
      eventId: eventParam ? parseInt(eventParam, 10) : null,
      personName: personParam ? decodeURIComponent(personParam) : null,
    };
  }, []);

  const [state, setState] = useState<DeepLinkState>(parseUrl);

  // Update URL without triggering a full page reload
  const updateUrl = useCallback((newState: DeepLinkState) => {
    const params = new URLSearchParams();

    if (newState.eventId !== null) {
      params.set('event', String(newState.eventId));
    }
    if (newState.personName !== null) {
      params.set('person', encodeURIComponent(newState.personName));
    }

    const newUrl = params.toString()
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;

    // Use replaceState to avoid cluttering browser history for every selection
    // Use pushState only for significant navigation changes
    window.history.pushState({ ...newState }, '', newUrl);
  }, []);

  // Handle browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      setState(parseUrl());
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [parseUrl]);

  // Set event ID and update URL
  const setEventId = useCallback((id: number | null) => {
    setState(prev => {
      const newState = { ...prev, eventId: id };
      // When selecting an event, clear person selection
      if (id !== null) {
        newState.personName = null;
      }
      updateUrl(newState);
      return newState;
    });
  }, [updateUrl]);

  // Set person name and update URL
  const setPersonName = useCallback((name: string | null) => {
    setState(prev => {
      const newState = { ...prev, personName: name };
      // Keep eventId when viewing a person (for "back to event" functionality)
      updateUrl(newState);
      return newState;
    });
  }, [updateUrl]);

  // Clear all selection
  const clearSelection = useCallback(() => {
    const newState = { eventId: null, personName: null };
    setState(newState);
    updateUrl(newState);
  }, [updateUrl]);

  return {
    eventId: state.eventId,
    personName: state.personName,
    setEventId,
    setPersonName,
    clearSelection,
  };
}
