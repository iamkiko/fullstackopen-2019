import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({text, handleClick}) => {
  return (
    <button onClick={handleClick}>
    {text}
  </button>
  )
}

const HighestVoted = ({votes, anecdotes}) => {  
  const mostVotes = Math.max(...votes) //the anecdote with most votes in array
  const voteCount = votes.indexOf(mostVotes) //the index of the anecdote with most votes
   
  return (
    <div>
        <h1>Anecdote with most votes</h1>
        {mostVotes > 0
          ? <p>{anecdotes[voteCount]} has {votes[voteCount]}</p>
          : <p>No anecdote has been voted on yet.</p>
        }
    </div>
  )
}

const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0)) //zero filled array to store into component state
  
  const addVote = (selected) => {
    const newVotes = [...votes] 
    newVotes[selected]++ //adding votes
    setVotes(newVotes)
  }

  const randomQuote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length)); //we update the state to be random
  }
  
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]} has {votes[selected]}</p>
      <Button handleClick={() => addVote(selected)} text="Vote"/>
      <Button handleClick={randomQuote} text="Next anecdote"/>
      <HighestVoted anecdotes={anecdotes} votes={votes}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)