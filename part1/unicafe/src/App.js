import { useState } from "react";

const SubHeading = ({text}) => <h2>{text}</h2>

const VotingOptions = ({goodClick, badClick, neutralClick}) => (
  <>
    <Button text="good" handleClick={goodClick}/>
    <Button text="neutral" handleClick={neutralClick}/>
    <Button text="bad" handleClick={badClick}/>
  </>
)

const Button = ({text, handleClick}) => <button onClick={handleClick}>{text}</button>

const StatisticLine = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad

  if (good === 0 && bad === 0 && neutral === 0) {
    return <p>No Feedback Provided</p>
  } else { 
    return (
      <table>
        <tbody>
          <StatisticLine text="Good" value={good} />
          <StatisticLine text="Neutral" value={neutral} />
          <StatisticLine text="Bad" value={bad} />
          <StatisticLine text="Total" value={total} />
          <StatisticLine text="Average" value={(good - bad) / total} />
          <StatisticLine text="Positve" value={good/total + "%"} />
        </tbody>
      </table>
    ) 
  }
} 

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const feedback = 'Give Feedback'
  const statistic = 'Statistics'

  return (
    <div>
      <SubHeading text={feedback} />
      <VotingOptions 
        goodClick={() => setGood(good + 1)} 
        badClick={() => setBad(bad + 1)}
        neutralClick={() => setNeutral(neutral + 1)}
      />
      <SubHeading text={statistic} />
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App