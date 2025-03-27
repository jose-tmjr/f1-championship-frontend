import type { Driver } from "@/Interfaces/Driver";
import type { Races } from "@/Interfaces/Races";
import type { Results } from "@/Interfaces/Results";
import type { Team } from "@/Interfaces/Teams";
import DataService from "./DataService";

export default abstract class BaseService {
  public driversData: Driver[] = [];
  public teamsData: Team[] = [];
  public racesData: Races[] = [];
  public resultsData: Results[] = [];

  static async create<T extends BaseService>(this: { new (): T }): Promise<T> {
    const instance = new this();  // Cria uma instância da classe filha
    const [drivers, teams, races, results] = await instance.loadData();

    instance.driversData = drivers;
    instance.teamsData = teams;
    instance.racesData = races;
    instance.resultsData = results;

    return instance;
  }

  private async loadData(): Promise<[Driver[], Team[], Races[], Results[]]> {
    return DataService.loadData();
  }
}
