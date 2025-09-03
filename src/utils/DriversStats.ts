import type { Result } from "@/Interfaces/Result";

export function calculateDriverPoles(driverId: number, results: Result[]): number {
  return results.filter(
    (result) => result.driver_id === driverId && result.driver_start_position === 1
  ).length;
}

export function calculateDriverWins(driverId: number, results: Result[]): number {
  return results.filter(
    (result) => result.driver_id === driverId && result.driver_final_position === 1
  ).length;
}

export function calculateDriverPodiums(driverId: number, results: Result[]): number {
  return results.filter(
    (result) =>
      result.driver_id === driverId &&
      (result.driver_final_position === 1 ||
        result.driver_final_position === 2 ||
        result.driver_final_position === 3)
  ).length;
}
