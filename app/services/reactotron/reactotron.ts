import { Tron } from "./tron"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { ArgType } from "reactotron-core-client"
import { RootStore } from "../../models/root-store/root-store"
import { onSnapshot } from "mobx-state-tree"
import { ReactotronConfig, DEFAULT_REACTOTRON_CONFIG } from "./reactotron-config"
import { mst } from "reactotron-mst"
import { clear } from "../../utils/storage"
import { goBack, resetRoot, navigate } from "../../navigators/navigation-utilities"
import { Platform } from "react-native"

declare global {
  interface Console {
    tron: typeof Tron
  }
}

const noop = () => undefined

if (__DEV__) {
  console.tron = Tron
  console.log = Tron.log
} else {
  console.tron = {
    benchmark: noop,
    clear: noop,
    close: noop,
    configure: noop,
    connect: noop,
    display: noop,
    error: noop,
    image: noop,
    log: noop,
    logImportant: noop,
    onCustomCommand: noop,
    overlay: noop,
    reportError: noop,
    send: noop,
    startTimer: noop,
    storybookSwitcher: noop,
    use: noop,
    useReactNative: noop,
    warn: noop,
  }
}

export class Reactotron {
  config: ReactotronConfig

  rootStore: any

  constructor(config: ReactotronConfig = DEFAULT_REACTOTRON_CONFIG) {
    this.config = {
      host: "localhost",
      useAsyncStorage: true,
      ...config,
      state: {
        initial: false,
        snapshots: false,
        ...(config && config.state),
      },
    }
  }

  setRootStore(rootStore: any, initialData: any) {
    if (__DEV__) {
      rootStore = rootStore as RootStore
      this.rootStore = rootStore

      const { initial, snapshots } = this.config.state
      const name = "ROOT STORE"

      if (initial) {
        console.tron.display({ name, value: initialData, preview: "Initial State" })
      }
      if (snapshots) {
        onSnapshot(rootStore, (snapshot) => {
          console.tron.display({ name, value: snapshot, preview: "New State" })
        })
      }

      console.tron.trackMstNode(rootStore)
    }
  }

  async setup() {
    if (__DEV__) {
      Tron.configure({
        name: this.config.name || require("../../../package.json").name,
        host: this.config.host,
      })

      if (Platform.OS !== "web") {
        if (this.config.useAsyncStorage) {
          Tron.setAsyncStorageHandler(AsyncStorage)
        }
        Tron.useReactNative({
          asyncStorage: this.config.useAsyncStorage ? undefined : false,
        })
      }

      const RX = /postProcessSnapshot|@APPLY_SNAPSHOT/

      Tron.use(
        mst({
          filter: (event) => RX.test(event.name) === false,
        }),
      )

      Tron.connect()

      Tron.onCustomCommand({
        title: "Reset Root Store",
        description: "Resets the MST store",
        command: "resetStore",
        handler: () => {
          console.tron.log("resetting store")
          clear()
        },
      })

      Tron.onCustomCommand({
        title: "Reset Navigation State",
        description: "Resets the navigation state",
        command: "resetNavigation",
        handler: () => {
          console.tron.log("resetting navigation state")
          resetRoot({ index: 0, routes: [] })
        },
      })

      Tron.onCustomCommand({
        command: "navigateTo",
        handler: (args) => {
          const { route } = args
          if (route) {
            console.log(`Navigating to: ${route}`)
            navigate(route)
          } else {
            console.log("Could not navigate. No route provided.")
          }
        },
        title: "Navigate To Screen",
        description: "Navigates to a screen by name.",
        args: [
          {
            name: "route",
            type: ArgType.String,
          },
        ],
      })

      Tron.onCustomCommand({
        title: "Go Back",
        description: "Goes back",
        command: "goBack",
        handler: () => {
          console.tron.log("Going back")
          goBack()
        },
      })

      if (this.config.clearOnLoad) {
        Tron.clear()
      }
    }
  }
}
