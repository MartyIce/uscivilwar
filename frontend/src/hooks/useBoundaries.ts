import { useQuery } from '@tanstack/react-query';
import { boundariesApi } from '../api/client';
import type { BoundaryQueryParams } from '../types';

// Query keys for cache management
export const boundaryKeys = {
  all: ['boundaries'] as const,
  byDate: (params: BoundaryQueryParams) => [...boundaryKeys.all, params] as const,
  timeline: () => [...boundaryKeys.all, 'timeline'] as const,
};

// Hook to fetch boundaries for a specific date
export function useBoundaries(params: BoundaryQueryParams) {
  return useQuery({
    queryKey: boundaryKeys.byDate(params),
    queryFn: () => boundariesApi.get(params),
    staleTime: 10 * 60 * 1000, // 10 minutes - boundaries don't change often
  });
}

// Hook to fetch boundary change timeline
export function useBoundaryTimeline() {
  return useQuery({
    queryKey: boundaryKeys.timeline(),
    queryFn: () => boundariesApi.getTimeline(),
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
}
