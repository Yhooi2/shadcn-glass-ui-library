/**
 * Fuzzy Search Utility
 *
 * Provides fuzzy matching for component names.
 * Supports various input formats:
 * - Exact: ButtonGlass
 * - Lowercase: buttonglass, button
 * - Kebab-case: button-glass
 * - Partial: btn, badge
 * - Typos: buton (Levenshtein distance)
 */

// ========================================
// TYPES
// ========================================

export interface ComponentMatch {
  name: string;
  path: string;
  category: string;
  level: number;
  score: number;
}

export interface SearchableComponent {
  name: string;
  path: string;
  category: string;
  level: number;
}

// ========================================
// NORMALIZATION
// ========================================

/**
 * Normalize a search query for comparison
 *
 * Transforms:
 * - "ButtonGlass" -> "button"
 * - "button-glass" -> "buttonglass"
 * - "BUTTON" -> "button"
 */
export function normalizeQuery(query: string): string {
  return query
    .toLowerCase()
    .replace(/glass$/i, '') // Remove "Glass" suffix
    .replace(/-/g, '') // Remove hyphens
    .replace(/_/g, '') // Remove underscores
    .trim();
}

/**
 * Normalize component name for comparison
 */
export function normalizeComponentName(name: string): string {
  return name
    .toLowerCase()
    .replace(/glass$/i, '')
    .replace(/-/g, '')
    .replace(/_/g, '');
}

// ========================================
// SCORING
// ========================================

/**
 * Calculate Levenshtein distance between two strings
 */
export function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];

  // Initialize first column
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  // Initialize first row
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  // Fill in the rest of the matrix
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1, // insertion
          matrix[i - 1][j] + 1 // deletion
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

/**
 * Calculate match score for a component
 *
 * Scoring:
 * - 100: Exact match (normalized)
 * - 80: Starts with query
 * - 60: Contains query
 * - 40-20: Small Levenshtein distance (typo tolerance)
 * - 0: No match
 */
export function calculateMatchScore(query: string, componentName: string): number {
  const normalizedQuery = normalizeQuery(query);
  const normalizedName = normalizeComponentName(componentName);

  // Exact match (normalized)
  if (normalizedName === normalizedQuery) {
    return 100;
  }

  // Exact match with original name (case-insensitive)
  if (componentName.toLowerCase() === query.toLowerCase()) {
    return 100;
  }

  // Starts with query
  if (normalizedName.startsWith(normalizedQuery)) {
    return 80;
  }

  // Contains query
  if (normalizedName.includes(normalizedQuery)) {
    return 60;
  }

  // Levenshtein distance for typo tolerance
  const distance = levenshteinDistance(normalizedQuery, normalizedName);

  // Allow up to 2 character differences for short queries
  // and up to 3 for longer queries
  const maxDistance = normalizedQuery.length <= 4 ? 2 : 3;

  if (distance <= maxDistance) {
    // Score decreases with distance: 40 for 1, 30 for 2, 20 for 3
    return Math.max(20, 50 - distance * 10);
  }

  return 0;
}

// ========================================
// FUZZY MATCHING
// ========================================

/**
 * Find components matching a query with fuzzy search
 *
 * @param query - Search query (e.g., "button", "ButtonGlass", "btn")
 * @param components - Array of searchable components
 * @returns Sorted array of matches with scores
 */
export function fuzzyMatch(query: string, components: SearchableComponent[]): ComponentMatch[] {
  if (!query || query.trim().length === 0) {
    return [];
  }

  const matches = components
    .map((comp) => ({
      ...comp,
      score: calculateMatchScore(query, comp.name),
    }))
    .filter((match) => match.score > 0)
    .sort((a, b) => {
      // Primary sort by score (descending)
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      // Secondary sort by level (ascending - core components first)
      if (a.level !== b.level) {
        return a.level - b.level;
      }
      // Tertiary sort by name (alphabetical)
      return a.name.localeCompare(b.name);
    });

  return matches;
}

/**
 * Find the best matching component
 *
 * @param query - Search query
 * @param components - Array of searchable components
 * @returns Best match or null
 */
export function findBestMatch(
  query: string,
  components: SearchableComponent[]
): ComponentMatch | null {
  const matches = fuzzyMatch(query, components);
  return matches.length > 0 ? matches[0] : null;
}

/**
 * Check if a query has any matches
 */
export function hasMatch(query: string, components: SearchableComponent[]): boolean {
  return fuzzyMatch(query, components).length > 0;
}
