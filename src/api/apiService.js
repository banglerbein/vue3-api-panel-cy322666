import axios from 'axios'

const BASE_URL = 'http://109.73.206.144:6969'
const API_KEY = 'E6kUTYrYwZq2tN4QEtyzsbEBk3ie'

const api = axios.create({ baseURL: BASE_URL })

export async function fetchEntity(endpoint, params = {}) {
  const response = await api.get(endpoint, {
    params: { ...params, key: API_KEY },
  })
  console.log(response.data)
  return response.data
}
