import { ActionToDispatch, ExpectFunction } from '../types'
import { testUtilsContext } from '../plugin'
import { tryToSearchActions } from './toDispatchActionsInAnyOrder'

export const toNotHaveDispatchedActions: ExpectFunction<ActionToDispatch[]> = {
  common(logic, actions) {
    const { notFound } = tryToSearchActions(logic, actions)

    if (notFound.length !== actions.length) {
      throw new Error(`Found actions when we shouldn't have!`)
    }

    testUtilsContext().historyIndex = testUtilsContext().recordedHistory.length
    testUtilsContext().ranActions = true
  },
}
