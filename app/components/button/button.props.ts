import { ViewStyle, TextStyle, TouchableOpacityProps } from "react-native"
import { TxKeyPath } from "../../i18n"
import { FontsTypes } from "../text/text.props"

export const scales = {
  small: 0.98,
  large: 0.9,
  none: 1,
}
type ScaleType = keyof typeof scales

export interface ButtonProps extends TouchableOpacityProps {
  tx?: TxKeyPath
  text?: string
  style?: ViewStyle
  textStyle?: TextStyle
  children?: React.ReactNode
  color?: string
  textColor?: string
  iconColor?: string
  loading?: boolean
  size?: number
  font?: FontsTypes
  scale?: ScaleType
  txOptions?: any
  loadingColor?: string
}