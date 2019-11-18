import axios from "axios"
const baseUrl = "/api/blogs"

let token = null

const getConfig = () => ({
  headers: { Authorization: token }
})

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const destroyToken = () => {
  token = null
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async blog => {
  const response = await axios.post(baseUrl, blog, getConfig())
  return response.data
}

const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
  return response.data
}

const remove = async id => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

const addComment = async (id, comment) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(
    `${baseUrl}/${id}/comments`,
    comment,
    config
  )
  return response.data
}

export default {
  getAll,
  create,
  update,
  remove,
  setToken,
  destroyToken,
  addComment
}
