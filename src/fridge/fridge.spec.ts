import Fridge from './fridge'
import Item from './item'

jest.mock('./item')


describe('fridge', () => {
    let fridge: Fridge

    beforeEach(() => {
        fridge = new Fridge()
    })

    it('show empty display when no items', () => {
        const actual = fridge.display()

        expect(actual).toBe('')
    })

    it('show expired item in display when item is expired', () => {
        const expiredMilk: Item = {
            name: () => "Milk",
            isExpired: () => true
        }

        fridge.add(expiredMilk)
        const actual = fridge.display()

        expect(actual).toBe('EXPIRED: Milk')
    })
})