import { ApisauceInstance, create, ApiResponse } from "apisauce"
import { getErrorMessage, getGeneralApiProblem } from "./api-problem"
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config"
import * as Types from "./api.types"
import * as storage from "../../utils/storage"
import { rootStore } from "../../models"
import {
  checkStringIsEmpty,
  ResponseAPISuccess,
  ResponseKind,
  translate,
  Unauthorized,
} from "../../utils"
import common from "../../utils/string/common"

export class Api {
  apisauce: ApisauceInstance
  config: ApiConfig

  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
  }

  async setup() {
    const token = await storage.loadString(common.ACCESS_TOKEN)

    this.apisauce = create({
      baseURL: this.config.url,
      timeout: 0,
      headers: {
        Accept: "application/json",
        Authorization: token !== null ? `Bearer ${token}` : "",
      },
    })
  }

  async processExpire(response: ApiResponse<any>, refreshToken: string) {
    const refreshResponse: any = await this.apisauce.post("auth/refresh", null, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    })
    if (refreshResponse.status === 200) {
      this.apisauce.setHeaders({
        Authorization: `Bearer ${refreshResponse?.data?.data?.accessToken}`,
      })
      await storage.saveString(common.ACCESS_TOKEN, refreshResponse?.data?.data?.accessToken)
      const callBackResponse = await this.apisauce.axiosInstance.request({
        baseURL: this.config.url,
        url: response.config.url,
        method: response.config.method,
        headers: {
          Authorization: `Bearer ${refreshResponse?.data?.data?.accessToken}`,
        },
      })
      if (callBackResponse.status === 200) {
        return { kind: ResponseKind.ok, data: callBackResponse.data }
      } else {
        return { kind: ResponseKind.badData, data: getErrorMessage(callBackResponse.data) }
      }
    } else {
      // rootStore.signIn.onSignOut()
      return { kind: ResponseKind.badData, data: getErrorMessage(refreshResponse.data) }
    }
  }

  async processData(response: ApiResponse<any>): Promise<Types.GetDataResult> {
    if (!response.ok) {
      const refreshToken = await storage.loadString(common.REFRESH_TOKEN)
      if (
        response.status === Unauthorized.status &&
        response.data.message === Unauthorized.message
      ) {
        if (checkStringIsEmpty(refreshToken)) {
          return this.processExpire(response, refreshToken)
        } else {
          // rootStore.signIn.onSignOut()
          return { kind: ResponseKind.badData, data: translate("errors.default") }
        }
      } else {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }
    }
    try {
      const data = response.data
      if (data.status === ResponseAPISuccess.code) {
        return { kind: ResponseKind.ok, data: data }
      } else {
        return { kind: ResponseKind.badData, data: getErrorMessage(response.data) }
      }
    } catch {
      return { kind: ResponseKind.badData, data: getErrorMessage(response.data) }
    }
  }

  // async doSignIn(data: DataSignInProps): Promise<Types.GetDataResult> {
  //   const response: ApiResponse<any> = await this.apisauce.post(`auth/loginByEmail`, data)
  //   if (response.status === common.UNAUTHORIZED.status) {
  //     return { kind: ResponseKind.badData, data: translate("errors.wrongEmailOrPassword") }
  //   }
  //   return this.processData(response)
  // }
}
