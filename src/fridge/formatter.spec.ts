import formatter from "./formatter";
import { ItemName, itemName } from "./item";

describe("Formatter", () => {
  describe("Expired", () => {
    it("format no items", () => {
      expect(formatter.formatExpiredItems([])).toBe("");
    });
    it("format one item", () => {
      expect(formatter.formatExpiredItems(["Milk"])).toBe("EXPIRED: Milk");
    });
    it("format several items", () => {
      expect(formatter.formatExpiredItems(["Milk", "Eggs"])).toBe(
        "EXPIRED: Milk, Eggs"
      );
    });
  });
  describe("Non Expired", () => {
    it("format several days", () => {
        const items: [ItemName, number][] = [
            [itemName('Milk'), 5]
        ]
        expect(formatter.formatNonExpiredItems(items)).toBe("Milk: 5 days remaining");
    });
    it("format one days", () => {
        const items: [ItemName, number][] = [
            [itemName('Milk'), 1]
        ]
        expect(formatter.formatNonExpiredItems(items)).toBe("Milk: 1 day remaining");
    });
  });
});
