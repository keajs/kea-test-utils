import { kea, MakeLogicType, resetContext } from 'kea'
import { expectLogic } from '../expect'
import { testUtilsPlugin } from '../plugin'

type logicType = MakeLogicType<{ bla: string }, { setValue: (value: string) => { value: string } }>

describe('expect', () => {
  const logic = kea<logicType>({
    actions: { setValue: (value) => ({ value }) },
    reducers: { bla: ['value', { setValue: (_, { value }) => value }] },
  })

  beforeEach(() => {
    resetContext({ plugins: [testUtilsPlugin()] })
  })

  it('can be called in many ways', () => {
    logic.mount()

    expect(logic.values.bla).toEqual('value')
    expectLogic(logic).toMatchValues({ bla: 'value' })
    expectLogic().toMatchValues(logic, { bla: 'value' })

    expectLogic(logic, () => {
      logic.actions.setValue('asd')
    }).toMatchValues({ bla: 'asd' })

    logic.actions.setValue('asdf')
    expectLogic(logic).toMatchValues({ bla: 'asdf' })
    expect(logic.values.bla).toEqual('asdf')
    expect(() => {
      expectLogic(logic).toMatchValues({ bla: 'nope' })
    }).toThrow()
  })

  it('can also call clearHistory in many ways', () => {
    logic.mount()

    expect(logic.values.bla).toEqual('value')
    expectLogic().clearHistory()
    expectLogic(logic).clearHistory()
    expectLogic(logic, () => {
      logic.actions.setValue('a')
    }).clearHistory()
  })
})
