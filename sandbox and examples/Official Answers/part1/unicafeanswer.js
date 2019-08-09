import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)


const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  const average = good - bad

  if (total ===0) {
    return (
      <div>
        <h2>statistiikka</h2>
        <p>Ei yhtään palautetta annettu</p>
      </div>
    )
  }

  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <Statistic text='hyvä' value={good} />
          <Statistic text='neutraali' value={neutral} />
          <Statistic text='huono' value={bad} />
          <Statistic text='yhteensä' value={total} />
          <Statistic text='keskiarvo' value={average / total} />
          <Statistic text='positiivisia' value={`${100 * good / total} %`} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>anna palautetta</h2>
      <button onClick={() => setGood(good + 1)}>hyvä</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutraali</button>
      <button onClick={() => setBad(bad + 1)}>huono</button>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))