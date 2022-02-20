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

const Statistic = ({good, neutral, bad}) => {
  const total = good + neutral + bad

  if (good === 0 && bad === 0 && neutral === 0) {
    return <p>No Feedback Provided</p>
  } else { 
    return (
      <p>
        Good: {good} <br/>
        Neutral: {neutral} <br/>
        Bad: {bad} <br/>
        Total: {total}<br/>
        Average: {(good - bad) / total}<br/>
        Positive: {good/total}%
      </p>
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
      <Statistic good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App