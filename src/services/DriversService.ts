import type { Team } from "@/Interfaces/Team";
import BaseService from "./BaseService";
import DriverHistoryModel from "@/models/DriverHistoryModel";

export default class DriversService extends BaseService {
  public async getDriversResults(): Promise<DriverHistoryModel[]> {
    const driverResults: DriverHistoryModel[] = [];

    this.driversData.map((driver) => {
      const team: Team | undefined = this.teamsData.find(
        (team) => team.team_id === driver?.team_id
      );

      driverResults.push(new DriverHistoryModel(driver, team!, this.resultsData));
    });

    driverResults.sort((a, b) => a.driverTeamId - b.driverTeamId);

    return driverResults;
  }
}
