import { onSnapshot } from "mobx-state-tree"
import { RootStoreModel, RootStore } from "./root-store"
import { Environment } from "../environment"
import * as storage from "../../utils/storage"

export async function createEnvironment() {
  const env = new Environment()
  await env.setup()
  return env
}

export let rootStore: RootStore

export async function setupRootStore() {
  let data: any

  const env = await createEnvironment()
  try {
    data = {}
    rootStore = RootStoreModel.create(data, env)
  } catch (e) {
    rootStore = RootStoreModel.create({}, env)

    __DEV__ && console.tron.error(e.message, null)
  }

  if (__DEV__) {
    env.reactotron.setRootStore(rootStore, data)
  }

  return rootStore
}
