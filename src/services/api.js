import axios from 'axios'

const api = axios.create({
  baseURL: 'http://be-hotelbooking.vercel.app/api',
  headers: { Accept: 'application/json' }
})

export function setToken(token) {
  if (token)
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  else
    delete api.defaults.headers.common['Authorization']
}

// Restore token on refresh
const token = localStorage.getItem('token')
if (token) setToken(token)

export default api
