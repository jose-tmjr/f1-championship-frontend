import type { Driver } from "@/Interfaces/Driver";

class DriverModel {
  id: number;
  name: string;
  teamName: string;
  points: number;

  constructor(driver: Driver, teamName: string, points: number) {
    this.id = driver.driver_id;
    this.name = driver.driver_name;
    this.teamName = teamName;
    this.points = points;
  }
}

export default DriverModel;
