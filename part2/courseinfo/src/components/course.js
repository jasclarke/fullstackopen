const Header = ({text}) => <h1>{text}</h1>

const Part = ({part}) => <p>{part.name + " " + part.exercises}</p>

const Content = ({parts}) => <>{parts.map(part => <Part key={part.id} part={part} />)}</>

const Total = ({total}) => <p><b>Total of {total} exercises</b></p>

const Course = ({course}) => {
  const total = course.parts.reduce(
    (previousPart, currentPart) => ({ exercises: previousPart.exercises + currentPart.exercises })
  )

  return (
    <>
      <Header text={course.name} />
      <Content parts={course.parts} />
      <Total total={total.exercises}/>
    </>
  )
}

export default Course