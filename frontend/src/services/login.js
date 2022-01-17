import axios from 'axios'
const logUrl = '/api/login'
const regUrl = '/api/users'

const login = async credentials => {
  const response = await axios.post(logUrl, credentials)
  return response.data
}

const register = async credentials => {
  const response = await axios.post(regUrl, credentials)
  return response.data
}


export default { login, register }