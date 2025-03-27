import { BaseRepository } from "./BaseRepository";
import type { Driver } from "@/Interfaces/Driver";
import type { Races } from "@/Interfaces/Races";
import type { Results } from "@/Interfaces/Results";
import type { Team } from "@/Interfaces/Teams";

class DriverRepository extends BaseRepository {

  async getDriversData(): Promise<Driver[]> {
    return await this.get<Driver[]>('/load/drivers');
  }

  async getTeamsData(): Promise<Team[]> {
    return await this.get<Team[]>('/load/teams');
  }

  async getRacesData(): Promise<Races[]> {
    return await this.get<Races[]>('/load/races');
  }

  async getResultsData(): Promise<Results[]> {
    return await this.get<Results[]>('/load/results');
  }
}

export default new DriverRepository();
