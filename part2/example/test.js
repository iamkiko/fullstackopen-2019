import React from 'react'
import ReactDOM from 'react-dom'

const Title = () => {
  return <h1>Web development curriculum</h1>
}

const Header = props => //extract 
  <h2>{props.course.name}</h2>

const Total = ({parts}) => {
  
  const total = parts.reduce((acc, number) => {
    return acc + number.exercises
  }, 0)

  return <p>total of {total} exercises</p>
}

const Part = ({parts}) =>
  <p>{parts.name} {parts.exercises}</p>
 

const Content = ({parts}) => (
  <div>
    <ul>
      { return
        parts.map(part => 
          <li key={part.id}>
            {part.name} {part.exercises}
          </li>)
      }
    </ul>
  </div>
)

const Course = ({course}) => {

    return (
        <div>
            <Title/>
            <Header course={course}/>
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

const App = () => {
    const course = {
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }
  
    return (
      <div>
        <Course course={course} />
      </div>
    )
  }

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

///////////////////////////////////////////////////

<li key={courses.parts.id}>

const App = () => {

    const courses = [
        {
          name: 'Half Stack application development',
          id: 1,
          parts: [
            {
              name: 'Fundamentals of React',
              exercises: 10,
              id: 1
            },
            {
              name: 'Using props to pass data',
              exercises: 7,
              id: 2
            },
            {
              name: 'State of a component',
              exercises: 14,
              id: 3
            },
            {
              name: 'Redux',
              exercises: 11,
              id: 4
            }
          ]
        }, 
        {
          name: 'Node.js',
          id: 2,
          parts: [
            {
              name: 'Routing',
              exercises: 3,
              id: 1
            },
            {
              name: 'Middlewares',
              exercises: 7,
              id: 2
            }
          ]
        }
      ]
    }