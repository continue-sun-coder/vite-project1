// 登录接口需要携带的参数类型
export interface loginForm {
  username: string
  password: string
}
interface dataType {
  token: string
}

// 登录接口返回的数据类型
export interface loginResponseData {
  code: number
  data: dataType
}

interface userInfo {
  userId: number
  avatar: string
  username: string
  password: string
  rules: string[]
  buttons: string[]
  routes: string[]
  token: string
}

interface user {
  checkUser: userInfo
}

// 用户信息接口返回的数据类型
export interface userReponseData {
  code: number
  data: user
}
