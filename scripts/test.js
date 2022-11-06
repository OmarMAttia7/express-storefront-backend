const dotenv = require("dotenv");

const { runScript } = require("./script_utils");

const nModule = "./node_modules/.bin";
dotenv.config();

createTestDB();
runTests();
dropTestDB();

// Create test database
function createTestDB() {
  return runScript({
    script: `${nModule}/db-migrate`,
    options: ["db:create", process.env.TEST_DB_NAME],
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
