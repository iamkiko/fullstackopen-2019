import React from 'react'
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const vote = (anecdote) => {
      props.addVote(anecdote)
      props.setNotification(`You voted for ${anecdote.content}`, 5)
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
  console.log("anecdotes", anecdotes)
  return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
}

const mapStateToProps = (state) => {
  console.log("mapStateToProps's State", state)
  return {
    visibleAnecdotes: anecdotesToShow(state),
    filter: state.filter
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addVote: id => dispatch(addVote(id)),
    setNotification: (content, duration) => dispatch(setNotification(content, duration))
   }
}

export default connect(
  mapStateToProps, mapDispatchToProps
  )(AnecdoteList)