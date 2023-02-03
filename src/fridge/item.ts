
export type ItemName = string & {_opaque: ItemName}

export function itemName(value: string) {
    return value as ItemName
}

export default interface Item {
    name: ItemName
    expiryDate: Date
    condition: 'sealed' | 'opened'
}

