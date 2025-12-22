/**
 * Repository Card Utilities
 * Helper functions for repository card sub-components
 */

/**
 * Get contribution badge color based on percentage
 * 0-25%: rose (low), 26-50%: amber (moderate), 51-75%: blue (good), 76-100%: emerald (excellent)
 */
export function getContributionBadgeVariant(
  percent: number
): 'destructive' | 'warning' | 'default' | 'success' {
  if (percent <= 25) return 'destructive';
  if (percent <= 50) return 'warning';
  if (percent <= 75) return 'default';
  return 'success';
}

/**
 * Get activity status based on last activity date
 * active (<7 days), recent (<30 days), stale (<90 days), inactive (>90 days)
 */
export type ActivityStatusType = 'active' | 'recent' | 'stale' | 'inactive';

export function getActivityStatus(lastActivityDate: string | Date): ActivityStatusType {
  const now = new Date();
  const lastActivity = new Date(lastActivityDate);
  const diffDays = Math.floor((now.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays < 7) return 'active';
  if (diffDays < 30) return 'recent';
  if (diffDays < 90) return 'stale';
  return 'inactive';
}

/**
 * Get activity status display info
 */
export function getActivityStatusInfo(status: ActivityStatusType): {
  label: string;
  variant: 'success' | 'info' | 'warning' | 'destructive';
} {
  switch (status) {
    case 'active':
      return { label: 'Active', variant: 'success' };
    case 'recent':
      return { label: 'Recent', variant: 'info' };
    case 'stale':
      return { label: 'Stale', variant: 'warning' };
    case 'inactive':
      return { label: 'Inactive', variant: 'destructive' };
  }
}

/**
 * Contributor role types
 */
export type ContributorRole = 'owner' | 'lead' | 'core' | 'contributor' | 'maintainer';

/**
 * Get role badge variant based on role
 */
export function getRoleBadgeVariant(
  role: ContributorRole
): 'default' | 'secondary' | 'outline' | 'success' | 'warning' {
  switch (role) {
    case 'owner':
      return 'success';
    case 'lead':
      return 'success';
    case 'core':
      return 'default';
    case 'maintainer':
      return 'warning';
    case 'contributor':
      return 'secondary';
    default:
      return 'outline';
  }
}

/**
 * Get role display label
 */
export function getRoleLabel(role: ContributorRole): string {
  switch (role) {
    case 'owner':
      return 'Owner';
    case 'lead':
      return 'Lead';
    case 'core':
      return 'Core';
    case 'maintainer':
      return 'Maintainer';
    case 'contributor':
      return 'Contributor';
    default:
      return role;
  }
}

/**
 * Repository health status types
 */
export type HealthStatusType = 'healthy' | 'maintenance' | 'stale' | 'archived';

/**
 * Get health status based on push date and archive status
 * healthy (<90 days), maintenance (<365 days), stale (>365 days), archived
 */
export function getHealthStatus(
  pushedAt: string | Date,
  isArchived: boolean = false
): HealthStatusType {
  if (isArchived) return 'archived';

  const now = new Date();
  const lastPush = new Date(pushedAt);
  const diffDays = Math.floor((now.getTime() - lastPush.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays < 90) return 'healthy';
  if (diffDays < 365) return 'maintenance';
  return 'stale';
}

/**
 * Get health status display info
 */
export function getHealthStatusInfo(status: HealthStatusType): {
  label: string;
  variant: 'success' | 'info' | 'warning' | 'destructive' | 'secondary';
} {
  switch (status) {
    case 'healthy':
      return { label: 'Healthy', variant: 'success' };
    case 'maintenance':
      return { label: 'Maintenance', variant: 'warning' };
    case 'stale':
      return { label: 'Stale', variant: 'destructive' };
    case 'archived':
      return { label: 'Archived', variant: 'secondary' };
  }
}

/**
 * Format number with suffix (e.g., 1.2k, 3.4M)
 */
export function formatNumberWithSuffix(num: number): string {
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1)}M`;
  }
  if (num >= 1_000) {
    return `${(num / 1_000).toFixed(1)}k`;
  }
  return String(num);
}

/**
 * Calculate contribution percentage
 */
export function calculateContributionPercent(userValue: number, totalValue: number): number {
  if (totalValue === 0) return 0;
  return Math.round((userValue / totalValue) * 100);
}

/**
 * Team member interface
 */
export interface TeamMember {
  id: string;
  name: string;
  avatar?: string;
  role?: ContributorRole;
}

/**
 * Default language colors (matching GitHub language colors)
 */
export const DEFAULT_LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  Java: '#b07219',
  Go: '#00ADD8',
  Rust: '#dea584',
  Ruby: '#701516',
  PHP: '#4F5D95',
  'C++': '#f34b7d',
  C: '#555555',
  'C#': '#178600',
  Swift: '#ffac45',
  Kotlin: '#A97BFF',
  Scala: '#c22d40',
  HTML: '#e34c26',
  CSS: '#563d7c',
  SCSS: '#c6538c',
  Shell: '#89e051',
  Vue: '#41b883',
  Svelte: '#ff3e00',
  Dart: '#00B4AB',
  Elixir: '#6e4a7e',
  Haskell: '#5e5086',
  Lua: '#000080',
  R: '#198CE7',
  MATLAB: '#e16737',
  Perl: '#0298c3',
  Objective_C: '#438eff',
  Assembly: '#6E4C13',
  Markdown: '#083fa1',
  JSON: '#292929',
  YAML: '#cb171e',
};

/**
 * Get language color (default if not found)
 */
export function getLanguageColor(language: string, customColor?: string): string {
  if (customColor) return customColor;
  return DEFAULT_LANGUAGE_COLORS[language] || '#8b8b8b';
}
