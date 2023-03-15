import React from 'react'
import renderer from 'react-test-renderer'

import CustomKeyboard from '../CustomKeyboard'

const props = {
  buttonsViewStyle: {
    backgroundColor: '#AAAAAA',
    borderColor: '#BBBBBB',
    borderBottomWidth: 1,
  },
  buttonsTextStyle: {
    color: '#CCCCCC',
    fontSize: 13,
  },
  cancelKeyText: 'cancelKeyText',
  onCancelPress: jest.fn(),
  onSubmitPress: jest.fn(),
  submitKeyText: 'submitKeyText',
  visible: true,
  children: null,
}

describe('CustomKeyboard', () => {
  describe('rendering', () => {
    test('renders correctly with given props', () => {
      const customKeyboard = renderer.create(<CustomKeyboard {...props} />)
      expect(customKeyboard).toMatchSnapshot()
    })
  })

  describe('callbacks', () => {
    const onCancelPress = jest.fn()
    const onSubmitPress = jest.fn()

    const customKeyboard = renderer
      .create(
        <CustomKeyboard
          {...props}
          onCancelPress={onCancelPress}
          onSubmitPress={onSubmitPress}
        />,
      )
      .getInstance() as unknown as CustomKeyboard

    test('call onCancelPress prop correctly', () => {
      customKeyboard?.onCancelPress()
      expect(onCancelPress).toHaveBeenCalled()
    })

    test('call onSubmitPress prop correctly', () => {
      customKeyboard?.onSubmitPress()
      expect(onSubmitPress).toHaveBeenCalled()
    })
  })
})
