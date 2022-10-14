export interface ReactotronConfig {
  name?: string
  host?: string
  useAsyncStorage?: boolean
  clearOnLoad?: boolean
  state?: {
    initial?: boolean
    snapshots?: boolean
  }
}

export const DEFAULT_REACTOTRON_CONFIG: ReactotronConfig = {
  clearOnLoad: true,
  host: "localhost",
  useAsyncStorage: false,
  state: {
    initial: true,
    snapshots: false,
  },
}

export const DEFAULT_REACTOTRON_WS_URI = "ws://localhost:9090"
