import { type Picker } from '@react-native-picker/picker'
import React from 'react'
import renderer from 'react-test-renderer'

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
    let pickerKeyboard: PickerKeyboard | null = null

    beforeEach(() => {
      pickerKeyboard = renderer
        .create(<PickerKeyboard {...props} />)
        .getInstance() as unknown as PickerKeyboard
    })

    afterEach(() => {
      pickerKeyboard = null
    })

    test('sets picker ref correctly', () => {
      const component = 1 as unknown as Picker<string>
      pickerKeyboard?.setPickerRef(component)
      expect(pickerKeyboard?.picker).toBe(component)
    })

    test('updates value correctly', () => {
      expect(pickerKeyboard?.state.value).toBe('0')
      pickerKeyboard?.componentDidUpdate({
        ...props,
        value: '1',
      })
      expect(pickerKeyboard?.state.value).toBe('0')
    })

    test('updates visible state when focussing correctly', () => {
      expect(pickerKeyboard?.state.visible).toBe(false)
      pickerKeyboard?.focus()
      expect(pickerKeyboard?.state.visible).toBe(true)
    })

    test('updates value correctly when value changes', () => {
      expect(pickerKeyboard?.state.value).toBe('0')

      pickerKeyboard?.onValueChange('1')
      expect(pickerKeyboard?.state.value).toBe('1')
    })

    test('updates visibily correctly', () => {
      expect(pickerKeyboard?.state.visible).toBe(false)

      pickerKeyboard?.setVisible(true)
      expect(pickerKeyboard?.state.visible).toBe(true)

      pickerKeyboard?.setVisible(false)
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
      .getInstance() as unknown as PickerKeyboard

    test('call onCancel prop correctly', () => {
      pickerKeyboard?.onCancelPress()

      expect(onCancel).toHaveBeenCalled()
      expect(pickerKeyboard?.state.visible).toBe(false)
    })

    test('call onSubmit prop correctly', () => {
      pickerKeyboard?.onSubmitPress()

      expect(onSubmit).toHaveBeenCalledWith('0')
      expect(pickerKeyboard?.state.visible).toBe(false)
    })
  })
})
