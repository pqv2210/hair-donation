import * as Font from "expo-font"

export const initFonts = async () => {
  await Font.loadAsync({
    OpenSansBold: require("./OpenSans-Bold.ttf"),
    OpenSansBoldItalic: require("./OpenSans-BoldItalic.ttf"),
    OpenSansExtraBold: require("./OpenSans-ExtraBold.ttf"),
    OpenSansItalic: require("./OpenSans-Italic.ttf"),
    OpenSansLight: require("./OpenSans-Light.ttf"),
    OpenSansRegular: require("./OpenSans-Regular.ttf"),
    OpenSansSemiBold: require("./OpenSans-SemiBold.ttf"),
  })
}
