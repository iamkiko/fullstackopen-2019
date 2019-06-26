import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Title = () => <h1>give feedback</h1>

const Button = (props) => (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )

const Statistics = ({data}) => {
  const { good, neutral, bad } = data
    
  return (
    <div>
      <h1>statistics</h1>
      <p>good: {good}</p>
      <p>neutral: {neutral}</p>
      <p>bad: {bad}</p>

    </div>
  )
} 


const App = (props) => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const setGoodResult = (newValue) => {
    setGood(newValue)
  }

  const setNeutralResult = (newValue) => {
    setNeutral(newValue)
  }

  const setBadResult = (newValue) => {
    setBad(newValue)
  }

  // object to store results
  const results = {
    good: good,
    neutral: neutral,
    bad: bad
    }
 
  return (
    <div>
        <Title/>
        <Button handleClick={() => setGoodResult(good + 1)} text="good" counter={good} /> 
        <Button handleClick={() => setNeutralResult(neutral + 1)} text="neutral" counter={neutral}/> 
        <Button handleClick={() => setBadResult(bad + 1)} text="bad" counter={bad}/> 
        <Statistics data={results}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)