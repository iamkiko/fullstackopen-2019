import React from 'react';
import { addVote } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'
import { store } from './index'

const App = (props) => {
  const anecdotes = props.store.getState()

  const vote = (id) => {
    store.dispatch(addVote(id))
  }
  console.log('latest state', anecdotes)

  
  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
        <AnecdoteForm store={props.store}/>
    </div>
  )
}

export default App