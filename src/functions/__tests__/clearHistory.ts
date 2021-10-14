import { clearHistory as _clearHistory } from '../clearHistory'
import { kea, resetContext } from 'kea'
import { testUtilsContext, testUtilsPlugin } from '../../plugin'
import { expectLogic } from '../../expect'

describe('functions/clearHistory', () => {
  const logic = kea({ actions: { run: true } })

  beforeEach(() => {
    resetContext({ plugins: [testUtilsPlugin()] })
    logic.mount()
  })

  describe('common', () => {
    const clearHistory = _clearHistory.common!

    it('clears the history', () => {
      logic.actions.run()
      logic.actions.run()

      expectLogic(logic).toDispatchActions(['run'])
      expect(testUtilsContext().recordedHistory.length).toBe(2)
      expect(testUtilsContext().historyIndex).toBe(0)

      clearHistory(logic, undefined)

      expect(testUtilsContext().recordedHistory.length).toBe(0)
      expect(testUtilsContext().historyIndex).toBe(-1)
    })
  })
})
