export enum CacheKeys {
  DRIVERS = "drivers",
  TEAMS = "teams",
  RACES = "races",
  RESULTS = "results",
}

export const CacheExpiration = 1000 * 60 * 60 * 24; // 24 hours

export function clearCache() {
  const dataCachePrefixes = Object.values(CacheKeys);
  const keysToRemove = Object.keys(localStorage).filter((key) =>
    dataCachePrefixes.some((prefix) => key.startsWith(prefix))
  );

  keysToRemove.forEach((key) => localStorage.removeItem(key));
}
