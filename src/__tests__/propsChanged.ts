import {  kea, MakeLogicType, resetContext, selectors } from 'kea'
import { expectLogic } from '../expect'
import { testUtilsPlugin } from '../plugin'

type myLogicType = MakeLogicType<{ isFooBar: boolean }, {}, { foo: string }>
const myLogic = kea<myLogicType>([selectors({ isFooBar: [() => [(_, props) => props.foo], (foo) => foo === 'bar'] })])

describe('propsChanged', () => {
  beforeEach(() => {
    resetContext({ plugins: [testUtilsPlugin()] })
  })

  it('works with propsChanged', async () => {
    let logic = myLogic({ foo: 'bar' })
    logic.mount()
    await expectLogic(logic).toFinishAllListeners().toMatchValues({ isFooBar: true })

    myLogic({ foo: 'baz' })
    await expectLogic(logic).toFinishAllListeners().toMatchValues({ isFooBar: false })
  })
})
