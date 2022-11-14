import dbPool from "../../db";
import Users from "../users";
import { addTestUsers, testUsers } from "./test_utils/testUsersUtil";

function testSuite(): void {
  describe("Users Model :", () => {
    const usersModel = new Users();

    beforeAll(async () => {
      await addTestUsers(testUsers);
    });

    it("has an index() method that returns all users", async () => {
      const usersIndex = await usersModel.index();

      expect(usersIndex[0].first_name).toEqual(testUsers[0][0]);

      expect(usersIndex[1].last_name).toEqual(testUsers[1][1]);
    });

    it("has a show() method that returns a user by id", async () => {
      expect(await usersModel.show(1)).toEqual({
        id: 1,
        first_name: testUsers[0][0],
        last_name: testUsers[0][1],
        email: testUsers[0][3],
      });
    });

    it("has a create() method that adds a new user", async () => {
      expect(
        await usersModel.create(
          "Slithering",
          "Car",
          "1r3@$@5f13f",
          "slcar@example.com"
        )
      ).toEqual({
        id: 4,
        first_name: "Slithering",
        last_name: "Car",
        email: "slcar@example.com",
      });
    });

    it("has an update() method that updates a user by id", async () => {
      expect(
        await usersModel.update(1, {
          first_name: "Sketchy",
          last_name: "Doodle",
        })
      ).toEqual({
        id: 1,
        first_name: "Sketchy",
        last_name: "Doodle",
        email: testUsers[0][3],
      });
    });

    it("has a delete() method that deletes a user by id", async () => {
      expect(await usersModel.delete(2)).toEqual({
        id: 2,
        first_name: testUsers[1][0],
        last_name: testUsers[1][1],
        email: testUsers[1][3],
      });
    });

    it("has a showByEmail() method that returns a user by email", async () => {
      const user = await usersModel.showByEmail(testUsers[2][3]);
      expect(user.id).toEqual(3);
    });

    afterAll(async () => {
      await dbPool.query("DELETE FROM users *;");
      await dbPool.query("ALTER SEQUENCE users_id_seq RESTART WITH 1;");
    });
  });
}

export default testSuite;
