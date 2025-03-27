import type { Driver } from "@/Interfaces/Driver";
import type { Team } from "@/Interfaces/Teams";
import DriverModel from "@/models/driverModel";
import type { Races } from "@/Interfaces/Races";
import type { Results } from "@/Interfaces/Results";
import Scores from "@/utils/ScorePoints";
import DataService from "./DataService";

export default class HomeService {
  public driversData: Driver[] = [];
  public teamsData: Team[] = [];
  public racesData: Races[] = [];
  public resultsData: Results[] = [];

  static async create(): Promise<HomeService> {
    const instance = new HomeService();
    const [drivers, teams, races, results] = await instance.loadData();

    instance.driversData = drivers;
    instance.teamsData = teams;
    instance.racesData = races;
    instance.resultsData = results;

    return instance;
  }

  private async loadData(): Promise<[Driver[], Team[], Races[], Results[]]> {
    return DataService.loadData();
  }

  async getDrivers(): Promise<DriverModel[]> {
    let drivers: DriverModel[];

    drivers = this.driversData.map((driver)  => {
      let points: number;
      let teamName: string;

      // Get the points for the driver
      // To get points i need to read all registers in results from the driver
      // verify in races linked by results using race_id to verify if that race is sprint or not
      // after it, i need to get the correclty points for the driver (races e sprint has different points)
      // and sum all points to get the total points for the driver
      points = this.racesData.map((race) => {
          const result = this.resultsData
            .filter((result) => result.driver_id === driver.driver_id)
            .find((result) => result.race_id === race.race_id);

          return this.calculateRacePoint(race, result);
      }).reduce((acc, curr) => acc + curr, 0);

      teamName = this.teamsData.find((team) => team.team_id === driver.team_id)?.team_name || "Unknown";

      return new DriverModel(driver, teamName, points);
    });

    return drivers.sort((a, b) => b.points - a.points);
  }

  private calculateRacePoint(race: Races, result: Results|undefined): number {
    if(!result) return 0;

    const score = Scores.find(
      (score) => score.position === result.driver_final_position && score.is_sprint === race.is_sprint
    );

    return score?.points || 0;
  }
}
