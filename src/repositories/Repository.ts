import { BaseRepository } from "./BaseRepository";
import type { Driver } from "@/Interfaces/Driver";
import type { Race } from "@/Interfaces/Race";
import type { Result } from "@/Interfaces/Result";
import type { Team } from "@/Interfaces/Team";
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

  private async fetchAndCache<T>(resource: CacheKeys, season: string): Promise<T> {
    const cacheKey = `${resource}-${season}`;

    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
      return JSON.parse(cachedData) as T;
    }

    try {
      const response = await this.get<T>(`/load/${season}/${resource}`);
      localStorage.setItem(cacheKey, JSON.stringify(response));
      return response;
    } catch (error) {
      console.error(`Error loading ${resource} data: `, error);
      throw error;
    }
  }
}

export default new DriverRepository();
