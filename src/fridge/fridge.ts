import Item from "./item";

export default class Fridge {

    items: Item[] = []
    today: Date

    constructor(clock: () => Date = () => new Date()) {
        this.today = clock()
    }

    display(): string {
        return this.formatExpiredItems(this.expiredItems())
    }

    private expiredItems(): Item[] {
        return this.items.filter(it => it.isExpired(this.today));
    }

    private formatExpiredItems(expiredItems: Item[]): string {
        if(expiredItems.length == 0) return ''
        return 'EXPIRED: ' + expiredItems.map(it => it.name()).join(", ");
    }

    add(item: Item): void {
        this.items.push(item)
    }

}
