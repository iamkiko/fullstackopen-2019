import React from 'react'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = ({ store }) => {

  const { anecdotes, filter } = store.getState()
  const vote = (anecdote) => {
    store.dispatch(addVote(anecdote.id))
    store.dispatch(setNotification(`You voted for ${anecdote.content}`))
    setTimeout(() => {
      store.dispatch(setNotification(null))
    }, 5000)
  }

  const anecdotesToShow = anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
  
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


export default AnecdoteList