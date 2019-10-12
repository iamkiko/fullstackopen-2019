import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    const object = { 
      content: content,
      id: (100000 * Math.random()).toFixed(0),
      votes: 0
    }
    const response = await axios.post(baseUrl, object)
    console.log(response.data)
    return response.data
  }

const updateVote = async (object) => {
  const updatedObj = {
    content: object.content,
    votes: object.votes + 1,
    id: object.id
  }
  const response = await axios.put(`${baseUrl}/${object.id}`, updatedObj)
  return response.data
}

  export default { getAll, createNew , updateVote}