export enum CacheKeys {
  DRIVERS = "drivers",
  TEAMS = "teams",
  RACES = "races",
  RESULTS = "results",
}

export const CacheExpiration = 1000 * 60 * 60 * 24; // 24 hours

export function clearCache() {
  localStorage.clear();
  location.reload();
}
