import { groupBy } from "./utils";

describe('utils', () => {
  describe('groupBy', () => {
    it('groups an array with keys from a function', () => {
      const obj = [{ id: "z1",  }, { id: "z2" }, { id: "z1" }, { id: "z3" }, { id: "z2" }];
      const grouped = groupBy(obj, (val: Record<string, string>) => val.id);
      expect(grouped).toBeInstanceOf(Map);
      expect(grouped.size).toEqual(3);
      expect(grouped.has("z1")).toBe(true);
      expect(grouped.has("z2")).toBe(true);
      expect(grouped.has("z3")).toBe(true);
    });
  });
});
