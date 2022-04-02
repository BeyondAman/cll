import { getConnectionOptions } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

export interface AppConfig {
  redis: RedisConfig;
  server: ServerConfig;
  db: PostgresConnectionOptions;
}

export interface ServerConfig {
  port: number;
}

interface RedisConfig {
  host: string;
  port: number;
  password: string;
}

type Writeable<T> = { -readonly [P in keyof T]: T[P] };
type MutablePGConnectionOpts = Writeable<PostgresConnectionOptions>;

export async function getConfig(): Promise<AppConfig> {
  return {
    redis: {
      host: process.env.REDIS_HOST || "localhost",
      port: parseInt(process.env.REDIS_PORT) || 6379,
      password: process.env.REDIS_PASSWORD,
    },
    server: {
      port: parseInt(process.env.PORT) || 3030,
    },
    db: await getDbConfig(),
  };
}

async function getDbConfig(): Promise<PostgresConnectionOptions> {
  const connectionOptions = (await getConnectionOptions()) as MutablePGConnectionOpts;
  const overridableOptions = [
    "host",
    "username",
    "password",
    "database",
    "port",
  ] as const;

  for (const overridableOption of overridableOptions) {
    const envKey = `TYPEORM_${overridableOption.toUpperCase()}`;
    const envVal = process.env[envKey];
    if (envVal) {
      if (overridableOption === "port") {
        connectionOptions[overridableOption] = parseInt(process.env[envKey]);
      } else {
        connectionOptions[overridableOption] = process.env[envKey];
      }
    }
  }

  return connectionOptions;
}
