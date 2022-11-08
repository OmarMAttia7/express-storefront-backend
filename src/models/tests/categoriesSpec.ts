import Categories, { Category } from "../categories";
import {
  addTestCategories,
  testCategories,
} from "./test_utils/testCategoriesUtil";

function testSuite(): void {
  describe("Categories Model", () => {
    let categoriesModel: Categories;
    beforeAll(async () => {
      categoriesModel = new Categories();

      await addTestCategories(testCategories);
    });

    it("has and index() method that returns all categories", async () => {
      const expectedArr: Category[] = [];

      for (let i = 0; i < testCategories.length; i++) {
        expectedArr.push({ id: i + 1, category_name: testCategories[i] });
      }

      expect(await categoriesModel.index()).toEqual(expectedArr);
    });

    it("has a show() method that returns a category by id", async () => {
      expect(await categoriesModel.show(2)).toEqual({
        id: 2,
        category_name: testCategories[1],
      });
    });

    it("has a create() method that creates a category", async () => {
      const categoryName = "Nutrition";

      expect(await categoriesModel.create(categoryName)).toEqual({
        id: testCategories.length + 1,
        category_name: categoryName,
      });
    });

    it("has a delete() method that deletes a category by id", async () => {
      expect(await categoriesModel.delete(testCategories.length)).toEqual({
        id: testCategories.length,
        category_name: testCategories[testCategories.length - 1],
      });
    });

    it("has an update() method that updates a category by id", async () => {
      const newValues = {category_name: "Stationary supplies"};
      expect(await categoriesModel.update(1, newValues)).toEqual({
        id: 1,
        category_name: newValues.category_name
      })
    });
  });
}

export default testSuite;
