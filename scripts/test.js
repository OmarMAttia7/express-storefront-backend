const dotenv = require("dotenv");
const dbmigrate = require('db-migrate');
const { runScript } = require("./script_utils");
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
  return await dbmigrate.getInstance(true).createDatabase(process.env.TEST_DB_NAME);
}

// Run UP migrations
async function runUpMigrations() {
  return await dbmigrate.getInstance(true, {env: "test"}).up();
}

// Run tests
async function runTests() {
  runScript({
    script: "node_modules/.bin/jasmine"
  });
}

// Drop test database
async function dropTestDB() {
  return await dbmigrate.getInstance(true).dropDatabase(process.env.TEST_DB_NAME);
}
