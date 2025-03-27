import type { Driver } from "@/Interfaces/Driver";
import type { Race } from "@/Interfaces/Race";
import type { Result } from "@/Interfaces/Result";
import type { Team } from "@/Interfaces/Team";
import DataService from "./DataService";

export default abstract class BaseService {
  public driversData: Driver[] = [];
  public teamsData: Team[] = [];
  public racesData: Race[] = [];
  public resultsData: Result[] = [];

  static async create<T extends BaseService>(this: { new (): T }): Promise<T> {
    const instance = new this();  // Cria uma instância da classe filha
    const [drivers, teams, races, results] = await instance.loadData();

    instance.driversData = drivers;
    instance.teamsData = teams;
    instance.racesData = races;
    instance.resultsData = results;

    return instance;
  }

  private async loadData(): Promise<[Driver[], Team[], Race[], Result[]]> {
    return DataService.loadData();
  }
}
