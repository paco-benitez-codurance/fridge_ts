import Fridge from "./fridge";
import Item from "./item";
import itemExpiratorChecker from "./itemExpiratorChecker";
import expiryDateCalculator from "./expiryDateCalculator";
import { jest } from "@jest/globals";

const TODAY = new Date(2020, 1, 15);
const EXPIRY_DATE = new Date(2021, 1, 20);

describe("fridge", () => {
  let fridge: Fridge;
  let clock: jest.Mock<() => Date>;

  function newFridge(clock: jest.Mock<() => Date>) {
    fridge = new Fridge(clock);
    return fridge;
  }

  function newItem(): Item {
    return {
      name: "Milk",
      expiryDate: EXPIRY_DATE,
    };
  }

  beforeEach(() => {
    clock = jest.fn<() => Date>(() => TODAY);
    fridge = newFridge(clock);
  });

  it("show empty display when no items", () => {
    const actual = fridge.display();

    expect(actual).toBe("");
  });

  describe("Expired", () => {
    beforeEach(() => {
      jest.spyOn(expiryDateCalculator, "remainingDays").mockReturnValue(5);
    });

    it("show expired item in display when item is expired", () => {
      const expiredMilk: Item = newItem();
      fridge.add(expiredMilk);
      jest.spyOn(itemExpiratorChecker, "isExpired").mockReturnValue(true);

      const actual = fridge.display();

      expect(actual).toBe("EXPIRED: Milk");
    });

    it("dont show expired item in display when item is not expired", () => {
      const nonExpiredMilk: Item = newItem();
      fridge.add(nonExpiredMilk);
      jest.spyOn(itemExpiratorChecker, "isExpired").mockReturnValue(false);

      const actual = fridge.display();

      expect(actual).not.toContain("EXPIRED");
    });

    it("item needs to know current date", () => {
      const expiredMilk: Item = newItem();
      const fri = newFridge(clock);

      fri.add(expiredMilk);

      fri.display();

      expect(itemExpiratorChecker.isExpired).toBeCalledWith(
        TODAY,
        expiredMilk.expiryDate
      );
    });
  });

  it("show remaining days", () => {
    const todayLessFive = new Date(2021, 1, 1);
    jest.spyOn(expiryDateCalculator, "remainingDays").mockReturnValue(5);
    jest.spyOn(itemExpiratorChecker, "isExpired").mockReturnValue(false);

    fridge.add({
      name: "Milk",
      expiryDate: todayLessFive,
    });
    const actual = fridge.display();
    expect(actual).toBe("Milk: 5 days remaining");
  });
});
