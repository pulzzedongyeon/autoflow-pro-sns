import axios from 'axios'
import Cookies from 'js-cookie'

const apiURL = 'http://localhost:8080'
const api = axios.create()

api.interceptors.request.use(async config => {
  config.url = apiURL + config.url
  const token = Cookies.get('auth')

  if (token) {
    config.headers = {
      Authorization: `Bearer ${token}`,
      ...config.headers
    }
  }

  return config
})

api.interceptors.response.use(
  response => response,
  async error => {
    if (error.response.status === 401) {
      location.href = "/account/login"
      return false
    }

    return Promise.reject(error)
  }
)

export default api