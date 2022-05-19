import { ApiResponse } from "apisauce"
import { rootStore } from "../../models"
import { ResponseKind, ResponseProblem, translate } from "../../utils"

export type GeneralApiProblem =
  | { kind: ResponseKind.timeout; temporary: true }
  | { kind: ResponseKind.cannotConnect; temporary: true }
  | { kind: ResponseKind.server; data: string }
  | { kind: ResponseKind.unauthorized; data: string }
  | { kind: ResponseKind.forbidden; data: string }
  | { kind: ResponseKind.notFound; data: string }
  | { kind: ResponseKind.rejected; data: string }
  | { kind: ResponseKind.unknown; temporary: true }
  | { kind: ResponseKind.badData; data: any }

export function getErrorMessage(data: any): string {
  try {
    if (data.message != null) {
      return data.message
    } else {
      return translate("errors.default")
    }
  } catch (e) {
    return translate("errors.default")
  }
}

export function getGeneralApiProblem(response: ApiResponse<any>): GeneralApiProblem | void {
  switch (response.problem) {
    case ResponseProblem.connection:
    case ResponseProblem.network:
      return { kind: ResponseKind.cannotConnect, temporary: true }
    case ResponseProblem.timeout:
      // rootStore.commons.error(translate("errors.timeout"))
      return { kind: ResponseKind.timeout, temporary: true }
    case ResponseProblem.server:
      // rootStore.commons.error(translate("errors.server"))
      return { kind: ResponseKind.server, data: getErrorMessage(response.data) }
    case ResponseProblem.unknown:
      // rootStore.commons.error(translate("errors.default"))
      return { kind: ResponseKind.unknown, temporary: true }
    case ResponseProblem.client:
      switch (response.status) {
        case 401:
          return { kind: ResponseKind.unauthorized, data: getErrorMessage(response.data) }
        case 403:
          return { kind: ResponseKind.forbidden, data: getErrorMessage(response.data) }
        case 404:
          return { kind: ResponseKind.notFound, data: getErrorMessage(response.data) }
        default:
          return { kind: ResponseKind.rejected, data: getErrorMessage(response.data) }
      }
    case ResponseProblem.cancel:
      return null
  }
}