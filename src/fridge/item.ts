
export default interface Item {
    name: string
    expiryDate: Date
    condition: 'sealed' | 'opened'
}

