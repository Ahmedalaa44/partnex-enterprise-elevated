import { useQuery } from "@tanstack/react-query";
import { defaultHomeContent } from "../data/defaultContent";
import { homePageQuery } from "../lib/sanityQueries";
import { sanityFetch, isSanityConfigured } from "../lib/sanityClient";
import type { HomePageContent } from "../lib/sanityTypes";

export function useSanityContent() {
  return useQuery<HomePageContent>({
    queryKey: ["homePageContent"],
    queryFn: async () => {
      if (!isSanityConfigured()) {
        return defaultHomeContent;
      }
      const data = await sanityFetch<HomePageContent>(homePageQuery);
      return data ?? defaultHomeContent;
    },
    staleTime: 1000 * 60,
    cacheTime: 1000 * 60 * 5,
    retry: false,
    keepPreviousData: true,
    initialData: defaultHomeContent,
  });
}
