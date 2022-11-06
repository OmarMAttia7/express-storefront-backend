const dotenv = require("dotenv");

const { runScript } = require("./script_utils");

const nModule = "./node_modules/.bin";
dotenv.config();
process.env.ENV = "test";

createTestDB();
runUpMigrations();
runTests();
dropTestDB();

// Create test database
function createTestDB() {
  return runScript({
    script: `${nModule}/db-migrate`,
    options: ["db:create", process.env.TEST_DB_NAME],
  });
}

// Run UP migrations
function runUpMigrations() {
  return runScript({
    script: `${nModule}/db-migrate`,
    options: ["up", "--env", "test"]
  });
}

// Run tests
function runTests() {
  return runScript({
    script: `${nModule}/jasmine`,
  });
}

// Drop test database
function dropTestDB() {
  return runScript({
    script: `${nModule}/db-migrate`,
    options: ["db:drop", process.env.TEST_DB_NAME],
  });
}
