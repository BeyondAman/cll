describe("config tests", () => {
  describe("getConfig", () => {
    let env: string;
    let getConfig: typeof import("./config").getConfig;
    beforeAll(() => {
      env = JSON.stringify(process.env);
    });
    beforeEach(async () => {
      jest.resetModules();
      getConfig = await import("./config").then((c) => c.getConfig);
    });
    afterEach(() => {
      process.env = JSON.parse(env);
    });
    describe("redis", () => {
      it("should have a default config", async () => {
        const config = await getConfig();
        expect(config.redis).toMatchInlineSnapshot(`
          Object {
            "host": "localhost",
            "password": undefined,
            "port": 6379,
          }
        `);
      });
      it("should allow modifications to host", async () => {
        process.env.REDIS_HOST = "foo";
        const config = await getConfig();
        expect(config.redis).toMatchInlineSnapshot(`
          Object {
            "host": "foo",
            "password": undefined,
            "port": 6379,
          }
        `);
      });
      it("should allow modifications to port", async () => {
        process.env.REDIS_PORT = "1337";
        const config = await getConfig();
        expect(config.redis).toMatchInlineSnapshot(`
          Object {
            "host": "localhost",
            "password": undefined,
            "port": 1337,
          }
        `);
      });
      it("should allow modifications to password", async () => {
        process.env.REDIS_PASSWORD = "bestpassever";
        const config = await getConfig();
        expect(config.redis).toMatchInlineSnapshot(`
          Object {
            "host": "localhost",
            "password": "bestpassever",
            "port": 6379,
          }
        `);
      });
    });

    describe("db", () => {
      it("should have a default config", async () => {
        const config = await getConfig();
        expect(config.db).toMatchInlineSnapshot(`
          Object {
            "cli": Object {
              "entitiesDir": "src/entity",
              "migrationsDir": "src/migration",
              "subscribersDir": "src/subscriber",
            },
            "database": "pgdb",
            "entities": Array [
              "src/entity/**/*.ts",
            ],
            "host": "localhost",
            "logging": false,
            "migrations": Array [
              "src/migration/**/*.ts",
            ],
            "password": "pgpass",
            "port": 5432,
            "subscribers": Array [
              "src/subscriber/**/*.ts",
            ],
            "synchronize": true,
            "type": "postgres",
            "username": "pguser",
          }
        `);
      });
      it("should allow modifications to host", async () => {
        process.env.TYPEORM_HOST = "foo";
        const config = await getConfig();
        expect(config.db).toMatchInlineSnapshot(`
          Object {
            "cli": Object {
              "entitiesDir": "src/entity",
              "migrationsDir": "src/migration",
              "subscribersDir": "src/subscriber",
            },
            "database": "pgdb",
            "entities": Array [
              "src/entity/**/*.ts",
            ],
            "host": "foo",
            "logging": false,
            "migrations": Array [
              "src/migration/**/*.ts",
            ],
            "password": "pgpass",
            "port": 5432,
            "subscribers": Array [
              "src/subscriber/**/*.ts",
            ],
            "synchronize": true,
            "type": "postgres",
            "username": "pguser",
          }
        `);
      });
      it("should allow modifications to username", async () => {
        process.env.TYPEORM_USERNAME = "runey886";
        const config = await getConfig();
        expect(config.db).toMatchInlineSnapshot(`
          Object {
            "cli": Object {
              "entitiesDir": "src/entity",
              "migrationsDir": "src/migration",
              "subscribersDir": "src/subscriber",
            },
            "database": "pgdb",
            "entities": Array [
              "src/entity/**/*.ts",
            ],
            "host": "localhost",
            "logging": false,
            "migrations": Array [
              "src/migration/**/*.ts",
            ],
            "password": "pgpass",
            "port": 5432,
            "subscribers": Array [
              "src/subscriber/**/*.ts",
            ],
            "synchronize": true,
            "type": "postgres",
            "username": "runey886",
          }
        `);
      });
      it("should allow modifications to password", async () => {
        process.env.TYPEORM_PASSWORD = "hunter2";
        const config = await getConfig();
        expect(config.db).toMatchInlineSnapshot(`
          Object {
            "cli": Object {
              "entitiesDir": "src/entity",
              "migrationsDir": "src/migration",
              "subscribersDir": "src/subscriber",
            },
            "database": "pgdb",
            "entities": Array [
              "src/entity/**/*.ts",
            ],
            "host": "localhost",
            "logging": false,
            "migrations": Array [
              "src/migration/**/*.ts",
            ],
            "password": "hunter2",
            "port": 5432,
            "subscribers": Array [
              "src/subscriber/**/*.ts",
            ],
            "synchronize": true,
            "type": "postgres",
            "username": "pguser",
          }
        `);
      });
      it("should allow modifications to database", async () => {
        process.env.TYPEORM_DATABASE = "myfirstdb";
        const config = await getConfig();
        expect(config.db).toMatchInlineSnapshot(`
          Object {
            "cli": Object {
              "entitiesDir": "src/entity",
              "migrationsDir": "src/migration",
              "subscribersDir": "src/subscriber",
            },
            "database": "myfirstdb",
            "entities": Array [
              "src/entity/**/*.ts",
            ],
            "host": "localhost",
            "logging": false,
            "migrations": Array [
              "src/migration/**/*.ts",
            ],
            "password": "pgpass",
            "port": 5432,
            "subscribers": Array [
              "src/subscriber/**/*.ts",
            ],
            "synchronize": true,
            "type": "postgres",
            "username": "pguser",
          }
        `);
      });
      it("should allow modifications to port", async () => {
        process.env.TYPEORM_PORT = "8080";
        const config = await getConfig();
        expect(config.db).toMatchInlineSnapshot(`
          Object {
            "cli": Object {
              "entitiesDir": "src/entity",
              "migrationsDir": "src/migration",
              "subscribersDir": "src/subscriber",
            },
            "database": "pgdb",
            "entities": Array [
              "src/entity/**/*.ts",
            ],
            "host": "localhost",
            "logging": false,
            "migrations": Array [
              "src/migration/**/*.ts",
            ],
            "password": "pgpass",
            "port": 8080,
            "subscribers": Array [
              "src/subscriber/**/*.ts",
            ],
            "synchronize": true,
            "type": "postgres",
            "username": "pguser",
          }
        `);
      });
    });

    describe("server", () => {
      it("should have a default config", async () => {
        const config = await getConfig();
        expect(config.server).toMatchInlineSnapshot(`
          Object {
            "port": 3030,
          }
        `);
      });
      it("should allow modifications to port", async () => {
        process.env.PORT = "1337";
        const config = await getConfig();
        expect(config.server).toMatchInlineSnapshot(`
          Object {
            "port": 1337,
          }
        `);
      });
    });
  });
});
