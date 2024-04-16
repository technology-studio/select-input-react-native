import React from 'react'
import { Picker } from '@react-native-picker/picker'
import {
  type StyleProp,
  View,
  type ViewStyle,
} from 'react-native'

import { AbstractSelectInput } from '../AbstractSelectInput'
import {
  type Props as AbstractSelectInputProps,
} from '../AbstractSelectInput/AbstractSelectInput'

import { styles } from './styles.android'

export type Props = AbstractSelectInputProps & {
  mode?: 'dialog' | 'dropdown',
  labelStyle?: StyleProp<ViewStyle>,
  style?: StyleProp<ViewStyle>,
}

export class SelectInput extends AbstractSelectInput<Props> {
  static defaultProps = {
    enabled: true,
    mode: 'dialog',
    options: [{ value: '0', label: '0' }],
    value: '0',
  }

  render (): JSX.Element {
    const { enabled, labelStyle, mode, options, style } = this.props
    const { selectedValue } = this.state

    return (
      <View style={style}>
        <Picker
          enabled={enabled}
          onValueChange={this.onSubmit}
          style={labelStyle ?? styles.defaultlabelstyle}
          selectedValue={selectedValue}
          mode={mode}
        >
          {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
          {(options!).map(option => (
            <Picker.Item
              key={option.value}
              value={option.value}
              label={option.label}
            />
          ))}
        </Picker>
      </View>
    )
  }
}
