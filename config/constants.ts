/**
 * Pagination configuration constants
 */
export const PAGINATION = {
  /** Default page size for paper lists */
  DEFAULT_PAGE_SIZE: 10,
  /** Maximum allowed page size */
  MAX_PAGE_SIZE: 50,
  /** Minimum page size */
  MIN_PAGE_SIZE: 1,
} as const;

/**
 * Cache TTL configuration (in milliseconds)
 */
export const CACHE = {
  /** Default cache TTL for API responses */
  DEFAULT_TTL: 5 * 60 * 1000, // 5 minutes
  /** Stale-while-revalidate duration */
  STALE_WHILE_REVALIDATE: 10 * 60 * 1000, // 10 minutes
} as const;

/**
 * Session configuration
 */
export const SESSION = {
  /** Session expiry in seconds */
  EXPIRES_IN: 60 * 60 * 24 * 7, // 7 days
  /** Update session after this duration (seconds) */
  UPDATE_AGE: 60 * 60 * 24, // 1 day
  /** Cookie cache duration (seconds) */
  COOKIE_CACHE_MAX_AGE: 5 * 60, // 5 minutes
} as const;
