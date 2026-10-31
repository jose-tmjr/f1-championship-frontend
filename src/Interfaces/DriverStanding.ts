export interface DriverStanding {
  position: number;
  driver_id: number;
  driver_name: string;
  team_id: number;
  team_name: string;
  points: number;
  wins?: number;
  sprint_wins?: number;
  podiums?: number;
  races?: number;
}
