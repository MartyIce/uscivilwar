import { useState, useEffect } from 'react';
import type { Person, Side } from '../../types';

interface PersonDetailProps {
  person: Person;
  onBack?: () => void;
  onEventClick?: (eventId: number) => void;
  onSideClick?: (side: Side) => void;
}

// Format date for display
function formatDate(dateStr: string | null): string {
  if (!dateStr) return 'Unknown';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Calculate age at death or current age
function calculateLifespan(birthDate: string | null, deathDate: string | null): string {
  if (!birthDate) return '';
  const birth = new Date(birthDate);
  const death = deathDate ? new Date(deathDate) : null;

  if (death) {
    const age = Math.floor((death.getTime() - birth.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
    return `(${age} years)`;
  }
  return '';
}

// Get side badge color
function getSideBadgeColor(side: string | null): string {
  switch (side) {
    case 'union':
      return 'bg-blue-100 text-blue-800';
    case 'confederate':
      return 'bg-gray-200 text-gray-800';
    default:
      return 'bg-amber-100 text-amber-800';
  }
}

export default function PersonDetail({ person, onBack, onEventClick, onSideClick }: PersonDetailProps) {
  const lifespan = calculateLifespan(person.birth_date, person.death_date);
  const [imageError, setImageError] = useState(false);

  // Reset image error when person changes
  useEffect(() => {
    setImageError(false);
  }, [person.id]);

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

      {/* Portrait image */}
      <div className="h-72 bg-gradient-to-b from-gray-200 to-gray-300 overflow-hidden flex items-center justify-center">
        {person.image_url && !imageError ? (
          <img
            src={person.image_url}
            alt={person.name}
            className="w-full h-full object-contain bg-gray-100"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-32 h-32 bg-gray-400 rounded-full flex items-center justify-center">
            <svg className="w-20 h-20 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Name and badges */}
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-900">{person.name}</h2>

          <div className="flex flex-wrap gap-2 mt-2">
            {person.side && (
              <button
                onClick={() => onSideClick?.(person.side as Side)}
                className={`px-2 py-1 text-xs font-medium rounded ${getSideBadgeColor(person.side)} hover:ring-2 hover:ring-offset-1 ${
                  person.side === 'union' ? 'hover:ring-blue-400' : 'hover:ring-gray-400'
                } transition-all cursor-pointer flex items-center gap-1`}
                title={`View ${person.side === 'union' ? 'Union' : 'Confederate'} command structure`}
              >
                {person.side.charAt(0).toUpperCase() + person.side.slice(1)}
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
            )}
            {person.highest_rank && (
              <span className="px-2 py-1 text-xs font-medium rounded bg-indigo-100 text-indigo-800">
                {person.highest_rank}
              </span>
            )}
          </div>
        </div>

        {/* Life dates */}
        <div className="mb-4 text-sm text-gray-600">
          <p>
            <span className="font-semibold">Born:</span> {formatDate(person.birth_date)}
          </p>
          <p>
            <span className="font-semibold">Died:</span> {formatDate(person.death_date)} {lifespan}
          </p>
        </div>

        {/* Rank progression */}
        {person.rank && person.highest_rank && person.rank !== person.highest_rank && (
          <div className="mb-4">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Wartime Rank:</span> {person.rank}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Highest Rank:</span> {person.highest_rank}
            </p>
          </div>
        )}

        {/* Biography */}
        {person.biography && (
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-1">Biography</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{person.biography}</p>
          </div>
        )}

        {/* Battles participated */}
        {person.events && person.events.length > 0 && (
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Battles & Events</h3>
            <div className="space-y-1">
              {person.events.map((event) => (
                <button
                  key={event.event_id}
                  onClick={() => onEventClick?.(event.event_id)}
                  className="w-full text-left px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded text-sm transition-colors"
                >
                  <span className="font-medium text-gray-800">{event.event_name}</span>
                  <span className="text-gray-500 ml-2">{event.date}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* External links */}
        {person.wikipedia_url && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <a
              href={person.wikipedia_url}
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
