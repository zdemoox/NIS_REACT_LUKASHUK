import axios from 'axios'

export const axiosClient = axios.create()

axiosClient.interceptors.request.use((config) => {
  const next = { ...config }
  next.baseURL = next.baseURL ?? 'https://jsonplaceholder.typicode.com'
  next.headers = {
    ...next.headers,
    Authorization: 'Bearer demo-token',
  }
  return next
})

