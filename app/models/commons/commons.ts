import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withRootStore } from "../extensions/with-root-store"
import { Screens } from "../../utils"

export const CommonsModel = types
  .model("Commons")
  .extend(withRootStore)
  .props({
    name: types.optional(types.string, Screens.home),
  })
  .actions((self) => ({
    setMenu: (menu: Screens) => {
      self.name = menu
    },
  }))

type CommonsType = Instance<typeof CommonsModel>
export interface Commons extends CommonsType {}
type CommonsSnapshotType = SnapshotOut<typeof CommonsModel>
export interface CommonsSnapshot extends CommonsSnapshotType {}
export const createCommonsDefaultModel = () => types.optional(CommonsModel, {})
