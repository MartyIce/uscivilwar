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
  byName: (name: string) => [...peopleKeys.all, 'byName', name] as const,
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

// Hook to find a person by name (fetches all people and filters)
export function usePersonByName(name: string | null) {
  // First, fetch all people
  const { data: allPeople, isLoading: isLoadingList } = useQuery({
    queryKey: peopleKeys.list({ limit: 200 }),
    queryFn: () => peopleApi.getAll({ limit: 200 }),
    staleTime: 10 * 60 * 1000, // Cache for 10 minutes
    enabled: name !== null,
  });

  // Find the person whose name matches
  const person = name && allPeople?.data
    ? allPeople.data.find((p) => {
        const searchName = name.toLowerCase();
        const personName = p.name.toLowerCase();

        // Exact match
        if (personName === searchName) return true;

        // Check if the search name's last name matches the person's last name
        const searchLastName = name.split(' ').pop()?.toLowerCase();
        const personLastName = p.name.split(' ').pop()?.toLowerCase();

        if (searchLastName && personLastName && searchLastName === personLastName) {
          return true;
        }

        // Check if person's name contains the full search name
        if (personName.includes(searchName)) return true;

        // Check if search name contains person's full name
        if (searchName.includes(personName)) return true;

        return false;
      })
    : null;

  // If we found a person, fetch their full details with events
  const detailQuery = useQuery({
    queryKey: peopleKeys.detail(person?.id!),
    queryFn: () => peopleApi.getById(person!.id),
    enabled: person !== null && person !== undefined,
    staleTime: 5 * 60 * 1000,
  });

  // Combine loading states
  return {
    ...detailQuery,
    isLoading: isLoadingList || detailQuery.isLoading,
  };
}
