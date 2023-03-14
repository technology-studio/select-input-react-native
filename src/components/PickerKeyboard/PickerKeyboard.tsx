import React, {
  Component, type ComponentRef,
} from 'react'
import {
  Dimensions, type StyleProp, type EmitterSubscription,
} from 'react-native'
import { Picker } from '@react-native-picker/picker'

import CustomKeyboard from '../CustomKeyboard'
import { type Option } from '../AbstractSelectInput/AbstractSelectInput'

import styles from './styles'

type Props = {
  buttonsTextStyle?: StyleProp<Record<string, unknown>>,
  buttonsViewStyle?: StyleProp<Record<string, unknown>>,
  cancelKeyText: string,
  onCancel: () => void,
  onSubmit: (value: string) => void,
  onValueChange: (value: string) => void,
  options: Option[],
  pickerItemStyle?: StyleProp<Record<string, unknown>>,
  pickerViewStyle?: StyleProp<Record<string, unknown>>,
  submitKeyText: string,
  value: string,
}

type State = {
  value: string,
  visible: boolean,
  width: number,
}

class PickerKeyboard extends Component<Props, State> {
  picker: ComponentRef<typeof Picker<string>> | null
  dimensionsListener: EmitterSubscription | undefined
  constructor (props: Props) {
    super(props)

    this.picker = null
    this.state = {
      value: props.value,
      visible: false,
      width: Dimensions.get('window').width,
    }
  }

  componentDidMount (): void {
    this.dimensionsListener = Dimensions.addEventListener('change', this.updateDimensions)
  }

  componentWillUnmount (): void {
    this.dimensionsListener?.remove()
  }

  updateDimensions = (): void => {
    this.setState({
      width: Dimensions.get('window').width,
    })
  }

  setPickerRef = (component: ComponentRef<typeof Picker<string>> | null): void => {
    this.picker = component
  }

  componentDidUpdate (prevProps: Props): void {
    const { value } = this.props
    const prevValue = prevProps.value

    if (value !== prevValue) {
      this.setState({
        value,
      })
    }
  }

  focus (): void {
    this.setVisible(true)
  }

  onCancelPress = (): void => {
    const { onCancel } = this.props

    this.setVisible(false)
    onCancel?.()
  }

  onSubmitPress = (): void => {
    const { onSubmit } = this.props
    const { value } = this.state

    this.setVisible(false)
    onSubmit?.(value)
  }

  onValueChange = (value: string): void => {
    const { onValueChange } = this.props
    onValueChange?.(value)

    this.setState({
      value,
    })
  }

  setVisible = (visible: boolean): void => {
    this.setState({
      visible,
    })
  }

  render (): JSX.Element {
    const { value, visible, width } = this.state
    const {
      buttonsTextStyle,
      buttonsViewStyle,
      pickerItemStyle,
      pickerViewStyle,
      cancelKeyText,
      submitKeyText,
      options,
    } = this.props

    return (
      <CustomKeyboard
        buttonsTextStyle={buttonsTextStyle}
        buttonsViewStyle={buttonsViewStyle}
        cancelKeyText={cancelKeyText}
        onCancelPress={this.onCancelPress}
        onSubmitPress={this.onSubmitPress}
        submitKeyText={submitKeyText}
        visible={visible}
      >
        <Picker<string>
          ref={this.setPickerRef}
          onValueChange={this.onValueChange}
          selectedValue={value}
          style={[styles.pickerview, pickerViewStyle, { width }]}
          itemStyle={pickerItemStyle}
        >
          {options.map(option => (
            <Picker.Item
              key={option.value}
              value={option.value}
              label={option.label}
            />
          ))}
        </Picker>
      </CustomKeyboard>
    )
  }
}

export default PickerKeyboard
