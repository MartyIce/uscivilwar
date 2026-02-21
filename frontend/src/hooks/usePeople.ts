import { useQuery } from '@tanstack/react-query';
import { peopleApi } from '../api/client';

// Query keys for cache management
export const peopleKeys = {
  all: ['people'] as const,
  lists: () => [...peopleKeys.all, 'list'] as const,
  list: (params: { limit?: number; offset?: number; side?: 'union' | 'confederate' }) =>
    [...peopleKeys.lists(), params] as const,
  details: () => [...peopleKeys.all, 'detail'] as const,
  detail: (id: number) => [...peopleKeys.details(), id] as const,
  events: (id: number) => [...peopleKeys.all, 'events', id] as const,
};

// Hook to fetch all people with filtering
export function usePeople(params: {
  limit?: number;
  offset?: number;
  side?: 'union' | 'confederate';
} = {}) {
  return useQuery({
    queryKey: peopleKeys.list(params),
    queryFn: () => peopleApi.getAll(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Hook to fetch a single person by ID
export function usePerson(id: number | null) {
  return useQuery({
    queryKey: peopleKeys.detail(id!),
    queryFn: () => peopleApi.getById(id!),
    enabled: id !== null,
    staleTime: 5 * 60 * 1000,
  });
}

// Hook to fetch events for a person
export function usePersonEvents(personId: number | null) {
  return useQuery({
    queryKey: peopleKeys.events(personId!),
    queryFn: () => peopleApi.getEvents(personId!),
    enabled: personId !== null,
    staleTime: 5 * 60 * 1000,
  });
}
