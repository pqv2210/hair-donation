import { TextStyle, ViewStyle } from "react-native"
import { color, isNotch } from "."
import { isIOS } from "../utils"

export const spacing = {
  "none": 0,
  "tiny": 3,
  "tiny+": 5,
  "small": 10,
  "small+": 12,
  "medium": 15,
  "large": 20,
  "large+": 30,
  "huge": 60,
}

export const commonStyle = {
  CENTER: {
    justifyContent: "center",
    alignItems: "center",
  } as ViewStyle,
  TEXT_CENTER: {
    textAlign: "center",
  } as TextStyle,
  FLEX: {
    flex: 1,
  } as ViewStyle,
  ROW: {
    flexDirection: "row",
  } as ViewStyle,
  SHADOW: {
    shadowColor: color.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  } as ViewStyle,
  LIGHT_SHADOW: {
    shadowColor: color.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  } as ViewStyle,
  DARK_SHADOW: {
    shadowColor: color.black,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 15,
  } as ViewStyle,
  HEADER: {
    paddingTop: isIOS ? (isNotch ? 40 : 20) : spacing.large,
  } as ViewStyle,
}
