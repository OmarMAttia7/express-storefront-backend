import { PoolClient } from "pg";
import dbPool from "../../db";
import Users from "../users";
import addTestUser from "./test_utils/addTestUser";

describe("Users Model", () => {
  let usersModel: Users;
  let testUsers: string[][];
  let dbClient: PoolClient;
  beforeAll(async () => {
    usersModel = new Users();
    dbClient = await dbPool.connect();

    // Add entries to the table for testing
    testUsers = [
      ["Doodle", "Sketch", "wHFrCxF$3n2RnDJz"],
      ["Moon", "Light", "R&SV)Hpf5(*rxnvq"],
      ["Dangerous", "Amphibian", "CsdbF@r6^%7&I6Hc"],
    ];

    for(const user of testUsers) {
      await addTestUser(user);
    }
  });

  afterAll(async () => {
    await dbClient.query("DELETE FROM users *;");
    await dbClient.release();
  });

  it("has an index() method that returns all users", async () => {
    const usersIndex = await usersModel.index();

    expect(usersIndex[0].first_name).toEqual(testUsers[0][0]);

    expect(usersIndex[1].last_name).toEqual(testUsers[1][1]);
  });

  it("has a show() method that returns user by id", async () => {
    expect(await usersModel.show(1)).toEqual({
      id: 1,
      first_name: testUsers[0][0],
      last_name: testUsers[0][1],
    });
  });

  it("has a create() method that adds a new user", async () => {
    expect(await usersModel.create("Slithering", "Car", "1r3@$@5f13f")).toEqual({
      id: 4,
      first_name: "Slithering",
      last_name: "Car",
    });
  });

  it("has an update() method that updates a user with id", async () => {
    expect(
      await usersModel.update(1, { first_name: "Sketchy", last_name: "Doodle" })
    ).toEqual({
      id: 1,
      first_name: "Sketchy",
      last_name: "Doodle",
    });
  });

  it("has a delete() method that deletes users", async () => {
    expect(await usersModel.delete(2)).toEqual({
      id: 2,
      first_name: testUsers[1][0],
      last_name: testUsers[1][1]
    });
  });
});
