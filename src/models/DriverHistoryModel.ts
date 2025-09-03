import type { Driver } from "@/Interfaces/Driver";
import type { Result } from "@/Interfaces/Result";
import type { Team } from "@/Interfaces/Team";
import {
  calculateDriverPodiums,
  calculateDriverPoles,
  calculateDriverWins,
} from "@/utils/DriversStats";

export default class DriverHistoryModel {
  driverId: number;
  driverName: string;
  driverTeamId: number;
  driverTeamName: string;
  driverPoles: number;
  driverWins: number;
  driverPodiums: number;

  constructor(driver: Driver, team: Team, results: Result[]) {
    if (driver.team_id !== team.team_id) {
      throw new Error("Driver and Team are not from the same team");
    }

    this.driverId = driver.driver_id;
    this.driverName = driver.driver_name;

    this.driverTeamId = team.team_id;
    this.driverTeamName = team.team_name;

    this.driverPoles = calculateDriverPoles(driver.driver_id, results);
    this.driverWins = calculateDriverWins(driver.driver_id, results);
    this.driverPodiums = calculateDriverPodiums(driver.driver_id, results);
  }
}
