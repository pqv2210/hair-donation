export enum Unauthorized {
  status = 401,
  message = "messageExpire",
}

export enum ResponseAPISuccess {
  code = 200,
}

export enum ResponseKind {
  ok = "ok",
  badData = "bad-data",
  unauthorized = "unauthorized",
  forbidden = "forbidden",
  notFound = "not-found",
  rejected = "rejected",
  unknown = "unknown",
  server = "server",
  timeout = "timeout",
  cannotConnect = "cannot-connect",
}

export enum ResponseProblem {
  connection = "CONNECTION_ERROR",
  network = "NETWORK_ERROR",
  timeout = "TIMEOUT_ERROR",
  server = "SERVER_ERROR",
  unknown = "UNKNOWN_ERROR",
  client = "CLIENT_ERROR",
  cancel = "CANCEL_ERROR",
}
