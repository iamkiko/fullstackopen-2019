import React from 'react';
import { createAnecdote, addVote } from './reducers/anecdoteReducer'
import { store } from './index'

const App = (props) => {
  const anecdotes = props.store.getState()

  const vote = (id) => {
    store.dispatch(addVote(id))
  }
  console.log('latest state', anecdotes)

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value

    store.dispatch(createAnecdote(content))
    event.target.anecdote.value = ""
  }
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
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote"/>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App