import { BaseRepository } from "./BaseRepository";
import type { Driver } from "@/Interfaces/Driver";
import type { Races } from "@/Interfaces/Races";
import type { Results } from "@/Interfaces/Results";
import type { Team } from "@/Interfaces/Teams";
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

  async getRacesData(): Promise<Races[]> {
    const cacheKey = CacheKeys.RACES;

    const cachedDrivers = localStorage.getItem(cacheKey);

    if (cachedDrivers) {
      return JSON.parse(cachedDrivers) as Races[];
    }

    try {
      const response = await this.get<Races[]>('/load/races');
      localStorage.setItem(cacheKey, JSON.stringify(response));
      console.log('Races data loaded from API');
      return response;

    } catch (error) {
      console.error('Error loading races data: ', error);
      throw error;
    }
  }

  async getResultsData(): Promise<Results[]> {
    const cacheKey = CacheKeys.RESULTS;

    const cachedDrivers = localStorage.getItem(cacheKey);

    if (cachedDrivers) {
      return JSON.parse(cachedDrivers) as Results[];
    }

    try {
      const response = await this.get<Results[]>('/load/results');
      localStorage.setItem(cacheKey, JSON.stringify(response));
      console.log('Results data loaded from API');
      return response;

    } catch (error) {
      console.error('Error loading results data: ', error);
      throw error;
    }
  }
}

export default new DriverRepository();
