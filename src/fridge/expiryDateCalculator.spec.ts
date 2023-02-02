import expiryDateCalculator from "./expiryDateCalculator"

describe('ItemExpirationChecker', () => {
    it('return true when product is expired', () => {
        const today = new Date(2022, 1, 15)
        const tomorrow = new Date(2022, 1, 16)

        const isExpired = expiryDateCalculator.remainingDays(today, tomorrow)

        expect(isExpired).toBe(1)
    })

})