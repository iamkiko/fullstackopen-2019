import React from 'react'
import { setNotification } from '../reducers/notificationReducer'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = ({store}) => {
    const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value

    store.dispatch(createAnecdote(content))
    store.dispatch(setNotification(`You just added ${content}`))
    setTimeout(() => {
      store.dispatch(setNotification(null))
    }, 5000)

    event.target.anecdote.value = ""
  }

  return (
<div>
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

export default AnecdoteForm