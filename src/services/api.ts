import { AppError } from '@utils/AppError'
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://192.168.0.110:3333',
  timeout: 1000 * 10, // 10 seconds
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(new AppError(error.response.data.message))
    } else {
      console.log(error)
      return Promise.reject(error)
    }
  }
)

export { api }
