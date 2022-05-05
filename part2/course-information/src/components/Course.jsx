import React from 'react'

const Header = ({ name }) => <h2>{name}</h2>

const Part = ({ name, exercises }) => (
    <p>
        {name} {exercises}
    </p>
)

const Content = ({ parts }) => (
    <div>
        {parts.map((p) => (
            <Part key={p.id} name={p.name} exercises={p.exercises} />
        ))}
    </div>
)

const Total = ({ parts }) => {
    const total = parts.reduce((sum, p) => (sum += p.exercises), 0)
    return (
        <p>
            <b>total of {total} exercises</b>
        </p>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course
