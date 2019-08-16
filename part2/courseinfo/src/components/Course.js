import React from 'react'

//placing the relevant details in each component
const Course = ({ course }) => (
    <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
    </div>
)

const Header = ({ course }) =>
    <h2>{course}</h2>

const Part = ({ part }) =>
    <p>{part.name} {part.exercises}</p>

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map(part => <Part key={part.id} part={part}/>)}
        </div>
    )
}

const Total = ({ parts }) => {
    const total = parts.reduce((sum, part) => {
        return sum + part.exercises
    }, 0)

    return (
        <p><b>total of {total} exercises</b></p>
    )
}
export default Course
