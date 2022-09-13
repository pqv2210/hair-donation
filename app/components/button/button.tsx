import * as React from "react"
import { ButtonProps, scales } from "./button.props"
import { mergeAll, flatten } from "ramda"
import { ActivityIndicator, Animated, TouchableWithoutFeedback } from "react-native"
import { Text } from ".."
import { color as AppColor } from "../../theme"

export function Button(props: ButtonProps) {
  const {
    tx,
    text,
    style: styleOverride,
    textStyle: textStyleOverride,
    children,
    color,
    textColor,
    loading,
    size,
    txOptions,
    scale = "small",
    font,
    loadingColor,
    ...rest
  } = props

  const animation = new Animated.Value(0)

  const inputRange = [0, 1]

  const outputRange = [1, scales[scale ?? "large"]]

  const scaleType = animation.interpolate({ inputRange, outputRange })

  const onPressIn = () => {
    Animated.spring(animation, {
      toValue: 1,
      useNativeDriver: true,
    }).start()
  }

  const onPressOut = () => {
    Animated.spring(animation, {
      toValue: 0,
      useNativeDriver: true,
    }).start()
  }

  const viewStyle = React.useMemo(
    () => mergeAll(flatten([styleOverride, color && { backgroundColor: color }])),
    [styleOverride, color],
  )

  const textStyle = mergeAll(
    flatten([textStyleOverride, size && { fontSize: size }, textColor && { color: textColor }]),
  )

  const content = children || (
    <Text tx={tx} text={text} font={font} style={textStyle} txOptions={txOptions} />
  )

  return (
    <TouchableWithoutFeedback
      style={viewStyle}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      disabled={loading}
      {...rest}
    >
      <Animated.View
        style={{
          transform: [
            {
              scale: scaleType,
            },
          ],
          ...viewStyle,
        }}
      >
        {loading ? <ActivityIndicator color={loadingColor ?? AppColor.white} /> : content}
      </Animated.View>
    </TouchableWithoutFeedback>
  )
}
