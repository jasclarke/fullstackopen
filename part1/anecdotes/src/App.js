import { useState } from 'react'

const SubHeading = ({text}) => <h2>{text}</h2>
const Button = ({text, handleClick}) => <button onClick={handleClick}>{text}</button>
const Anecdote = ({text, votes}) => <p>{text}<br/> has {votes} votes.</p>
const Actions = ({anecdoteClick, voteClick}) => (
  <>
    <Button text="Vote" handleClick={voteClick} />
    <Button text="Next Anecdote" handleClick={anecdoteClick}/>
  </>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
  
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length))

  const generateRandomIndex = (anecdoteIndex) => {
    let randomIndex = Math.floor(Math.random() * anecdotes.length)
    return (anecdoteIndex !== randomIndex) ? randomIndex : generateRandomIndex(anecdoteIndex)
  }

  const vote = (anecdoteIndex) => {
    const votesCopy = [...votes]
    votesCopy[anecdoteIndex] += 1
    setVotes(votesCopy)
  }

  const mostVotesIndex = votes.indexOf(votes.reduce( (previousVote, currentVote) => (currentVote > previousVote) ? currentVote : previousVote))

  return (
    <div>
      <SubHeading text="Anecdote of the Day" />
      <Anecdote text={anecdotes[selected]} votes={votes[selected]} />
      <Actions voteClick={() => vote(selected)} anecdoteClick={() => setSelected(generateRandomIndex(selected))} />
      <SubHeading text="Anecdote with the most Votes" />
      <Anecdote text={anecdotes[mostVotesIndex]} votes={votes[mostVotesIndex]} />
    </div>
  )
}

export default App