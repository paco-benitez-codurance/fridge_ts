class ExpiryDateCalculator {
    public remainingDays(from: Date, to: Date): number {
        return (to.getTime() - from.getTime()) / (1000 * 3600 * 24)
    }
}

export default new ExpiryDateCalculator()