import Repository from "@/repositories/Repository";
import type { Driver } from "@/Interfaces/Driver";

class HomeService {
  async getDrivers(): Promise<Driver[]> {
    return await Repository.getDriversData();
  }
}

export default new HomeService();
