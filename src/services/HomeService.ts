import DriverModel from "@/models/driverModel";
import type { Races } from "@/Interfaces/Races";
import type { Results } from "@/Interfaces/Results";
import { calculateRacePoint } from "@/utils/ScorePoints";
import ConstructorModel from "@/models/constructorModel";
import BaseService from "./BaseService";

export default class HomeService extends BaseService {

  public async getHomeData(): Promise<{ drivers: DriverModel[]; constructors: ConstructorModel[] }> {
    const drivers = await this.getDrivers();
    const constructors = await this.getConstructors(drivers);

    return { drivers, constructors };
  }

  /// This method is responsible to get all drivers and calculate the points for each driver
  private async getDrivers(): Promise<DriverModel[]> {
    const drivers: DriverModel[] = this.driversData.map((driver)  => {
      // Get the points for the driver
      // To get points i need to read all registers in results from the driver
      // verify in races linked by results using race_id to verify if that race is sprint or not
      // after it, i need to get the correclty points for the driver (races e sprint has different points)
      // and sum all points to get the total points for the driver
      const points: number = this.racesData.map((race) => {
          const result = this.resultsData
            .filter((result) => result.driver_id === driver.driver_id)
            .find((result) => result.race_id === race.race_id);

          return calculateRacePoint(race, result);
      }).reduce((acc, curr) => acc + curr, 0);

      const driverTeam = this.teamsData.find((team) => team.team_id === driver.team_id);

      return new DriverModel(driver, driverTeam, points);
    });

    return drivers.sort((a, b) => b.points - a.points);
  }

  /// This method is very similar to getDrivers, but it's for constructors
  private async getConstructors(driversResults: DriverModel[]): Promise<ConstructorModel[]> {
    const constructors: ConstructorModel[] = [];

    this.teamsData.map((team) => {
      const driversTeam = driversResults.filter((driver) => driver.teamId === team.team_id);
      constructors.push(new ConstructorModel(team, driversTeam[0], driversTeam.length > 1 ? driversTeam[1] : undefined));
    });

    return constructors.sort((a, b) => b.points - a.points);
  }
}
