import { getIdsFromString, queryNumberCheck } from "./general";

describe("Test General Utilities", () => {
  describe("Test get ids from string", () => {
    test("Normal test", () => {
      expect(getIdsFromString("1,2,3")).toEqual("1,2,3");
    });

    test("Distorted data", () => {
      const testString = "adasfasdfa1, dasfsdf,     ,     45645";
      expect(getIdsFromString(testString)).toEqual("45645");
    });

    test("Empty data", () => {
      expect(getIdsFromString("")).toEqual("");
    });
  });

  describe("Test queryNumberCheck", () => {
    test("Normal test", () => {
      expect(queryNumberCheck("123")).toEqual(123);
    });
  });
});
