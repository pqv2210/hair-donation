import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { CommonsModel } from "../commons/commons"

export const RootStoreModel = types.model("RootStore").props({
  commons: types.optional(CommonsModel, {}),
})

export interface RootStore extends Instance<typeof RootStoreModel> {}
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
