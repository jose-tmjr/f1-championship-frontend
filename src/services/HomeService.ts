import DriverModel from "@/models/driverModel";
import ConstructorModel from "@/models/constructorModel";
import type { DriverStanding } from "@/Interfaces/DriverStanding";
import type { TeamStanding } from "@/Interfaces/TeamStanding";
import Repository from "@/repositories/Repository";
import { selectedSeason } from "@/stores/SeasonStore";

export default class HomeService {
  public async getHomeData(): Promise<{
    drivers: DriverModel[];
    constructors: ConstructorModel[];
  }> {
    const season = String(selectedSeason.value);

    const [driverStandings, teamStandings] = await Promise.all([
      Repository.getDriverStandingsData(season),
      Repository.getTeamStandingsData(season),
    ]);

    const driversByTeam = new Map<number, string[]>();
    for (const d of driverStandings) {
      const names = driversByTeam.get(d.team_id) || [];
      names.push(d.driver_name);
      driversByTeam.set(d.team_id, names);
    }

    const drivers = driverStandings.map((standing) => new DriverModelStanding(standing));

    const constructors = teamStandings.map((standing) => {
      const driverNames = driversByTeam.get(standing.team_id) || [];
      return new ConstructorModelStanding(standing, driverNames);
    });

    return { drivers, constructors };
  }
}

class DriverModelStanding extends DriverModel {
  constructor(standing: DriverStanding) {
    super(
      {
        driver_id: standing.driver_id,
        driver_name: standing.driver_name,
        team_id: standing.team_id,
      },
      { team_id: standing.team_id, team_name: standing.team_name },
      standing.points,
    );
  }
}

class ConstructorModelStanding extends ConstructorModel {
  constructor(standing: TeamStanding, driverNames: string[]) {
    const driverOne = new DriverModelStanding({
      position: standing.position,
      driver_id: 0,
      driver_name: driverNames[0] || "",
      team_id: standing.team_id,
      team_name: standing.team_name,
      points: standing.points,
    });

    const driverTwo =
      driverNames.length > 1
        ? new DriverModelStanding({
            position: standing.position,
            driver_id: 0,
            driver_name: driverNames[1],
            team_id: standing.team_id,
            team_name: standing.team_name,
            points: standing.points,
          })
        : undefined;

    super({ team_id: standing.team_id, team_name: standing.team_name }, driverOne, driverTwo);
  }
}
