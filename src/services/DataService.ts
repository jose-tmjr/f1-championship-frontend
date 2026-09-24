import type { Driver } from "@/Interfaces/Driver";
import type { Race } from "@/Interfaces/Race";
import type { Result } from "@/Interfaces/Result";
import type { Team } from "@/Interfaces/Team";
import Repository from "@/repositories/Repository";
import { selectedSeason } from "@/stores/SeasonStore";

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
    return await Repository.getDriversData(this.getSeason());
  }

  private async loadTeams(): Promise<Team[]> {
    return await Repository.getTeamsData(this.getSeason());
  }

  private async loadRaces(): Promise<Race[]> {
    return await Repository.getRacesData(this.getSeason());
  }

  private async loadResults(): Promise<Result[]> {
    return await Repository.getResultsData(this.getSeason());
  }

  private getSeason(): string {
    return String(selectedSeason.value);
  }
}
export default new DataService();
