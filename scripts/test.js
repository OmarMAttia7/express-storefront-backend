const dotenv = require("dotenv");
const dbmigrate = require("db-migrate");
const Jasmine = require("jasmine");
/* 
Unfortunately jasmine needs it's own process to work correctly
so it's not possible to use the Jasmine API for this script,
instead, it's called in a child process with spawnSync
*/
dotenv.config();
process.env.ENV = "test";

async function main() {
  await createTestDB();
  await runUpMigrations();
  await runTests();
  await dropTestDB();
}

main();

// Create test database
async function createTestDB() {
  return await dbmigrate
    .getInstance(true)
    .createDatabase(process.env.TEST_DB_NAME);
}

// Run UP migrations
async function runUpMigrations() {
  await dbmigrate.getInstance(true, { env: "test" }).up();
}

// Run tests
async function runTests() {
  const jasmine = new Jasmine();
  jasmine.exitOnCompletion = false;
  jasmine.loadConfigFile("./spec/support/jasmine.json");

  return await jasmine.execute();
}

// Drop test database
async function dropTestDB() {
  return await dbmigrate
    .getInstance(true)
    .dropDatabase(process.env.TEST_DB_NAME);
}
