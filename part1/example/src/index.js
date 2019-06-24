import React, {useState } from 'react';
import ReactDOM from 'react-dom';

const App = (props) => {
    const [ counter, setCounter ] = useState(0) // fn call adds state to the component, that gets initialized with the value of zero.
    // counter is the state, starting at zero
    // setCountner is used to modify state - here it's the count

    const setToValue = (value) => setCounter(value)

  return (
    <div>
      <Display counter={counter}/>
      <Button
            onClick={() => setToValue(counter + 1)}
            text='plus'
        />
       <Button
            onClick={() => setToValue(counter - 1)}
            text='minus'
       />
       <Button 
            onClick={() => setToValue(0)}
            text='reset'
       />
    </div>
  )
}

const Display = ({ counter }) => <div>{counter}</div>

const Button = ({onClick, text}) => (
    <button onClick={onClick}>
        {text}
    </button>
)

ReactDOM.render(<App />, document.getElementById('root'))




