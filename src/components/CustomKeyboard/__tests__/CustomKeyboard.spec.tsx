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
  visible: false,
  children: null,
}

describe('CustomKeyboard', () => {
  describe('rendering', () => {
    // TODO: resolve issue with missing views in snapshot testing
    // test('renders correctly with given props', () => {
    //   const customKeyboard = renderer.create(<CustomKeyboard {...props} />)
    //   expect(customKeyboard).toMatchSnapshot()
    // })
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
      .getInstance()

    test('call onCancelPress prop correctly', () => {
      // @ts-expect-error -- TODO: fix type
      customKeyboard?.onCancelPress()
      expect(onCancelPress).toHaveBeenCalled()
    })

    test('call onSubmitPress prop correctly', () => {
      // @ts-expect-error -- TODO: fix type
      customKeyboard?.onSubmitPress()
      expect(onSubmitPress).toHaveBeenCalled()
    })
  })
})
