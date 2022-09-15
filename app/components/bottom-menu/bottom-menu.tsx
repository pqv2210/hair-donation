import * as React from "react"
import { ImageStyle, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, commonStyle, spacing } from "../../theme"
import { Row } from "../"
import { BottomButtonIndex, isIPhoneX, Screens } from "../../utils"
import { IconTypes } from "../icon/icons"
import { useStores } from "../../models"
import { TxKeyPath } from "../../i18n"
import { NavigationHelpers, ParamListBase, TabNavigationState } from "@react-navigation/native"
import { BottomTabNavigationEventMap } from "@react-navigation/bottom-tabs/lib/typescript/src/types"
import { BottomButton } from "./bottom-button"

const CONTAINER: ViewStyle = {
  ...commonStyle.SHADOW,
  backgroundColor: color.white,
  paddingBottom: isIPhoneX() ? spacing.medium : spacing.none,
}

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

  const renderButton = (tx: TxKeyPath, icon: IconTypes, route: Screens, index: number) => (
    <BottomButton
      icon={icon}
      tx={tx}
      onPress={onPress(route, index)}
      isRoute={commons.name === route}
    />
  )

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
