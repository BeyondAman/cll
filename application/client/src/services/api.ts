import Axios, { AxiosInstance } from "axios";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
}

export interface VisitorCount {
  visited: number;
}

export class Api {
  private client: AxiosInstance;
  constructor(baseURL: string) {
    this.client = Axios.create({
      baseURL,
      timeout: 1500,
    });
  }

  public async getUsers(): Promise<User[]> {
    const res = await this.client.get("/getUsers");
    return res.data;
  }

  public async clearUsers(): Promise<User[]> {
    const res = await this.client.post("/clearUsers");
    return res.data;
  }

  public async makeUser(): Promise<User[]> {
    const res = await this.client.post("/makeUser");
    return res.data;
  }

  public async getVisited(): Promise<VisitorCount> {
    const res = await this.client.get("/getVisited");
    return res.data;
  }

  public async clearVisited(): Promise<VisitorCount> {
    const res = await this.client.post("/clearVisited");
    return res.data;
  }
}
