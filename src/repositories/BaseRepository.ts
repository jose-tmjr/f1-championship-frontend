import http from "@/api/http";

export abstract class BaseRepository {
  protected http = http;

  // constructor() {
  //   this.http.interceptors.request.use((config) => {
  //     config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
  //     return config;
  //   });
  // }

  protected async get<T>(url:string) {
    const response = await this.http.get<T>(url);
    return response.data;
  }

  protected async post<T>(url:string, data: any) {
    const response = await this.http.post<T>(url, data);
    return response.data;
  }

  protected async put<T>(url:string, data: any) {
    const response = await this.http.put<T>(url, data);
    return response.data;
  }

  protected async delete<T>(url:string) {
    const response = await this.http.delete<T>(url);
    return response.data;
  }
}
