import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (blog, token) => {
  const config = {
    headers: {
      Authorization: 'bearer ' + token
    }
  }

  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const blogService = { getAll, create }
export default blogService