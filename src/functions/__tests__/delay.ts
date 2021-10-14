import { delay as _delay } from '../delay'
import { kea, resetContext } from 'kea'
import { testUtilsPlugin } from '../../plugin'

describe('functions/delay', () => {
  const logic = kea({ actions: { run: true } })

  beforeEach(() => {
    resetContext({ plugins: [testUtilsPlugin()] })
    logic.mount()
  })

  describe('sync', () => {
    const delay = _delay.sync!
    it('returns async operations', () => {
      const response = delay(logic, 10)
      expect(response).toEqual([{ logic, operation: 'delay', payload: 10 }])
    })
  })

  describe('async', () => {
    const delay = _delay.async!
    it('awaits for as long as it says it does', async () => {
      const start = new Date().valueOf()
      await delay(logic, 10)
      const end = new Date().valueOf()
      expect(end - start).toBeGreaterThanOrEqual(10)
      expect(end - start).toBeLessThan(20)
    })
  })
})
