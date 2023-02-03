import Fridge from './fridge'
import Item, { itemName } from './item'
import itemExpiratorChecker from './itemExpiratorChecker'
import { jest } from '@jest/globals'

const TODAY = new Date(2021, 1, 20)
const TODAY_PLUS_FIVE = new Date(2021, 1, 25)
const EXPIRED_DATE = new Date(2021, 1, 19)

describe('fridge aceptance', () => {
  let fridge: Fridge
  let clock: jest.Mock<() => Date>

  beforeEach(() => {
    clock = jest.fn<() => Date>(() => TODAY)
    fridge = new Fridge(clock)
  })

  describe('Expired Items', () => {
    it('show expired item in display when item is expired', () => {
      const expiredMilk: Item = {
        name: itemName('Milk'),
        expiryDate: EXPIRED_DATE,
        condition: 'sealed'
      }
      fridge.add(expiredMilk)

      const actual = fridge.display()

      expect(actual).toBe('EXPIRED: Milk')
    })
  })

  describe('Days Reminded', () => {
    it('show remaining days', () => {
      fridge.add({
        name: itemName('Milk'),
        expiryDate: TODAY_PLUS_FIVE,
        condition: 'sealed'
      })
      const actual = fridge.display()
      expect(actual).toBe('Milk: 5 days remaining')
    })
  })

  describe('Degradation', () => {
    it('degrade 1 hour sealed item', () => {
      fridge.add({
        name: itemName('Milk'),
        expiryDate: TODAY_PLUS_FIVE,
        condition: 'sealed'
      })

      for(let i = 0; i < 24; i++) {
        fridge.openDoor()
      }

      const actual = fridge.display()

      expect(actual).toBe('Milk: 4 days remaining')
    })

  })
})
