import type { Team } from "@/Interfaces/Teams";
import type DriverModel from "./driverModel";

class ConstructorModel {
  teamId: number;
  teamName: string;
  driversName: string;
  points: number;

  constructor(team: Team, driverOne: DriverModel, driverTwo: DriverModel|undefined) {
    this.teamId = team.team_id;
    this.teamName = team.team_name;
    this.driversName = driverTwo ? driverOne.name + ' / ' + driverTwo.name : driverOne.name;
    this.points = driverOne.points + (driverTwo?.points || 0);
  }
}

export default ConstructorModel;
