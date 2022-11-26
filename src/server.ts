import app from "./app";
import env from "./utils/env";
import normalizePort from "./utils/normalizePort";
// @ts-expect-error
import dbmigrate from "db-migrate";
import seed from "./utils/seed";

const port = normalizePort(env("APP_PORT"), 8080);

const address = `0.0.0.0:${port}`;

app.listen(port, async function () {
  await dbmigrate
    .getInstance(true, { env: env("ENV") })
    .up()
    .catch((e: string) => console.log(`Could not connect to database.\n${e}`));
  await seed().catch(() => console.log("DB already seeded, no need to seed."));
  console.log(`starting app on ${address}`);
});
