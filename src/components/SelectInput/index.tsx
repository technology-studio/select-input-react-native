import { Platform } from 'react-native'

import {
  SelectInput as SelectInputIos,
  type Props as PropsIos,
} from './index.ios'
import {
  SelectInput as SelectInputAndroid,
  type Props as PropsAndroid,
} from './index.android'

export const SelectInput = Platform.select({
  ios: SelectInputIos as unknown,
  android: SelectInputAndroid as unknown,
}) as React.ComponentType<PropsIos & PropsAndroid>
