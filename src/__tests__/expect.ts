import { kea, resetContext } from 'kea'
import { expectLogic } from '../expect'
import { testUtilsPlugin } from '../plugin'

describe('functions/delay', () => {
  const logic = kea({
    actions: { setValue: (value: string) => ({ value }) },
    reducers: { bla: ['value', { setValue: (_: any, { value }: any) => value }] },
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
