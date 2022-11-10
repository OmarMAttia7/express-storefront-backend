import app from "./app";
import env from "./utils/env";
import normalizePort from "./utils/normalizePort";

const port = normalizePort(env("APP_PORT"), 3000);

const address = `0.0.0.0:${port}`;

app.listen(port, function () {
  console.log(`starting app on ${address}`);
});
