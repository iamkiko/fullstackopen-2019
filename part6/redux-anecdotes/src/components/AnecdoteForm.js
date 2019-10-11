import React from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
    const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ""
    props.createAnecdote(content)
    props.setNotification(`You just added ${content}`)
    setTimeout(() => {
      setNotification(null)
    }, 5000)    
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