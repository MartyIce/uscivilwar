import { useState, useEffect, useCallback } from 'react';
import { eventNameToSlug, personNameToSlug } from '../utils/slugs';
import type { CivilWarEvent, Person } from '../types';

interface DeepLinkState {
  eventSlug: string | null;
  personSlug: string | null;
}

interface UseDeepLinkReturn {
  eventSlug: string | null;
  personSlug: string | null;
  setEventByName: (name: string | null) => void;
  setPersonByName: (name: string | null) => void;
  clearSelection: () => void;
  // Helper to find event/person from data
  findEvent: (events: CivilWarEvent[]) => CivilWarEvent | null;
  findPerson: (people: Person[]) => Person | null;
}

/**
 * Custom hook for managing deep linking with URL synchronization using slugs.
 *
 * URL format:
 * - ?event=gettysburg - View Battle of Gettysburg
 * - ?person=robert_lee - View Robert E. Lee
 * - (no params) - No selection
 *
 * Slugs are generated from names:
 * - "Battle of Gettysburg" → "gettysburg"
 * - "Robert E. Lee" → "robert_lee"
 */
export function useDeepLink(): UseDeepLinkReturn {
  // Parse initial state from URL
  const parseUrl = useCallback((): DeepLinkState => {
    const params = new URLSearchParams(window.location.search);
    const eventParam = params.get('event');
    const personParam = params.get('person');

    return {
      eventSlug: eventParam || null,
      personSlug: personParam || null,
    };
  }, []);

  const [state, setState] = useState<DeepLinkState>(parseUrl);

  // Update URL without triggering a full page reload
  const updateUrl = useCallback((newState: DeepLinkState) => {
    const params = new URLSearchParams();

    if (newState.eventSlug) {
      params.set('event', newState.eventSlug);
    }
    if (newState.personSlug) {
      params.set('person', newState.personSlug);
    }

    const newUrl = params.toString()
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;

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

  // Set event by name (converts to slug)
  const setEventByName = useCallback((name: string | null) => {
    setState(prev => {
      const newState = {
        ...prev,
        eventSlug: name ? eventNameToSlug(name) : null,
      };
      // When selecting an event, clear person selection
      if (name !== null) {
        newState.personSlug = null;
      }
      updateUrl(newState);
      return newState;
    });
  }, [updateUrl]);

  // Set person by name (converts to slug)
  const setPersonByName = useCallback((name: string | null) => {
    setState(prev => {
      const newState = {
        ...prev,
        personSlug: name ? personNameToSlug(name) : null,
      };
      // Keep eventSlug when viewing a person (for "back to event" functionality)
      updateUrl(newState);
      return newState;
    });
  }, [updateUrl]);

  // Clear all selection
  const clearSelection = useCallback(() => {
    const newState = { eventSlug: null, personSlug: null };
    setState(newState);
    updateUrl(newState);
  }, [updateUrl]);

  // Find event from list by current slug
  const findEvent = useCallback((events: CivilWarEvent[]): CivilWarEvent | null => {
    if (!state.eventSlug) return null;
    return events.find(e => eventNameToSlug(e.name) === state.eventSlug) || null;
  }, [state.eventSlug]);

  // Find person from list by current slug
  const findPerson = useCallback((people: Person[]): Person | null => {
    if (!state.personSlug) return null;
    return people.find(p => personNameToSlug(p.name) === state.personSlug) || null;
  }, [state.personSlug]);

  return {
    eventSlug: state.eventSlug,
    personSlug: state.personSlug,
    setEventByName,
    setPersonByName,
    clearSelection,
    findEvent,
    findPerson,
  };
}
