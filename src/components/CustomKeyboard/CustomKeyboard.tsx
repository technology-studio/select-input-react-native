import React, { Component } from 'react'
import {
  Dimensions, Modal, type StyleProp, TouchableWithoutFeedback, View,
} from 'react-native'

import { KeyboardButton } from '../KeyboardButton'

import { styles } from './styles'

type Props = {
  buttonsTextStyle?: StyleProp<Record<string, unknown>>,
  buttonsViewStyle?: StyleProp<Record<string, unknown>>,
  cancelKeyText: string,
  onCancelPress: () => void,
  onSubmitPress: () => void,
  submitKeyText: string,
  visible: boolean,
  children: JSX.Element | null,
}

export class CustomKeyboard extends Component<Props> {
  state = {
    width: Dimensions.get('window').width,
  }

  updateDimensions = (): void => {
    this.setState({
      width: Dimensions.get('window').width,
    })
  }

  onCancelPress = (): void => {
    const { onCancelPress } = this.props
    onCancelPress()
  }

  onSubmitPress = (): void => {
    const { onSubmitPress } = this.props
    onSubmitPress()
  }

  render (): JSX.Element {
    const { width } = this.state
    const {
      buttonsTextStyle,
      buttonsViewStyle,
      visible,
      cancelKeyText,
      submitKeyText,
      children,
    } = this.props

    return (
      <Modal
        animationType={'slide'}
        transparent={true}
        visible={visible}
        onOrientationChange={this.updateDimensions}
        supportedOrientations={[
          'portrait',
          'landscape',
          'landscape-left',
          'landscape-right',
        ]}
      >
        <TouchableWithoutFeedback>
          <View style={styles.container}>
            <View style={[styles.modal, { width }]}>
              <View style={[styles.buttonview, buttonsViewStyle, { width }]}>
                <KeyboardButton
                  onPress={this.onCancelPress}
                  text={cancelKeyText}
                  textAlign={'left'}
                  textStyle={buttonsTextStyle}
                />

                <KeyboardButton
                  onPress={this.onSubmitPress}
                  text={submitKeyText}
                  textAlign={'right'}
                  textStyle={buttonsTextStyle}
                />
              </View>

              <View>{children}</View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    )
  }
}
