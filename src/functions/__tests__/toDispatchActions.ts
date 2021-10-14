import { toDispatchActions as _toDispatchActions } from '../toDispatchActions'
import { BuiltLogic, kea, LogicWrapper, resetContext } from 'kea'
import { testUtilsContext, testUtilsPlugin } from '../../plugin'
import { ActionToDispatch } from '../../types'

describe('functions/toDispatchActions', () => {
  const logic = kea({ actions: { run: true } })

  beforeEach(() => {
    resetContext({ plugins: [testUtilsPlugin()] })
    logic.mount()
  })

  describe('sync', () => {
    const toDispatchActions = (logic: BuiltLogic | LogicWrapper, actions: ActionToDispatch[]) => {
      _toDispatchActions.common?.(logic, actions)
      return _toDispatchActions.sync?.(logic, actions)
    }

    it('returns nothing if matches', () => {
      logic.actions.run()
      expect(toDispatchActions(logic, ['run'])).toBeUndefined()
    })

    it('returns what it did not match', () => {
      logic.actions.run()
      const response = toDispatchActions(logic, ['something'])

      expect(response).not.toBeUndefined() // for TS
      if (response) {
        expect(response[0].operation).toEqual('toDispatchActions')
        expect(response[0].logic).toBe(logic)
        expect(response[0].payload).toEqual(['something'])
      }
    })

    it('sets ranActions', () => {
      expect(testUtilsContext().ranActions).toBeFalsy()
      logic.actions.run()
      expect(toDispatchActions(logic, ['run'])).toBeUndefined()
      expect(testUtilsContext().ranActions).toBeTruthy()
    })

    it('increases the history index', () => {
      logic.actions.run()
      expect(testUtilsContext().recordedHistory.length).toBe(1)
      expect(testUtilsContext().historyIndex).toBe(-1)

      logic.actions.run()
      expect(testUtilsContext().recordedHistory.length).toBe(2)
      expect(testUtilsContext().historyIndex).toBe(-1)

      expect(toDispatchActions(logic, ['run'])).toBeUndefined()
      expect(testUtilsContext().historyIndex).toBe(0)

      expect(toDispatchActions(logic, ['run'])).toBeUndefined()
      expect(testUtilsContext().historyIndex).toBe(1)

      expect(toDispatchActions(logic, ['run'])).not.toBeUndefined()
      expect(testUtilsContext().historyIndex).toBe(1)

      logic.actions.run()
      logic.actions.run()
      logic.actions.run()

      expect(toDispatchActions(logic, ['run', 'run'])).toBeUndefined()
      expect(testUtilsContext().historyIndex).toBe(3)

      expect(toDispatchActions(logic, ['run', 'run'])).not.toBeUndefined()
      expect(testUtilsContext().historyIndex).toBe(4)
    })
  })

  describe('async', () => {
    const toDispatchActions = async (logic: BuiltLogic | LogicWrapper, actions: ActionToDispatch[]) => {
      _toDispatchActions.common?.(logic, actions)
      await _toDispatchActions.async?.(logic, actions)
    }
    // TODO
  })
})
