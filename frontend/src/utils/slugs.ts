/**
 * Slug utilities for generating URL-friendly identifiers for events and people.
 *
 * Examples:
 * - "Battle of Gettysburg" → "gettysburg"
 * - "First Battle of Bull Run" → "first_bull_run"
 * - "Ulysses S. Grant" → "ulysses_grant"
 * - "Robert E. Lee" → "robert_lee"
 */

// Common prefixes to strip from event names
const EVENT_PREFIXES = [
  'battle of ',
  'siege of ',
  'raid on ',
  'capture of ',
  'fall of ',
  'burning of ',
  'sinking of ',
  'engagement at ',
  'action at ',
  'affair at ',
  'skirmish at ',
];

/**
 * Generate a slug from an event name.
 * Strips common prefixes and converts to lowercase with underscores.
 */
export function eventNameToSlug(name: string): string {
  let slug = name.toLowerCase();

  // Strip common prefixes
  for (const prefix of EVENT_PREFIXES) {
    if (slug.startsWith(prefix)) {
      slug = slug.slice(prefix.length);
      break;
    }
  }

  // Replace spaces and special chars with underscores
  slug = slug
    .replace(/['']/g, '') // Remove apostrophes
    .replace(/[^a-z0-9]+/g, '_') // Replace non-alphanumeric with underscore
    .replace(/^_+|_+$/g, '') // Trim leading/trailing underscores
    .replace(/_+/g, '_'); // Collapse multiple underscores

  return slug;
}

/**
 * Generate a slug from a person's name.
 * Uses first name + last name, skipping middle initials.
 */
export function personNameToSlug(name: string): string {
  const parts = name.split(' ').filter(part => {
    // Skip single letters with periods (initials like "S." or "E.")
    if (part.length <= 2 && part.endsWith('.')) return false;
    // Skip single letters (initials like "S" or "E")
    if (part.length === 1) return false;
    return true;
  });

  // Take first and last meaningful parts
  let slugParts: string[] = [];
  if (parts.length >= 2) {
    slugParts = [parts[0], parts[parts.length - 1]];
  } else if (parts.length === 1) {
    slugParts = [parts[0]];
  }

  return slugParts
    .join('_')
    .toLowerCase()
    .replace(/['']/g, '') // Remove apostrophes
    .replace(/[^a-z0-9_]+/g, '_') // Replace special chars
    .replace(/_+/g, '_') // Collapse underscores
    .replace(/^_+|_+$/g, ''); // Trim
}

/**
 * Check if an event name matches a slug.
 */
export function eventMatchesSlug(name: string, slug: string): boolean {
  return eventNameToSlug(name) === slug;
}

/**
 * Check if a person name matches a slug.
 */
export function personMatchesSlug(name: string, slug: string): boolean {
  return personNameToSlug(name) === slug;
}

/**
 * Convert a slug back to a displayable name (title case).
 * This is a best-effort conversion for unknown persons.
 */
export function slugToDisplayName(slug: string): string {
  return slug
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
