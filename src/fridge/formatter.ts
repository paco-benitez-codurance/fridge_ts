import { ItemName } from "./item";

class Formatter {
  public formatExpiredItems(names: string[]): string {
    if (names.length == 0) return "";
    return "EXPIRED: " + names.join(", ");
  }

  public formatNonExpiredItems(items: [ItemName, number][]): string {
    return items
      .map((it) => `${it[0]}: ${it[1]} ${this.days(it[1])} remaining`)
      .join("\n");
  }

  private days(count: number): string {
    if (count == 1) return "day";
    return "days";
  }
}

export default new Formatter();
