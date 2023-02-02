import itemExpiratorChecker from "./itemExpiratorChecker";

describe("ItemExpirationChecker", () => {
  it("return true when product is expired", () => {
    const today = new Date(2022, 1, 15);
    const yesterday = new Date(2022, 1, 14);

    const isExpired = itemExpiratorChecker.isExpired(today, yesterday);

    expect(isExpired).toBeTruthy();
  });

  it("return false when product is not expired", () => {
    const today = new Date(2022, 1, 15);
    const tomorrow = new Date(2022, 1, 16);

    const isExpired = itemExpiratorChecker.isExpired(today, tomorrow);

    expect(isExpired).toBeFalsy();
  });
});
