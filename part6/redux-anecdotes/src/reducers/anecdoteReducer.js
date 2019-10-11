import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  // console.log('anecdoteReducer action', action)
  switch(action.type) {
    case 'VOTE':
      const anecdoteToVote = state.find(a => a.id === action.id)
      return state.map(anecdote => 
                    anecdote.id !== action.id ? anecdote 
                    : {...anecdote, votes: anecdoteToVote.votes +1}
                    ).sort((a, b) => b.votes - a.votes)
    case 'INIT_ANECDOTES':
      return action.data
    case 'NEW_ANECDOTE':
      return [...state, action.data]
      default: 
        return state
  }
}  

export const createAnecdote = (data) => {
  return {
    type: 'NEW_ANECDOTE',
    data
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export const addVote = (id) => {
  return {
     type: 'VOTE',
     id: id
   }
   
 }

export default anecdoteReducer