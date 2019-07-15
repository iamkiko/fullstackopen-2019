import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Title = () => <h1>give feedback</h1>

const Button = ({text, handleClick}) => (
    <button onClick={handleClick}>
      {text}
    </button>
  )

const Statistic = ({text, value}) => {
  return (
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
  )
}
const Statistics = ({data}) => {
  const { good, neutral, bad } = data

  const totalFeedback = good + neutral + bad
  const goodFeedback = 100 * (good / totalFeedback) + '%'
  const averageFeedback = ((good - bad) / totalFeedback)
    
  if(totalFeedback > 0) {
    return (
      <div>
        <h1>statistics</h1>
        <table>
          <tbody>
            <Statistic text='Good' value = {good} />
            <Statistic text='Neutral' value = {neutral} />
            <Statistic text='Bad' value = {bad} />
            <Statistic text='All' value = {totalFeedback} />
            <Statistic text='Average feedback' value = {averageFeedback} />
            <Statistic text='Positive feedback' value = {goodFeedback} />      
          </tbody>
        </table>

      </div>
    )
  } 

  return (
    <div><p>No feedback given</p></div>
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

  const addGoodResult = () => setGoodResult(good + 1);

  const setNeutralResult = (newValue) => {
    setNeutral(newValue)
  }

  const addNeutralResult = () => setNeutralResult(neutral + 1);

  const setBadResult = (newValue) => {
    setBad(newValue)
  }

  const addBadResult = () => setBadResult(bad + 1);

  // object to store results
  const results = {
    good: good,
    neutral: neutral,
    bad: bad
    }
 
  return (
    <div>
        <Title/>
        <Button handleClick={addGoodResult} text="good" counter={good} /> 
        <Button handleClick={addNeutralResult} text="neutral" counter={neutral}/> 
        <Button handleClick={addBadResult} text="bad" counter={bad}/> 
        <Statistics data={results}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)