import React from 'react'
import { addVote } from '../reducers/anecdoteReducer'

const AnecdoteList = ({ store }) => {

  // const { anecdotes, notifications} = store.getState()
    return (
        <div>
        {store.getState().anecdotes.map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
                <div>
                has {anecdote.votes}
                <button onClick={() => 
                    store.dispatch(addVote(anecdote.id))}>vote</button>
              </div>
            </div>
        )}
        </div>
    )
}


export default AnecdoteList