import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { navigationRef, useBackButtonHandler } from "./navigation-utilities"
import { Screens, SCREEN_OPTIONS } from "../utils"
import { BottomTabNavigator } from "./bottom-navigator"

export type AppStackParamList = {
  [Screens.main]: undefined
}

const Stack = createNativeStackNavigator<AppStackParamList>()

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = (props: NavigationProps) => {
  useBackButtonHandler(canExit)
  return (
    <NavigationContainer ref={navigationRef} {...props}>
      <Stack.Navigator screenOptions={SCREEN_OPTIONS} initialRouteName={Screens.main}>
        <Stack.Screen name={Screens.main} component={BottomTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

AppNavigator.displayName = "AppNavigator"

const exitRoutes = [Screens.main]
export const canExit = (routeName: Screens) => exitRoutes.includes(routeName)
