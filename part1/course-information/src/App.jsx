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

    const Header = ({ name }) => <h1>{name}</h1>
    const Part = ({ name, exercises }) => (
        <p>
            {name} {exercises}
        </p>
    )
    const Content = ({ parts }) => (
        <div>
            {parts.map((p) => (
                <Part key={p.name} name={p.name} exercises={p.exercises} />
            ))}
        </div>
    )
    const Total = ({ parts }) => <p>Number of exercises {parts.reduce((sum, p) => sum += p.exercises, 0)}</p>

    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default App
