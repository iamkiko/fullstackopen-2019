import React from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = ({ createAnecdote, setNotification }) => {
    const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value

    createAnecdote(content)
    setNotification(`You just added ${content}`)
    setTimeout(() => {
      setNotification(null)
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

export default connect(
  null,
  { createAnecdote, setNotification}
)(AnecdoteForm)