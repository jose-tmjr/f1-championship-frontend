import RaceResultsModel from "@/models/RaceResultsModel";
import BaseService from "./BaseService";
import type { Results } from "@/Interfaces/Results";
import DriverRaceResultModel from "@/models/DriverRaceResultModel";
import type { Driver } from "@/Interfaces/Driver";
import type { Team } from "@/Interfaces/Teams";

export default class RaceService extends BaseService{

  public async getRacesResults(): Promise<RaceResultsModel[]> {
    const raceResults: RaceResultsModel[] = [];

    this.racesData.map((race) => {
      const resultsFromRace: Results[] = this.resultsData.filter((result) => result.race_id === race.race_id);
      const driversRaceResults: DriverRaceResultModel[] = [];

      for(const result of resultsFromRace) {
        const driver: Driver|undefined = this.driversData.find((driver) => driver.driver_id === result.driver_id);
        if(!driver) continue;

        const team: Team|undefined = this.teamsData.find((team) => team.team_id === driver?.team_id);
        if(!team) continue;

        driversRaceResults.push(new DriverRaceResultModel(driver, team, result, race));
      }


      raceResults.push(new RaceResultsModel(race, driversRaceResults));

    });

    return raceResults;
  }
};
