import { useQuery } from '@tanstack/react-query';

// Extract the article title from a Wikipedia URL (e.g. .../wiki/Battle_of_Fort_Sumter)
function getWikipediaTitle(url: string | null | undefined): string | null {
  if (!url) return null;
  try {
    const { hostname, pathname } = new URL(url);
    if (!hostname.endsWith('wikipedia.org')) return null;
    const match = pathname.match(/^\/wiki\/(.+)$/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}

// Look up the lead image for a Wikipedia article. Returns a remote URL that is
// hotlinked from Wikimedia, so nothing is downloaded or stored in this repo.
async function fetchWikipediaImage(title: string): Promise<string | null> {
  const res = await fetch(
    `https://en.wikipedia.org/api/rest_v1/page/summary/${title}`
  );
  if (!res.ok) return null;
  const data = await res.json();
  return data.thumbnail?.source ?? null;
}

export function useWikipediaImage(wikipediaUrl: string | null | undefined) {
  const title = getWikipediaTitle(wikipediaUrl);
  return useQuery({
    queryKey: ['wikipedia-image', title],
    queryFn: () => fetchWikipediaImage(title as string),
    enabled: !!title,
    staleTime: Infinity,
    retry: false,
  });
}
