import Item from "./item";

export default class Fridge {

    expired: string[] = []

    display(): string {
        if(this.expired.length == 0) return ''
        return 'EXPIRED: ' + this.expired.join(", ")
    }

    add(item: Item): void {
        this.expired.push(item.name())
    }

}
