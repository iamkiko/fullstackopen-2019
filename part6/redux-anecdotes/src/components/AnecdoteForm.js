import React from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
    const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value

    props.store.dispatch(createAnecdote(content))
    props.store.dispatch(setNotification(`You just added ${content}`))
    setTimeout(() => {
      props.tore.dispatch(setNotification(null))
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