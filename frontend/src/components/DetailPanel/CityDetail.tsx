import type { CityData } from '../../mocks/data/cities';

interface CityDetailProps {
  city: CityData;
}

function getSideBadgeStyle(side: 'union' | 'confederate' | 'border'): string {
  switch (side) {
    case 'union':
      return 'bg-blue-100 text-blue-800';
    case 'confederate':
      return 'bg-gray-200 text-gray-800';
    case 'border':
      return 'bg-amber-100 text-amber-800';
  }
}

function formatPopulation(pop: number | null): string {
  if (!pop) return 'Unknown';
  return pop.toLocaleString();
}

export default function CityDetail({ city }: CityDetailProps) {
  return (
    <div className="relative">
      {/* City image placeholder */}
      <div className="h-48 bg-gradient-to-b from-gray-300 to-gray-400 overflow-hidden flex items-center justify-center">
        <div className="text-center">
          <svg className="w-16 h-16 text-gray-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <p className="text-gray-500 text-sm mt-2">Historical illustration</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Name and badges */}
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-900">{city.name}</h2>
          {city.state && (
            <p className="text-sm text-gray-500">{city.state}</p>
          )}

          <div className="flex flex-wrap gap-2 mt-2">
            <span className={`px-2 py-1 text-xs font-medium rounded ${getSideBadgeStyle(city.side)}`}>
              {city.side === 'union' ? 'Union' : city.side === 'confederate' ? 'Confederate' : 'Border State'}
            </span>
            {city.population_1860 && (
              <span className="px-2 py-1 text-xs font-medium rounded bg-purple-100 text-purple-800">
                Pop. {formatPopulation(city.population_1860)} (1860)
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 leading-relaxed">{city.description}</p>
        </div>

        {/* Wartime role */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-1">Role in the War</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{city.wartime_role}</p>
        </div>

        {/* Key events */}
        {city.key_events && city.key_events.length > 0 && (
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Key Events</h3>
            <ul className="space-y-1">
              {city.key_events.map((event, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>{event}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
