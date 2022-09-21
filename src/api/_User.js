import AV from '@/api/AV'

/**
 *  用户登录
 * @param {String} email
 * @param {String} password
 * @returns
 */
export function login (email, password) {
  return AV.User.loginWithEmail(email, password)
}

/**
 * 用户注册
 * @param {*} name
 * @param {*} password
 * @param {*} email
 * @returns
 */
export async function register (name, email, password) {
  const user = new AV.User()
  user.setUsername(name)
  user.setEmail(email)
  user.setPassword(password)
  return user.signUp()
}

/**
 * 发送验证码
 * @param {String} email
 * @returns
 */
export function emailVerify (email) {
  return AV.User.requestEmailVerify(email)
}

/**
 * 重置密码
 * @param {String} email
 */
export function passwordReset (email) {
  AV.User.requestPasswordReset(email)
}

/**
 * 验证用户
 * @returns
 */
export function become () {
  return AV.User.become(window.sessionStorage.getItem('token'))
}

export function logOut () {
  return AV.User.logOut()
}
