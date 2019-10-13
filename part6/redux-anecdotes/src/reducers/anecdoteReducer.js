import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  // console.log('anecdoteReducer action', action)
  switch(action.type) {
    case 'VOTE':
      // const anecdoteToVote = state.find(a => a.id === action.id)
      const specificAnecdote = action.data
      return state.map(anecdote => 
                    anecdote.id !== specificAnecdote.id ? anecdote 
                    : specificAnecdote
                    ).sort((a, b) => b.votes - a.votes)
    case 'INIT_ANECDOTES':
      return action.data
    case 'NEW_ANECDOTE':
      return [...state, action.data]
      default: 
        return state
  }
}  

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
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

export const addVote = anecdote => {
  return async dispatch => {
    const newVote = await anecdoteService.updateVote(anecdote)
     dispatch({
       type: 'VOTE',
       data: newVote
     })
  }
 }

export default anecdoteReducer