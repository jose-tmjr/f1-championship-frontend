import { BaseRepository } from "./BaseRepository";
import type { Driver } from "@/Interfaces/Driver";
import type { Race } from "@/Interfaces/Race";
import type { Result } from "@/Interfaces/Result";
import type { Team } from "@/Interfaces/Team";
import { CacheKeys } from "@/utils/CacheUtils";

class DriverRepository extends BaseRepository {

  constructor() {
    super();
  }

  async getDriversData(): Promise<Driver[]> {
    const cacheKey = CacheKeys.DRIVERS;

    const cachedDrivers = localStorage.getItem(cacheKey);

    if (cachedDrivers) {
      return JSON.parse(cachedDrivers) as Driver[];
    }

    try {
      const response = await this.get<Driver[]>('/load/drivers');
      localStorage.setItem(cacheKey, JSON.stringify(response));
      console.log('Drivers data loaded from API');
      return response;

    } catch (error) {
      console.error('Error loading drivers data: ', error);
      throw error;
    }
}

  async getTeamsData(): Promise<Team[]> {
    const cacheKey = CacheKeys.TEAMS;

    const cachedDrivers = localStorage.getItem(cacheKey);

    if (cachedDrivers) {
      return JSON.parse(cachedDrivers) as Team[];
    }

    try {
      const response = await this.get<Team[]>('/load/teams');
      localStorage.setItem(cacheKey, JSON.stringify(response));
      console.log('Team data loaded from API');
      return response;

    } catch (error) {
      console.error('Error loading team data: ', error);
      throw error;
    }
  }

  async getRacesData(): Promise<Race[]> {
    const cacheKey = CacheKeys.RACES;

    const cachedDrivers = localStorage.getItem(cacheKey);

    if (cachedDrivers) {
      return JSON.parse(cachedDrivers) as Race[];
    }

    try {
      const response = await this.get<Race[]>('/load/races');
      localStorage.setItem(cacheKey, JSON.stringify(response));
      console.log('Race data loaded from API');
      return response;

    } catch (error) {
      console.error('Error loading races data: ', error);
      throw error;
    }
  }

  async getResultsData(): Promise<Result[]> {
    const cacheKey = CacheKeys.RESULTS;

    const cachedDrivers = localStorage.getItem(cacheKey);

    if (cachedDrivers) {
      return JSON.parse(cachedDrivers) as Result[];
    }

    try {
      const response = await this.get<Result[]>('/load/results');
      localStorage.setItem(cacheKey, JSON.stringify(response));
      console.log('Result data loaded from API');
      return response;

    } catch (error) {
      console.error('Error loading results data: ', error);
      throw error;
    }
  }
}

export default new DriverRepository();
