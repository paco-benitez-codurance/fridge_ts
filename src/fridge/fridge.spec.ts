import Fridge from './fridge'
import Item from './item'


import {jest} from '@jest/globals';

describe('fridge', () => {
    let fridge: Fridge
    let clock: jest.Mock<() => Date>

    function newFridge(clock: jest.Mock<() => Date>) {
        fridge = new Fridge(clock);
        return fridge;
    }

    beforeEach(() => {
        clock = jest.fn<() => Date>()
        fridge = newFridge(clock);
    })

    it('show empty display when no items', () => {
        const actual = fridge.display()

        expect(actual).toBe('')
    })

    function newItem(name: String, expired: boolean): Item {
        return {
            name: () => "Milk",
            isExpired: () => expired
        } 
    }

    it('show expired item in display when item is expired', () => {
        const expiredMilk: Item = newItem("Milk", true)
        fridge.add(expiredMilk)

        const actual = fridge.display()

        expect(actual).toBe('EXPIRED: Milk')
    })

    it('dont show expired item in display when item is not expired', () => {
        const nonExpiredMilk: Item = newItem("Milk", false)
        fridge.add(nonExpiredMilk)

        const actual = fridge.display()

        expect(actual).toBe('')
    })

    it('item needs to know current date', () => {
        const today = new Date(2020, 1, 15);
        const expiredMilk: Item = {
            name: () => "Milk",
            isExpired: jest.fn(() => true)
        }
        clock.mockReturnValue(today)
        const fri = newFridge(clock)

        fri.add(expiredMilk)

        fri.display()

        expect(expiredMilk.isExpired).toBeCalledWith(today)
    })
})


