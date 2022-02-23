import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]) 
  const [newName, setNewName] = useState('')
  const handleNameInput = (event) => setNewName(event.target.value)

  const addPerson = (event) => {
    event.preventDefault()
    if (!persons.some( person => person.name === newName)) {
      setPersons(persons.concat({name: newName}))
      setNewName('')
    } else {
      alert(`${newName} already exists in the phone book.`)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input onChange={handleNameInput} value={newName}/>
        </div>
        <div>
          <button type="submit" onClick={addPerson}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <p>
        {
          persons.map( (person) => (
            <>
              <span key={person.name}>{person.name}</span><br/>
            </>
          ))
        }
      </p>
    </div>
  )
}

export default App