import * as React from "react"
import { ImageStyle, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, commonStyle, spacing } from "../../theme"
import { Button, Icon, Row, Text } from "../"
import { BottomButtonIndex, isIPhoneX, Screens } from "../../utils"
import { IconTypes } from "../icon/icons"
import { useStores } from "../../models"
import { TxKeyPath } from "../../i18n"
import { NavigationHelpers, ParamListBase, TabNavigationState } from "@react-navigation/native"
import { BottomTabNavigationEventMap } from "@react-navigation/bottom-tabs/lib/typescript/src/types"
import { flatten, mergeAll } from "ramda"

const CONTAINER: ViewStyle = {
  ...commonStyle.SHADOW,
  backgroundColor: color.white,
  paddingBottom: isIPhoneX() ? spacing.medium : spacing.none,
}

const BUTTON: ViewStyle = {
  ...commonStyle.FLEX,
  ...commonStyle.CENTER,
  paddingVertical: spacing["tiny+"],
  borderTopColor: color.primary,
}

const ICON: ImageStyle = { marginBottom: spacing.tiny }

export interface BottomMenuProps {
  state: TabNavigationState<ParamListBase>
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>
}

export const BottomMenu = observer(function BottomMenu(props: BottomMenuProps) {
  const { commons } = useStores()
  const { state, navigation } = props

  const onPress = (route: Screens, index: number) => () => {
    const event = navigation.emit({
      type: "tabPress",
      target: route,
      canPreventDefault: true,
    })

    if (state.index !== index && !event.defaultPrevented) {
      navigation.navigate(route)
      commons.setMenu(route)
    }
  }

  const renderButton = (name: TxKeyPath, icon: IconTypes, route: Screens, index: number) => {
    const isRoute = commons.name === route
    const style = mergeAll(flatten([BUTTON, { borderTopWidth: isRoute ? 2 : 0 }]))

    return (
      <Button scale="small" style={style} onPress={onPress(route, index)}>
        <Icon style={ICON} size={22} color={isRoute ? color.primary : color.black} icon={icon} />
        <Text
          style={commonStyle.TEXT_CENTER}
          color={isRoute ? color.primary : color.black}
          numberOfLines={2}
          font={isRoute ? "huge" : "regular"}
          size={11}
          tx={name}
        />
      </Button>
    )
  }

  return (
    <Row style={CONTAINER}>
      {renderButton("tx.home", "home", Screens.home, BottomButtonIndex.home)}
      {renderButton("tx.map", "map", Screens.map, BottomButtonIndex.map)}
      {renderButton("tx.register", "register", Screens.register, BottomButtonIndex.register)}
      {renderButton("tx.donate", "donate", Screens.donate, BottomButtonIndex.donate)}
      {renderButton("tx.setting", "setting", Screens.setting, BottomButtonIndex.setting)}
    </Row>
  )
})
