import dbSuite from './dbSpec';
import modelsSuite from '../models/tests';
import dbPool from '../db';

describe("Application Testing", () => {
  
  dbSuite();
  modelsSuite();
  
  afterAll(async () => {
    await dbPool.end();
  });
})