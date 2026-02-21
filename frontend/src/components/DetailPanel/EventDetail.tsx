import type { CivilWarEvent, CasualtyStats } from '../../types';

interface EventDetailProps {
  event: CivilWarEvent;
}

// Format date for display
function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Format casualty numbers
function formatNumber(num: number | null): string {
  if (num === null) return '-';
  return num.toLocaleString();
}

// Calculate total casualties
function getTotalCasualties(stats: CasualtyStats): number {
  return (stats.killed || 0) + (stats.wounded || 0) + (stats.captured || 0) + (stats.missing || 0);
}

// Get badge color for event type
function getTypeBadgeColor(type: string): string {
  switch (type) {
    case 'battle':
      return 'bg-red-100 text-red-800';
    case 'siege':
      return 'bg-orange-100 text-orange-800';
    case 'raid':
      return 'bg-yellow-100 text-yellow-800';
    case 'skirmish':
      return 'bg-green-100 text-green-800';
    case 'surrender':
      return 'bg-purple-100 text-purple-800';
    case 'treaty':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

// Get result badge color
function getResultBadgeColor(result: string | null): string {
  if (!result) return 'bg-gray-100 text-gray-800';
  const lower = result.toLowerCase();
  if (lower.includes('union')) return 'bg-blue-100 text-blue-800';
  if (lower.includes('confederate')) return 'bg-gray-200 text-gray-800';
  return 'bg-amber-100 text-amber-800';
}

export default function EventDetail({ event }: EventDetailProps) {
  const dateRange =
    event.date_end && event.date_end !== event.date_start
      ? `${formatDate(event.date_start)} - ${formatDate(event.date_end)}`
      : formatDate(event.date_start);

  return (
    <div className="relative">
      {/* Header image */}
      {event.image_url && (
        <div className="h-48 bg-gray-200 overflow-hidden">
          <img
            src={event.image_url}
            alt={event.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        {/* Title and badges */}
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-900">{event.name}</h2>
          <p className="text-gray-500 mt-1">{dateRange}</p>

          <div className="flex flex-wrap gap-2 mt-2">
            <span
              className={`px-2 py-1 text-xs font-medium rounded ${getTypeBadgeColor(
                event.type
              )}`}
            >
              {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
            </span>
            {event.result && (
              <span
                className={`px-2 py-1 text-xs font-medium rounded ${getResultBadgeColor(
                  event.result
                )}`}
              >
                {event.result}
              </span>
            )}
            {event.significance && (
              <span className="px-2 py-1 text-xs font-medium rounded bg-indigo-100 text-indigo-800">
                Significance: {event.significance}/5
              </span>
            )}
          </div>
        </div>

        {/* Location */}
        {event.location && (
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-1">
              Location
            </h3>
            <p className="text-gray-600">
              {event.location.name}
              {event.location.state && `, ${event.location.state}`}
            </p>
          </div>
        )}

        {/* Campaign and Theater */}
        {(event.campaign || event.theater) && (
          <div className="mb-4">
            {event.campaign && (
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Campaign:</span> {event.campaign}
              </p>
            )}
            {event.theater && (
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Theater:</span> {event.theater}
              </p>
            )}
          </div>
        )}

        {/* Description */}
        {event.description && (
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-1">
              Description
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {event.description}
            </p>
          </div>
        )}

        {/* Commanders */}
        {event.commanders && (
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              Commanders
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-medium text-blue-600 mb-1">Union</p>
                <ul className="text-sm text-gray-600">
                  {event.commanders.union.map((name, i) => (
                    <li key={i}>{name}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">
                  Confederate
                </p>
                <ul className="text-sm text-gray-600">
                  {event.commanders.confederate.map((name, i) => (
                    <li key={i}>{name}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Casualties */}
        {event.casualties && (
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              Casualties
            </h3>
            <div className="bg-gray-50 rounded-lg p-3">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gray-500">
                    <th className="text-left font-medium py-1"></th>
                    <th className="text-right font-medium py-1 text-blue-600">
                      Union
                    </th>
                    <th className="text-right font-medium py-1 text-gray-500">
                      CSA
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr>
                    <td className="py-1">Killed</td>
                    <td className="text-right">
                      {formatNumber(event.casualties.union.killed)}
                    </td>
                    <td className="text-right">
                      {formatNumber(event.casualties.confederate.killed)}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1">Wounded</td>
                    <td className="text-right">
                      {formatNumber(event.casualties.union.wounded)}
                    </td>
                    <td className="text-right">
                      {formatNumber(event.casualties.confederate.wounded)}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1">Captured</td>
                    <td className="text-right">
                      {formatNumber(event.casualties.union.captured)}
                    </td>
                    <td className="text-right">
                      {formatNumber(event.casualties.confederate.captured)}
                    </td>
                  </tr>
                  <tr className="border-t border-gray-200 font-semibold">
                    <td className="py-1">Total</td>
                    <td className="text-right text-blue-600">
                      {formatNumber(getTotalCasualties(event.casualties.union))}
                    </td>
                    <td className="text-right text-gray-500">
                      {formatNumber(
                        getTotalCasualties(event.casualties.confederate)
                      )}
                    </td>
                  </tr>
                  <tr className="text-xs text-gray-400">
                    <td className="py-1">Engaged</td>
                    <td className="text-right">
                      {formatNumber(event.casualties.union.total_engaged)}
                    </td>
                    <td className="text-right">
                      {formatNumber(event.casualties.confederate.total_engaged)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* External links */}
        {event.wikipedia_url && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <a
              href={event.wikipedia_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-blue-600 hover:underline"
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              Read more on Wikipedia
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
