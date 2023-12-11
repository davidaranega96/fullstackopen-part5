import axios from 'axios'
const baseUrl = 'http://localhost:3000/api/login'

const login = async ({ username, password }) => {
  console.log(username, password)
  try {
    const response = await axios.post(baseUrl, { username: username, password: password })
    return response.data
  } catch (error) {
    return null
  }
}

export default { login }