import { GeneralApiProblem } from "./api-problem"

export type GetDataResult = { kind: "ok"; data: any } | GeneralApiProblem
