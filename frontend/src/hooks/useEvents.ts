import { useQuery } from '@tanstack/react-query';
import { eventsApi } from '../api/client';
import type { EventQueryParams } from '../types';

// Query keys for cache management
export const eventKeys = {
  all: ['events'] as const,
  lists: () => [...eventKeys.all, 'list'] as const,
  list: (params: EventQueryParams) => [...eventKeys.lists(), params] as const,
  details: () => [...eventKeys.all, 'detail'] as const,
  detail: (id: number) => [...eventKeys.details(), id] as const,
  timeline: (dateFrom?: string, dateTo?: string) => [...eventKeys.all, 'timeline', dateFrom, dateTo] as const,
  participants: (id: number) => [...eventKeys.all, 'participants', id] as const,
};

// Hook to fetch all events with filtering
export function useEvents(params: EventQueryParams = {}) {
  return useQuery({
    queryKey: eventKeys.list(params),
    queryFn: () => eventsApi.getAll(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Hook to fetch a single event by ID
export function useEvent(id: number | null) {
  return useQuery({
    queryKey: eventKeys.detail(id!),
    queryFn: () => eventsApi.getById(id!),
    enabled: id !== null,
    staleTime: 5 * 60 * 1000,
  });
}

// Hook to fetch timeline events
export function useTimeline(dateFrom?: string, dateTo?: string) {
  return useQuery({
    queryKey: eventKeys.timeline(dateFrom, dateTo),
    queryFn: () => eventsApi.getTimeline(dateFrom, dateTo),
    staleTime: 5 * 60 * 1000,
  });
}

// Hook to fetch event participants
export function useEventParticipants(eventId: number | null) {
  return useQuery({
    queryKey: eventKeys.participants(eventId!),
    queryFn: () => eventsApi.getParticipants(eventId!),
    enabled: eventId !== null,
    staleTime: 5 * 60 * 1000,
  });
}
