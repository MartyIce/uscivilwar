interface UnknownPersonDetailProps {
  name: string;
  onBack?: () => void;
}

// Generate a Wikipedia search URL for a person
function getWikipediaSearchUrl(name: string): string {
  const searchQuery = encodeURIComponent(`${name} American Civil War`);
  return `https://en.wikipedia.org/wiki/Special:Search?search=${searchQuery}`;
}

// Try to generate a direct Wikipedia URL (best guess)
function getWikipediaDirectUrl(name: string): string {
  // Replace spaces with underscores for Wikipedia URL format
  const formattedName = name.replace(/ /g, '_');
  return `https://en.wikipedia.org/wiki/${formattedName}`;
}

export default function UnknownPersonDetail({ name, onBack }: UnknownPersonDetailProps) {
  return (
    <div className="relative">
      {/* Back button */}
      {onBack && (
        <button
          onClick={onBack}
          className="absolute top-4 left-4 z-10 flex items-center gap-1 px-3 py-1.5 bg-white/90 rounded-lg shadow-sm text-sm text-gray-600 hover:bg-white hover:text-gray-900 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
      )}

      {/* Placeholder portrait */}
      <div className="h-48 bg-gradient-to-b from-gray-200 to-gray-300 flex items-center justify-center">
        <div className="w-24 h-24 bg-gray-400 rounded-full flex items-center justify-center">
          <svg className="w-16 h-16 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-900 mb-4">{name}</h2>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
          <p className="text-sm text-amber-800">
            We don't have detailed information on this person yet. You can learn more about them on Wikipedia.
          </p>
        </div>

        {/* Wikipedia links */}
        <div className="space-y-2">
          <a
            href={getWikipediaDirectUrl(name)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-lg text-blue-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            <span className="font-medium">View on Wikipedia</span>
          </a>

          <a
            href={getWikipediaSearchUrl(name)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span>Search Wikipedia for "{name}"</span>
          </a>
        </div>
      </div>
    </div>
  );
}
