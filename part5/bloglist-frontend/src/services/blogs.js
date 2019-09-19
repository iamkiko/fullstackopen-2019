import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  // const request = axios.get(baseUrl)
  // return request.then(response => response.data)
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async newObject => {
  const config = {
    headers: {Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
	const config = {
		headers: { Authorization: token },
	}

	const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
	return response.data
}

export default { getAll, create, update, setToken }