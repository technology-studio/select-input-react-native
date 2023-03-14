import React from 'react'
import renderer, { type ReactTestInstance } from 'react-test-renderer'

import PickerKeyboard from '../PickerKeyboard'

const props = {
  buttonsTextStyle: {
    color: '#BBBBBB',
    fontSize: 13,
  },
  buttonViewStyle: {
    backgroundColor: '#FFFFFF',
    borderColor: '#AAAAAA',
    bottomBorderWidth: 0,
  },
  pickerViewStyle: {
    backgroundColor: '#CCCCCC',
  },
  cancelKeyText: 'cancelKeyText',
  onCancel: jest.fn(),
  onSubmit: jest.fn(),
  onValueChange: jest.fn(),
  options: [{ value: '0', label: '0' }],
  style: {},
  submitKeyText: 'submitKeyText',
  value: '0',
}

describe('PickerKeyboard', () => {
  describe('rendering', () => {
    // TODO: resolve issue with missing views in snapshot testing
    // test('renders correctly with given props', () => {
    //   const pickerKeyboard = renderer.create(<PickerKeyboard {...props} />)
    //   expect(pickerKeyboard).toMatchSnapshot()
    // })
  })

  describe('functions', () => {
    let pickerKeyboard: ReactTestInstance | null = null

    beforeEach(() => {
      pickerKeyboard = renderer
        .create(<PickerKeyboard {...props} />)
        .getInstance()
    })

    afterEach(() => {
      pickerKeyboard = null
    })

    test('sets picker ref correctly', () => {
      // @ts-expect-error -- TODO: fix type
      pickerKeyboard?.setPickerRef(1)
      // @ts-expect-error -- TODO: fix type
      expect(pickerKeyboard?.picker).toBe(1)
    })

    test('updates value correctly', () => {
      // @ts-expect-error state probably doesn't exist - check
      expect(pickerKeyboard?.state.value).toBe('0')
      // @ts-expect-error -- TODO: fix type
      pickerKeyboard?.componentDidUpdate({ value: '1' })
      // @ts-expect-error state probably doesn't exist - check
      expect(pickerKeyboard?.state.value).toBe('0')
    })

    test('updates visible state when focussing correctly', () => {
      // @ts-expect-error state probably doesn't exist - check
      expect(pickerKeyboard?.state.visible).toBe(false)
      // @ts-expect-error -- TODO: fix type
      pickerKeyboard?.focus()
      // @ts-expect-error state probably doesn't exist - check
      expect(pickerKeyboard?.state.visible).toBe(true)
    })

    test('updates value correctly when value changes', () => {
      // @ts-expect-error state probably doesn't exist - check
      expect(pickerKeyboard?.state.value).toBe('0')

      // @ts-expect-error -- TODO: fix type
      pickerKeyboard?.onValueChange('1')
      // @ts-expect-error state probably doesn't exist - check
      expect(pickerKeyboard?.state.value).toBe('1')
    })

    test('updates visibily correctly', () => {
      // @ts-expect-error state probably doesn't exist - check
      expect(pickerKeyboard?.state.visible).toBe(false)

      // @ts-expect-error -- TODO: fix type
      pickerKeyboard?.setVisible(true)
      // @ts-expect-error state probably doesn't exist - check
      expect(pickerKeyboard?.state.visible).toBe(true)

      // @ts-expect-error -- TODO: fix type
      pickerKeyboard?.setVisible(false)
      // @ts-expect-error state probably doesn't exist - check
      expect(pickerKeyboard?.state.visible).toBe(false)
    })
  })

  describe('callbacks', () => {
    const onCancel = jest.fn()
    const onSubmit = jest.fn()

    const pickerKeyboard = renderer
      .create(
        <PickerKeyboard {...props} onCancel={onCancel} onSubmit={onSubmit} />,
      )
      .getInstance()

    test('call onCancel prop correctly', () => {
      // @ts-expect-error -- TODO: fix type
      pickerKeyboard?.onCancelPress()

      expect(onCancel).toHaveBeenCalled()
      // @ts-expect-error state probably doesn't exist - check
      expect(pickerKeyboard?.state.visible).toBe(false)
    })

    test('call onSubmit prop correctly', () => {
      // @ts-expect-error -- TODO: fix type
      pickerKeyboard?.onSubmitPress()

      expect(onSubmit).toHaveBeenCalledWith('0')
      // @ts-expect-error state probably doesn't exist - check
      expect(pickerKeyboard?.state.visible).toBe(false)
    })
  })
})
