import * as React from "react"
import { View, ViewStyle, ImageStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, commonStyle, spacing } from "../../theme"
import { Text } from "../"
import { flatten, mergeAll } from "ramda"
import Animated, { Extrapolate } from "react-native-reanimated"

const HEADER_MAX_HEIGHT = 170
const HEADER_MIN_HEIGHT = 40
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT

const WRAP_CONTENT: ViewStyle = {
  paddingTop: HEADER_MAX_HEIGHT,
  marginBottom: 0,
}

const WRAP_IMAGE: ViewStyle = {
  backgroundColor: color.primary,
  height: HEADER_MAX_HEIGHT,
  position: "absolute",
  right: 0,
  top: 0,
  left: 0,
}

const IMAGE: ImageStyle = {
  height: HEADER_MAX_HEIGHT,
  resizeMode: "contain",
  width: "auto",
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
}

const WRAP_TITLE: ViewStyle = {
  ...commonStyle.CENTER,
  marginTop: spacing["small+"],
  position: "absolute",
  right: 0,
  top: 0,
  left: 0,
}

export interface CollapsibleScrollViewProps {
  title: string
  renderContent: JSX.Element
  uri: string
}

export const CollapsibleScrollView = observer(function CollapsibleScrollView(
  props: CollapsibleScrollViewProps,
) {
  const { title, renderContent, uri } = props
  const scrollY = new Animated.Value(0)

  const headerTranslate = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -130],
    extrapolate: Extrapolate.CLAMP,
  })

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0.5, 0],
    extrapolate: Extrapolate.CLAMP,
  })
  const imageTranslate = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 0],
    extrapolate: Extrapolate.CLAMP,
  })

  const titleScale = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 1.2],
    extrapolate: Extrapolate.CLAMP,
  })
  const titleTranslate = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 0, 0],
    extrapolate: Extrapolate.CLAMP,
  })

  const onScroll = Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
    useNativeDriver: true,
  })

  const wrapImageStyle = mergeAll(
    flatten([WRAP_IMAGE, { transform: [{ translateY: headerTranslate }] }]),
  )

  const imageStyle = mergeAll(
    flatten([
      IMAGE,
      {
        opacity: imageOpacity,
        transform: [{ translateY: imageTranslate }],
      },
    ]),
  )

  const titleStyle = mergeAll(
    flatten([
      WRAP_TITLE,
      {
        transform: [{ scale: titleScale }, { translateY: titleTranslate }],
      },
    ]),
  )

  return (
    <View style={commonStyle.FLEX}>
      <Animated.ScrollView
        contentContainerStyle={WRAP_CONTENT}
        scrollEventThrottle={16}
        onScroll={onScroll}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        {renderContent}
      </Animated.ScrollView>
      <Animated.View pointerEvents="none" style={wrapImageStyle}>
        <Animated.Image style={imageStyle} source={{ uri }} />
      </Animated.View>
      <Animated.View style={titleStyle}>
        <Text color={color.white} text={title} />
      </Animated.View>
    </View>
  )
})
