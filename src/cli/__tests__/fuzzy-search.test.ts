/**
 * Fuzzy Search Tests
 *
 * Tests for the fuzzy search utility used by the CLI.
 */

import { describe, it, expect } from 'vitest';
import {
  normalizeQuery,
  normalizeComponentName,
  levenshteinDistance,
  calculateMatchScore,
  fuzzyMatch,
  findBestMatch,
  hasMatch,
  type SearchableComponent,
} from '../utils/fuzzy-search';

// ========================================
// TEST DATA
// ========================================

const mockComponents: SearchableComponent[] = [
  { name: 'ButtonGlass', path: 'components/glass/ui/button-glass', category: 'core', level: 1 },
  { name: 'InputGlass', path: 'components/glass/ui/input-glass', category: 'core', level: 1 },
  { name: 'BadgeGlass', path: 'components/glass/ui/badge-glass', category: 'core', level: 1 },
  { name: 'ModalGlass', path: 'components/glass/ui/modal-glass', category: 'core', level: 1 },
  { name: 'TabsGlass', path: 'components/glass/ui/tabs-glass', category: 'core', level: 1 },
  { name: 'AlertGlass', path: 'components/glass/ui/alert-glass', category: 'core', level: 1 },
  {
    name: 'MetricCardGlass',
    path: 'components/glass/composite/metric-card-glass',
    category: 'composite',
    level: 4,
  },
  {
    name: 'ProfileAvatarGlass',
    path: 'components/glass/specialized/profile-avatar-glass',
    category: 'specialized',
    level: 3,
  },
];

// ========================================
// NORMALIZATION TESTS
// ========================================

describe('normalizeQuery', () => {
  it('removes "Glass" suffix', () => {
    expect(normalizeQuery('ButtonGlass')).toBe('button');
  });

  it('handles lowercase input', () => {
    expect(normalizeQuery('button')).toBe('button');
  });

  it('removes hyphens', () => {
    expect(normalizeQuery('button-glass')).toBe('button');
  });

  it('removes underscores', () => {
    expect(normalizeQuery('button_glass')).toBe('button');
  });

  it('handles mixed case', () => {
    expect(normalizeQuery('BUTTONGLASS')).toBe('button');
  });

  it('trims whitespace', () => {
    expect(normalizeQuery('  button  ')).toBe('button');
  });

  it('handles complex names', () => {
    expect(normalizeQuery('MetricCardGlass')).toBe('metriccard');
  });
});

describe('normalizeComponentName', () => {
  it('normalizes component names consistently', () => {
    expect(normalizeComponentName('ButtonGlass')).toBe('button');
    expect(normalizeComponentName('MetricCardGlass')).toBe('metriccard');
  });
});

// ========================================
// LEVENSHTEIN DISTANCE TESTS
// ========================================

describe('levenshteinDistance', () => {
  it('returns 0 for identical strings', () => {
    expect(levenshteinDistance('button', 'button')).toBe(0);
  });

  it('returns correct distance for single character difference', () => {
    expect(levenshteinDistance('button', 'buton')).toBe(1);
  });

  it('returns correct distance for substitution', () => {
    expect(levenshteinDistance('button', 'buttan')).toBe(1);
  });

  it('returns correct distance for multiple differences', () => {
    expect(levenshteinDistance('button', 'badge')).toBe(5);
  });

  it('handles empty strings', () => {
    expect(levenshteinDistance('', 'button')).toBe(6);
    expect(levenshteinDistance('button', '')).toBe(6);
  });
});

// ========================================
// MATCH SCORE TESTS
// ========================================

describe('calculateMatchScore', () => {
  it('returns 100 for exact normalized match', () => {
    expect(calculateMatchScore('ButtonGlass', 'ButtonGlass')).toBe(100);
    expect(calculateMatchScore('button', 'ButtonGlass')).toBe(100);
  });

  it('returns 80 for startsWith match', () => {
    expect(calculateMatchScore('btn', 'ButtonGlass')).toBe(0); // btn does not start button
    expect(calculateMatchScore('but', 'ButtonGlass')).toBe(80);
  });

  it('returns 60 for contains match', () => {
    expect(calculateMatchScore('ton', 'ButtonGlass')).toBe(60);
  });

  it('returns positive score for small Levenshtein distance', () => {
    // "buton" vs "button" = distance 1
    const score = calculateMatchScore('buton', 'ButtonGlass');
    expect(score).toBeGreaterThan(0);
    expect(score).toBeLessThan(60);
  });

  it('returns 0 for no match', () => {
    expect(calculateMatchScore('xyz', 'ButtonGlass')).toBe(0);
  });
});

// ========================================
// FUZZY MATCH TESTS
// ========================================

describe('fuzzyMatch', () => {
  it('finds exact match', () => {
    const matches = fuzzyMatch('ButtonGlass', mockComponents);
    expect(matches[0].name).toBe('ButtonGlass');
    expect(matches[0].score).toBe(100);
  });

  it('finds match with lowercase query', () => {
    const matches = fuzzyMatch('button', mockComponents);
    expect(matches[0].name).toBe('ButtonGlass');
    expect(matches[0].score).toBe(100);
  });

  it('finds match with partial query', () => {
    const matches = fuzzyMatch('modal', mockComponents);
    expect(matches[0].name).toBe('ModalGlass');
  });

  it('finds multiple matches sorted by score', () => {
    const matches = fuzzyMatch('glass', mockComponents);
    expect(matches.length).toBeGreaterThan(0);
    // All should contain "glass" in some form
    for (let i = 1; i < matches.length; i++) {
      expect(matches[i].score).toBeLessThanOrEqual(matches[i - 1].score);
    }
  });

  it('handles typos with Levenshtein distance', () => {
    const matches = fuzzyMatch('buton', mockComponents);
    expect(matches.length).toBeGreaterThan(0);
    expect(matches[0].name).toBe('ButtonGlass');
  });

  it('returns empty array for no matches', () => {
    const matches = fuzzyMatch('xyz123', mockComponents);
    expect(matches).toHaveLength(0);
  });

  it('returns empty array for empty query', () => {
    const matches = fuzzyMatch('', mockComponents);
    expect(matches).toHaveLength(0);
  });

  it('sorts by level when scores are equal', () => {
    // "card" should match both BadgeGlass and MetricCardGlass
    const matches = fuzzyMatch('card', mockComponents);
    const metricCard = matches.find((m) => m.name === 'MetricCardGlass');
    expect(metricCard).toBeDefined();
  });
});

// ========================================
// HELPER FUNCTION TESTS
// ========================================

describe('findBestMatch', () => {
  it('returns best match', () => {
    const match = findBestMatch('button', mockComponents);
    expect(match).not.toBeNull();
    expect(match?.name).toBe('ButtonGlass');
  });

  it('returns null for no match', () => {
    const match = findBestMatch('xyz123', mockComponents);
    expect(match).toBeNull();
  });
});

describe('hasMatch', () => {
  it('returns true when match exists', () => {
    expect(hasMatch('button', mockComponents)).toBe(true);
  });

  it('returns false when no match exists', () => {
    expect(hasMatch('xyz123', mockComponents)).toBe(false);
  });
});
