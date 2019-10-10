import React from 'react'
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = ({addVote, setNotification, anecdotes, filter}) => {
  const vote = (anecdote) => {
      addVote(anecdote.id)
      setNotification(`You voted for ${anecdote.content}`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
  }

  const anecdotesToShow = anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
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

const mapDispatchToProps = {
  addVote,
  setNotification
}

export default connect(
  mapStateToProps, mapDispatchToProps
  )(AnecdoteList)
