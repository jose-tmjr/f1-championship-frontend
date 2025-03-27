import type { Driver } from "@/Interfaces/Driver";
import type { Races } from "@/Interfaces/Races";
import type { Results } from "@/Interfaces/Results";
import type { Team } from "@/Interfaces/Teams";
import Repository from "@/repositories/Repository";

class DataService {
  public async loadData(): Promise<[Driver[], Team[], Races[], Results[]]> {
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

  private async loadRaces(): Promise<Races[]> {
    return await Repository.getRacesData();
  }

  private async loadResults(): Promise<Results[]> {
    return await Repository.getResultsData();
  }
}

export default new DataService();
