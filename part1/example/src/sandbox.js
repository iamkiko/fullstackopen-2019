//experimentation and examples
import React, {useState } from 'react';
import ReactDOM from 'react-dom';

const Hello = ({ name, age }) => {
    /* passing the params instead of props is the same as:
   const { name, age } = props --OR--
  const name = props.name
   const age = props.age*/

   //The person's age does not have to be passed as a parameter to the function - it can directly access all props that are passed to the component.
   const bornYear = () => new Date().getFullYear() - age
       /*same as: const bornYear = () => {
       return new Date().getFullYear() - age
       } */
   return (
       <div>
           <p>Hello {name}, you are {age} years old</p>
           <p>So you were probably born in {bornYear()}</p>
       </div>
   )
}

/* ************************************************************************ */

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

/* *************************** */

// EXAMPLE OF TWO WAYS OF OBTAINING SAME FUNCTIONALITY
const handleLeftClick = () => setClicks({...clicks, left: clicks.left + 1})
  const handleRightClick = () => setClicks({...clicks, right: clicks.right + 1})
  
  // const handleLeftClick = () => {
  //   const newClicks = {
  //     ...clicks, //creates a new object that has copies of all the properties of the 'clicks' object
  //     left: clicks.left + 1
  //   }
  //   setClicks(newClicks)
  // }

  // const handleRightClick = () => {
  //   const newClicks = {
  //     ...clicks, 
  //     right: clicks.right + 1
  //   }
  //   setClicks(newClicks)
  // }


