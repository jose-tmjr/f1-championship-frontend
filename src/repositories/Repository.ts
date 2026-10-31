import { BaseRepository } from "./BaseRepository";
import type { Driver } from "@/Interfaces/Driver";
import type { DriverStanding } from "@/Interfaces/DriverStanding";
import type { Race } from "@/Interfaces/Race";
import type { Result } from "@/Interfaces/Result";
import type { Team } from "@/Interfaces/Team";
import type { TeamStanding } from "@/Interfaces/TeamStanding";
import { CacheKeys } from "@/utils/CacheUtils";

class DriverRepository extends BaseRepository {
  async getDriversData(season: string): Promise<Driver[]> {
    return this.fetchAndCache(CacheKeys.DRIVERS, season);
  }

  async getTeamsData(season: string): Promise<Team[]> {
    return this.fetchAndCache(CacheKeys.TEAMS, season);
  }

  async getRacesData(season: string): Promise<Race[]> {
    return this.fetchAndCache(CacheKeys.RACES, season);
  }

  async getResultsData(season: string): Promise<Result[]> {
    return this.fetchAndCache(CacheKeys.RESULTS, season);
  }

  async getDriverStandingsData(season: string): Promise<DriverStanding[]> {
    const cacheKey = `${CacheKeys.STANDINGS_DRIVERS}-${season}`;

    try {
      const response = await this.get<DriverStanding[]>(`/load/${season}/standings/drivers`);
      localStorage.setItem(cacheKey, JSON.stringify(response));
      return response;
    } catch (error) {
      console.error(`Error loading driver standings data: `, error);

      const cachedData = localStorage.getItem(cacheKey);

      if (cachedData) {
        return JSON.parse(cachedData) as DriverStanding[];
      }

      throw error;
    }
  }

  async getTeamStandingsData(season: string): Promise<TeamStanding[]> {
    const cacheKey = `${CacheKeys.STANDINGS_TEAMS}-${season}`;

    try {
      const response = await this.get<TeamStanding[]>(`/load/${season}/standings/teams`);
      localStorage.setItem(cacheKey, JSON.stringify(response));
      return response;
    } catch (error) {
      console.error(`Error loading team standings data: `, error);

      const cachedData = localStorage.getItem(cacheKey);

      if (cachedData) {
        return JSON.parse(cachedData) as TeamStanding[];
      }

      throw error;
    }
  }

  private async fetchAndCache<T>(resource: CacheKeys, season: string): Promise<T> {
    const cacheKey = `${resource}-${season}`;

    try {
      const response = await this.get<T>(`/load/${season}/${resource}`);
      localStorage.setItem(cacheKey, JSON.stringify(response));
      return response;
    } catch (error) {
      console.error(`Error loading ${resource} data: `, error);

      const cachedData = localStorage.getItem(cacheKey);

      if (cachedData) {
        return JSON.parse(cachedData) as T;
      }

      throw error;
    }
  }
}

export default new DriverRepository();
