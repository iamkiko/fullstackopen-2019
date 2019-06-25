import React, {useState } from 'react';
import ReactDOM from 'react-dom';

//adding conditional rendering
const History = (props) => {
  if(props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  
  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)
  

const App = (props) => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([]) //array to remember every click that's occurred in app i.e. store state in an empty arr

  //adding L or R to the allClicks arr -> stores items of previous state array + returns a new copy of arr with .concat
  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
  }

  return (
    <div>
      <div>
        {left}
        <Button onClick={handleLeftClick} text='left'/>
        <Button onClick={handleRightClick} text='right'/>
        {right}
        <History allClicks={allClicks}/>
      </div>
    </div>
  )

}

ReactDOM.render(<App />, document.getElementById('root'))




