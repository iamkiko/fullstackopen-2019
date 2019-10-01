import React from 'react';
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

const App = (props) => {
  
  return (
    <div>
      <h2>Anecdotes</h2>
        <AnecdoteList store={props.store}/>
        <AnecdoteForm store={props.store}/>
    </div>
  )
}

export default App