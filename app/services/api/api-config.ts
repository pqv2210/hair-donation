import { BASE_DOMAIN } from "../../utils"

export interface ApiConfig {
  url: string
  timeout: number
}

export const DEFAULT_API_CONFIG: ApiConfig = {
  url: BASE_DOMAIN,
  timeout: 10000,
}
