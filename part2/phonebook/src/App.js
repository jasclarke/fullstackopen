import { useState } from 'react'

const Input = ({label, value, handleInput}) => (
  <div>
    {label}: <input onChange={handleInput} value={value} />
  </div>
)

const Contact = ({person}) => (
  <>
    <span>{person.name} {person.number}</span><br/>
  </>
)

const App = () => {
  const [persons, setPersons] = useState([{
     name: 'Arto Hellas',
     number: '040-1234567'
  }])

  const [newName, setNewName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  const handleNameInput = (event) => setNewName(event.target.value)
  const handlePhoneNumberInput = (event) => setPhoneNumber(event.target.value)

  const addPerson = (event) => {
    event.preventDefault()
    if (!persons.some( person => person.name === newName)) {
      setPersons(persons.concat({
        name: newName,
        number: phoneNumber
      }))

      setNewName('')
      setPhoneNumber('')
    } else {
      alert(`${newName} already exists in the phone book.`)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <Input label='name' handleInput={handleNameInput} value={newName} />
        <Input label='number' handleInput={handlePhoneNumberInput} value={phoneNumber} />
        <div>
          <button type='submit' onClick={addPerson}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <p>
        {
          persons.map( (person) => (
            <Contact key={person.name} person={person} />
          ))
        }
      </p>
    </div>
  )
}

export default App