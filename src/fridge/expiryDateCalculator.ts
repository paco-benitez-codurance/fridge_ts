class ExpiryDateCalculator {
    public remainingDays(from: Date, to: Date, numberOfDoorOpens: number): number {
        const dayPass = (to.getTime() - from.getTime()) / (1000 * 3600 * 24)
        const degraded = numberOfDoorOpens / 24

        return dayPass - degraded
    }
}

export default new ExpiryDateCalculator()