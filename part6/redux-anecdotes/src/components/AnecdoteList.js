import React from 'react'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = ({ store }) => {

  const anecdotes = store.getState().anecdotes
  const vote = (anecdote) => {
    store.dispatch(addVote(anecdote.id))
    store.dispatch(setNotification(`You voted for ${anecdote.content}`))
    setTimeout(() => {
      store.dispatch(setNotification(null))
    }, 5000)
  }

    return (
        <div>
        {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
                <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
              </div>
            </div>
        )}
        </div>
    )
}


export default AnecdoteList