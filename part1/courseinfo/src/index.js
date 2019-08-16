import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
          {
            name: 'Fundamentals of React',
            exercises: 10
          },
          {
            name: 'Using props to pass data',
            exercises: 7
          },
          {
            name: 'State of a component',
            exercises: 14
          }
        ]
      }
  
    return (
      <div>
        <Header course={course}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts} />
      </div>
    )
  }

const Header = (props) => {
    //obtaining the name from the course object and storing it in an h1
    return (
        <>
            <h1>{props.course.name}</h1>
        </>
    )
}

const Part = (props) => {
    //obtaining the courses' name and exercise from the object and storing it in a <p> to be reused
    return (
        <div>
            <p>
                {props.part.name} {props.part.exercises}
            </p>
      </div>
    )
}

const Total = (props) => {
    //using forEach and storing total into a var instead of manually adding
    let totalSum = 0;

    props.parts.forEach(part => {
        totalSum += part.exercises
    })
    console.log("total: " + totalSum)
    return (
        <>
            <p>Number of exercises {totalSum}</p>
        </>
            
    )
}

const Content = (props) => {
    return (
        <div>
           <Part part={props.parts[0]}/>
           <Part part={props.parts[1]}/>
           <Part part={props.parts[2]}/>
        </div>
    )

}

ReactDOM.render(<App />, document.getElementById('root'))