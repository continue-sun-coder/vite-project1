// 登录接口需要携带的参数类型
export interface loginFormData {
  username: string
  password: string
}

// 登录接口返回的数据类型
export interface loginResponseData {
  code: number
  data: {
    token: string
  }
}

// 用户信息接口返回的数据类型
export interface userInfoReponseData {
  code: number
  data: {
    name: string
    avatar: string
    roles: string[]
  }
}
