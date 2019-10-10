import React from 'react'
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const vote = (anecdote) => {
      props.addVote(anecdote.id)
      props.setNotification(`You voted for ${anecdote.content}`)
      setTimeout(() => {
        props.setNotification(null)
      }, 5000)
  }

    return (
        <div>
        {props.visibleAnecdotes.map(anecdote =>  //this does two iterations of array, not most performant
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

const anecdotesToShow = ({anecdotes, filter}) => {
  return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    visibleAnecdotes: anecdotesToShow(state),
    filter: state.filter
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addVote: id => dispatch(addVote(id)),
    setNotification: notification => dispatch(setNotification(notification))
   }
}

export default connect(
  mapStateToProps, mapDispatchToProps
  )(AnecdoteList)
