import type { Race } from "@/Interfaces/Race";
import type DriverRaceResultModel from "./DriverRaceResultModel";

class RaceResultsModel {
  raceId: number;
  isSprint: boolean;
  raceDate: string;
  raceLocation: string;
  raceName: string;
  driverResults: DriverRaceResultModel[];

  constructor(race: Race, driverResults: DriverRaceResultModel[]) {
    this.raceId = race.race_id;
    this.isSprint = race.is_sprint;
    this.raceDate = race.race_date;
    this.raceLocation = race.race_location;
    this.raceName = race.race_name;
    this.driverResults = driverResults.sort(
      (a, b) => a.driverFinalPosition - b.driverFinalPosition
    );
  }
}

  export default RaceResultsModel;
