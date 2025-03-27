import type { Driver } from "@/Interfaces/Driver";
import type { Race } from "@/Interfaces/Race";
import type { Result } from "@/Interfaces/Result";
import type { Team } from "@/Interfaces/Team";
import Repository from "@/repositories/Repository";

class DataService {
  public async loadData(): Promise<[Driver[], Team[], Race[], Result[]]> {
    return await Promise.all([
      this.loadDrivers(),
      this.loadTeams(),
      this.loadRaces(),
      this.loadResults(),
    ]);
  }

  private async loadDrivers(): Promise<Driver[]> {
    return await Repository.getDriversData();
  }

  private async loadTeams(): Promise<Team[]> {
    return await Repository.getTeamsData();
  }

  private async loadRaces(): Promise<Race[]> {
    return await Repository.getRacesData();
  }

  private async loadResults(): Promise<Result[]> {
    return await Repository.getResultsData();
  }
}

export default new DataService();
