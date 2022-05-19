import React from "react"
import { View, ViewStyle, TextStyle, Animated } from "react-native"
import { HeaderProps } from "./header.props"
import { Text, Icon, Button } from ".."
import { color, spacing } from "../../theme"
import { translate } from "../../utils"
import { useNavigation } from "@react-navigation/native"

const ROOT: ViewStyle = {
  flexDirection: "row",
  paddingHorizontal: spacing["tiny+"],
  alignItems: "center",
  paddingVertical: spacing.small,
  justifyContent: "flex-start",
  backgroundColor: color.primary,
}

const RIGHT: ViewStyle = {
  width: 30,
  height: 30,
}

const TITLE: TextStyle = {
  flex: 1,
  marginLeft: spacing.small,
}

export function Header(props: HeaderProps) {
  const {
    onLeftPress,
    onRightPress,
    rightIcon,
    leftIcon,
    headerText,
    headerTx,
    style,
    titleStyle,
    rightElement,
    titleElement,
    animated,
  } = props

  const navigation = useNavigation()

  const header = headerText || (headerTx && translate(headerTx)) || ""

  const onPressLeft = () => {
    if (leftIcon === "back") {
      navigation.goBack()
    } else {
      onLeftPress()
    }
  }

  const Container = animated ? Animated.View : View

  return (
    <Container style={{ ...ROOT, ...style }}>
      {leftIcon && (
        <Button onPress={onPressLeft}>
          <Icon color={color.white} icon={leftIcon} />
        </Button>
      )}
      <View style={TITLE}>
        {titleElement ?? (
          <Text
            numberOfLines={2}
            color={color.white}
            size={16}
            style={{ ...titleStyle }}
            text={header}
          />
        )}
      </View>
      {rightIcon || rightElement ? (
        rightElement ?? (
          <Button onPress={onRightPress}>
            <Icon color={color.white} icon={rightIcon} />
          </Button>
        )
      ) : (
        <View style={RIGHT} />
      )}
    </Container>
  )
}
