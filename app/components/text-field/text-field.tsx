import React from "react"
import { TextInput, TextInputProps, TextStyle, View, ViewStyle } from "react-native"
import { color, spacing } from "../../theme"
import { Text } from "../text/text"
import { mergeAll, flatten } from "ramda"
import { Button, Icon, Row } from ".."
import { TxKeyPath } from "../../i18n"
import { checkStringIsEmpty, translate } from "../../utils"
import { fonts } from "../text/text.props"

const CONTAINER: ViewStyle = {
  paddingVertical: spacing.none,
}

const INPUT: TextStyle = {
  fontFamily: fonts.regular,
  color: color.text,
  minHeight: 44,
  fontSize: 14,
  backgroundColor: color.palette.white,
}

const BTN: ViewStyle = {
  position: "absolute",
  right: 0,
}

export interface TextFieldProps extends TextInputProps {
  placeholderTx?: TxKeyPath
  placeholder?: string
  labelTx?: TxKeyPath
  style?: ViewStyle | ViewStyle[]
  inputStyle?: TextStyle | TextStyle[]
  forwardedRef?: any
  textStyle?: TextStyle | TextStyle[]
  required?: boolean
}

const enhance = (style, styleOverride) => {
  return mergeAll(flatten([style, styleOverride]))
}

export function TextField(props: TextFieldProps) {
  const {
    placeholderTx,
    placeholder,
    labelTx,
    style: styleOverride,
    inputStyle: inputStyleOverride,
    forwardedRef,
    textStyle,
    secureTextEntry,
    required,
    ...rest
  } = props

  const [pass, showPass] = React.useState(secureTextEntry)
  const setShowPass = () => {
    showPass((data) => !data)
  }

  const containerStyle: ViewStyle = enhance(CONTAINER, styleOverride)

  const inputStyle: TextStyle = enhance(INPUT, inputStyleOverride)

  const actualPlaceholder = placeholderTx ? translate(placeholderTx) : placeholder

  React.useEffect(() => {
    if (secureTextEntry) {
      showPass(true)
    }
  }, [])

  return (
    <View style={containerStyle}>
      {!checkStringIsEmpty(labelTx) && (
        <Text style={textStyle}>
          {translate(labelTx)}
          {required && <Text color={color.error} text={" *"} />}
        </Text>
      )}
      <Row>
        <TextInput
          secureTextEntry={pass}
          placeholder={actualPlaceholder}
          placeholderTextColor={color.placeholder}
          underlineColorAndroid={color.transparent}
          {...rest}
          style={inputStyle}
          ref={forwardedRef}
        />
        {secureTextEntry && (
          <Button style={BTN} onPress={setShowPass}>
            <Icon size={18} icon={pass ? "eye" : "blindEye"} color={color.primary} />
          </Button>
        )}
      </Row>
    </View>
  )
}
