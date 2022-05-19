import { StyleProp, ViewStyle } from "react-native"
import { TxKeyPath } from "../../i18n"

export interface CheckboxProps {
  style?: StyleProp<ViewStyle>
  outlineStyle?: StyleProp<ViewStyle>
  fillStyle?: StyleProp<ViewStyle>
  value?: boolean
  text?: string
  tx?: TxKeyPath
  multiline?: boolean
  onToggle?: (newValue: boolean) => void
}
