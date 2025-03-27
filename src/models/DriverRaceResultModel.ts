import type { Driver } from "@/Interfaces/Driver";
import type { Races } from "@/Interfaces/Races";
import type { Results } from "@/Interfaces/Results";
import type { Team } from "@/Interfaces/Teams";
import { calculateRacePoint } from "@/utils/ScorePoints";

export default class DriverRaceResultModel {
  driverId: number;
  driverName: string;
  driverTeamId: number;
  driverTeamName: string;
  driverFastestLap: string;
  driverStartPosition: number;
  driverFinalPosition: number;
  points: number;
  gridResult: number;

  constructor(driver: Driver, team: Team, result: Results, race: Races) {

    if (driver.team_id !== team.team_id) {
      throw new Error('Driver and Team are not from the same team');
    }

    this.driverId = driver.driver_id;
    this.driverName = driver.driver_name;

    this.driverTeamId = team.team_id;
    this.driverTeamName = team.team_name;

    this.driverFastestLap = result.driver_fastest_lap;
    this.driverStartPosition = result.driver_start_position;
    this.driverFinalPosition = result.driver_final_position;
    this.gridResult = result.grid_result;
    this.points = calculateRacePoint(race, result);

  }
}
