import app from "./app";
import env from "./utils/env";
import normalizePort from "./utils/normalizePort";
// @ts-ignore
import dbmigrate from "db-migrate";
import seed from "./utils/seed";

const port = normalizePort(env("APP_PORT"), 8080);

const address = `0.0.0.0:${port}`;

app.listen(port, async function () {
  await dbmigrate.getInstance(true, { env: env("ENV") }).up();
  await seed().catch(() => console.log("DB already seeded, no need to seed."));
  console.log(`starting app on ${address}`);
});
