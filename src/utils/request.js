/*
* 请求模块
* */
import axios from 'axios'

const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 基础路径
  timeout: 10000
})
export default request
