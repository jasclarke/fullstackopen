import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = jsonObject => {
    const request = axios.post(baseUrl, jsonObject)
    return request.then(response => response.data)
}

const update = (id, jsonObject) => {
    const request = axios.put(`${baseUrl}/${id}`, jsonObject)
    return request.then(response => response.data)
}

const remove = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.status)
}

export default { getAll, create, update, remove }