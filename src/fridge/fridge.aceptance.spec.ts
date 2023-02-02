import Fridge from './fridge'
import Item from './item'
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
        name: 'Milk',
        expiryDate: EXPIRED_DATE,
      }
      fridge.add(expiredMilk)

      const actual = fridge.display()

      expect(actual).toBe('EXPIRED: Milk')
    })
  })

  describe('Days Reminded', () => {
    it('show remaining days', () => {
      fridge.add({
        name: 'Milk',
        expiryDate: TODAY_PLUS_FIVE,
      })
      const actual = fridge.display()
      expect(actual).toBe('Milk: 5 days remaining')
    })
  })
})
