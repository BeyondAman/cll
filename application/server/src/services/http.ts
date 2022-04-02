import * as cors from "cors";
import * as express from "express";
import { Server } from "http";
import * as morgan from 'morgan';
import * as randomName from "node-random-name";
import { Tedis } from "tedis";
import { Connection } from "typeorm";
import { User } from "../entity/User";
import { ServerConfig } from "./config";

export function server(
  db: Connection,
  redis: Tedis,
  config: ServerConfig
): Promise<Server> {
  const app = express();
  app.use(cors());
  app.use(morgan('combined'))

  app.post("/clearUsers", async (_, res) => {
    await db.manager.clear(User);
    res.json([]);
  });

  app.get("/getUsers", async (_, res) => {
    const users = await db.manager.find(User);
    res.json(users);
  });

  app.post("/makeUser", async (_, res) => {
    const user = new User();
    user.firstName = randomName({ first: true });
    user.lastName = randomName({ last: true });
    user.age = Math.floor(Math.random() * 100 + 1);
    await db.manager.save(user);
    const users = await db.manager.find(User);
    res.json(users);
  });

  app.get("/getVisited", async (_, res) => {
    const visited = await redis.incr("visitors");
    res.json({ visited });
  });

  app.post("/clearVisited", async (_, res) => {
    await redis.getset("visitors", "0");
    res.json({ visited: 0 });
  });

  return new Promise((resolve) => {
    const server = app.listen(config.port, () => {
      console.log(`App listening on port ${config.port}`);
      resolve(server);
    });
  });
}
