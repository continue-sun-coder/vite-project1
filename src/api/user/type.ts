// 用户登录接口
export interface loginForm {
  username: string
  password: string
}

// 定义全部接口返回数据都拥有的类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

// 登录接口返回数据类型
export interface loginResponseData extends ResponseData {
  data: string
}

// 用户信息返回数据类型
export interface userReponseData extends ResponseData {
  data: {
    routes: string[]
    buttons: string[]
    roles: string[]
    name: string
    avatar: string
  }
}
