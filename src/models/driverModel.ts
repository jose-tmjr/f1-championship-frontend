import type { Driver } from "@/Interfaces/Driver.interface";
import type { Team } from "@/Interfaces/Team.interface";

class DriverModel {
  id: number;
  name: string;
  teamName: string;
  teamId: number;
  points: number;

  constructor(driver: Driver, team: Team|undefined, points: number) {
    this.id = driver.driver_id;
    this.name = driver.driver_name;
    this.teamName = team?.team_name || 'not defined';
    this.teamId = team?.team_id || 0;
    this.points = points;
  }
}

export default DriverModel;
