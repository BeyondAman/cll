import "reflect-metadata";
import { Tedis } from "tedis";
import { createConnection } from "typeorm";
import { getConfig } from "./services/config";
import { server } from "./services/http";

async function main() {
  const config = await getConfig();
  const db = await createConnection(config.db);
  const redis = new Tedis(config.redis);
  const httpServer = await server(db, redis, config.server);
}

main().catch((e) => {
  console.error("Error starting server", e);
  process.exit(1);
});
