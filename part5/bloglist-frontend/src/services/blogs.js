import axios from 'axios'
const baseUrl = '/api/blogs'

const getConfig = token => {
  return  {
    headers: {
      Authorization: 'bearer ' + token
    }
  }
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (blog, token) => {
  const config = getConfig(token)
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const update = async (blog, token) => {
  const config = getConfig(token)
  const response = await axios.put(baseUrl + '/' + blog.id, blog, config)
  return response.data
}

const remove = async (blogId, token) => {
  const config = getConfig(token)
  const response = await axios.delete(baseUrl + '/' + blogId, config)
  return response.data
}

const blogService = { getAll, create, update, remove }
export default blogService