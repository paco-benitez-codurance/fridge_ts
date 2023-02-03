import expiryDateCalculator from "./expiryDateCalculator";
import Item, { ItemName } from "./item";
import itemExpiratorChecker from "./itemExpiratorChecker";

export default class Fridge {
  items: Item[] = [];
  today: Date;
  timesDoorOpened = new Map<ItemName, number>()

  constructor(clock: () => Date = () => new Date()) {
    this.today = clock();
  }

  add(item: Item): void {
    this.items.push(item);
  }

  display(): string {
    const expired = this.formatExpiredItems(this.expiredItems());
    const nonExpired = this.formatNonExpiredItems(this.nonExpiredItems());

    if (expired && nonExpired) {
      return expired + "\n" + nonExpired;
    }
    return expired + nonExpired;
  }

  openDoor(): void {
    this.timesDoorOpened = new Map(this.items.map(it => [it.name, (this.timesDoorOpened.get(it.name) || 0) + 1]))
  }

  private isExpired = (item: Item) =>
    itemExpiratorChecker.isExpired(this.today, item.expiryDate);

  private expiredItems(): Item[] {
    return this.items.filter(this.isExpired);
  }

  private nonExpiredItems(): Item[] {
    return this.items.filter((it) => !this.isExpired(it));
  }

  private formatExpiredItems(expiredItems: Item[]): string {
    if (expiredItems.length == 0) return "";
    return "EXPIRED: " + expiredItems.map((it) => it.name).join(", ");
  }

  private formatNonExpiredItems(expiredItems: Item[]): string {
    return expiredItems
      .map(
        (it) =>
          `${it.name}: ${expiryDateCalculator.remainingDays(
            this.today,
            it.expiryDate,
            (this.timesDoorOpened.get(it.name) || 0)
          )} days remaining`
      )
      .join("\n");
  }
}
