import { ExpectFunction } from '../types'
import { resetTestUtilsContext } from '../plugin'

export const clearHistory: ExpectFunction<any> = {
  common() {
    resetTestUtilsContext()
  },
}
