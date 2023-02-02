import Item from "./item";

class ItemExpiratorChecker {
    public isExpired(today: Date, expiryDate: Date): boolean {
        return today >= expiryDate
    }
}

export default new ItemExpiratorChecker()