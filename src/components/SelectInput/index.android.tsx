import React from 'react'
import { Picker } from '@react-native-picker/picker'
import {
  View,
} from 'react-native'

import { AbstractSelectInput } from '../AbstractSelectInput'
import {
  type Option,
  type Props as AbstractSelectInputProps,
} from '../AbstractSelectInput/AbstractSelectInput'

import { styles } from './styles.android'

export type Props = AbstractSelectInputProps & {
  mode?: 'dialog' | 'dropdown',
  labelStyle?: Record<string, unknown>,
  style?: Record<string, unknown>,
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
          style={(labelStyle != null) ? labelStyle : styles.defaultlabelstyle}
          selectedValue={selectedValue}
          mode={mode}
        >
          {(options as Option[]).map(option => (
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