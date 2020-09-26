// 用户相关模块
import request from '../utils/request'
// 用户登录
export const login = data => {
  return request({
    url: ' /app/v1_0/authorizations',
    method: 'POST',
    data
  })
}
// 发送验证码
export const sendSms = (mobile) => {
  return request({
    url: `/app/v1_0/sms/codes/${mobile}`,
    method: 'GET'
  })
}
