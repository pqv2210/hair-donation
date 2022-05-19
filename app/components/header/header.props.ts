import { ViewStyle, TextStyle } from "react-native"
import { TxKeyPath } from "../../i18n"
import { IconTypes } from "../icon/icons"

export interface HeaderProps {
  headerTx?: TxKeyPath
  headerText?: string
  leftIcon?: IconTypes
  onLeftPress?(): void
  rightIcon?: IconTypes
  onRightPress?(): void
  style?: ViewStyle
  titleStyle?: TextStyle
  titleElement?: Element
  rightElement?: Element
  animated?: boolean
}
