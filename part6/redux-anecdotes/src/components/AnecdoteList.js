import React from 'react'
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  // const { anecdotes, filter } = store.getState()
  const vote = (anecdote) => {
    props.store.dispatch(addVote(anecdote.id))
    props.store.dispatch(setNotification(`You voted for ${anecdote.content}`))
    setTimeout(() => {
      props.store.dispatch(setNotification(null))
    }, 5000)
  }

  const anecdotesToShow = props.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
  
  console.log('anecdotesToShow: ', anecdotesToShow)
    return (
        <div>
        {anecdotesToShow.map(anecdote =>  //this does two iterations of array, not most performant
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

const mapStateToProps = (state) => {
  console.log(state)
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     setNotification: value => {
//       dispatch(setNotification(`You voted for ${anecdote.content}`))
//     }
//   }
}

const ConnectedAnecdotes = connect(mapStateToProps)(AnecdoteList)
export default ConnectedAnecdotes