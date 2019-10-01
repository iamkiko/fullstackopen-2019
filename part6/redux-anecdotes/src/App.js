import React from 'react';
// import {getId, asObject, addVote } from './reducers/anecdoteReducer'
import { store } from './index'

const App = (props) => {
  const anecdotes = props.store.getState()

  const vote = (id) => {
    store.dispatch({
      type: 'VOTE',
      id: id
    })
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
      <form>
        <div><input /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App