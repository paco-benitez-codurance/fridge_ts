import expiryDateCalculator from "./expiryDateCalculator"

describe('ItemExpirationChecker', () => {
    it('return number of remaining days', () => {
        const today = new Date(2022, 1, 15)
        const tomorrow = new Date(2022, 1, 16)

        const isExpired = expiryDateCalculator.remainingDays(today, tomorrow, 0)

        expect(isExpired).toBe(1)
    })

    it('return number of remaining days for a sealed product when the door has been opened', () => {
        const today = new Date(2022, 1, 15)
        const tomorrow = new Date(2022, 1, 18)
        const numberOfDoorOpens = 24

        const isExpired = expiryDateCalculator.remainingDays(today, tomorrow, numberOfDoorOpens)

        expect(isExpired).toBe(2)
    })

})