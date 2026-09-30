import { useQuery } from "@tanstack/react-query";
import { StatsService } from "@/services/stats/getMembersByCountry.service";

export const membersByCountryQueryKey = ["stats", "members-by-country"] as const;

/**
 * Members per country for the Home's Global Presence section. Retry and stale
 * time come from the app's QueryClient defaults (one retry, 15 minutes), which
 * match the api's own caching.
 */
export function useGetMembersByCountry() {
  return useQuery({
    queryKey: membersByCountryQueryKey,
    queryFn: () => StatsService.getMembersByCountry(),
  });
}
