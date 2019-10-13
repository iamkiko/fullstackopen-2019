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
    console.log("setNotification: ", setNotification())
    props.setNotification(`You just added ${content}`, 5)   
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

const mapDispatchToProps = dispatch => {
  return {
    createAnecdote: id => dispatch(createAnecdote(id)),
    setNotification: (content, duration) => dispatch(setNotification(content, duration))
   }
}

export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)