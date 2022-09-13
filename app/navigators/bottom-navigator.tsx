import React from "react"
import { observer } from "mobx-react-lite"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Screens, SCREEN_OPTIONS } from "../utils"
import { DonateScreen, HomeScreen, MapScreen, RegisterScreen, SettingScreen } from "../screens"
import { BottomMenu } from "../components"

export type BottomTabNavigatorType = {
  [Screens.home]: undefined
  [Screens.map]: undefined
  [Screens.register]: undefined
  [Screens.donate]: undefined
  [Screens.setting]: undefined
}

const Tab = createBottomTabNavigator<BottomTabNavigatorType>()

export const BottomTabNavigator = observer(() => {
  return (
    <Tab.Navigator screenOptions={SCREEN_OPTIONS} tabBar={(props) => <BottomMenu {...props} />}>
      <Tab.Screen name={Screens.home} component={HomeScreen} />
      <Tab.Screen name={Screens.map} component={MapScreen} />
      <Tab.Screen name={Screens.register} component={RegisterScreen} />
      <Tab.Screen name={Screens.donate} component={DonateScreen} />
      <Tab.Screen name={Screens.setting} component={SettingScreen} />
    </Tab.Navigator>
  )
})
