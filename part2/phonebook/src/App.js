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
  const data = [
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]

  const [persons, setPersons] = useState({
    contacts: [...data], 
    filtered: [...data]
  })

  const [newName, setNewName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [searchName, setSearchName] = useState('')

  const handleNameInput = (event) => setNewName(event.target.value)
  const handlePhoneNumberInput = (event) => setPhoneNumber(event.target.value)

  const handleSearchInput = (event) => {
    const query = event.target.value
    setSearchName(query)

    const results = persons.contacts.filter( person => 
      person.name.toLowerCase().match(query.toLowerCase())
    )
    
    const updatedPersons = {...persons}
    updatedPersons.filtered = results
    setPersons(updatedPersons)
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (!persons.contacts.some( person => person.name === newName)) {
      const contact = {
        name: newName,
        number: phoneNumber,
        id: persons.contacts.length + 1
      }
      const updatedPersons = {...persons}

      updatedPersons.contacts.push(contact)
      updatedPersons.filtered.push(contact)

      setPersons(updatedPersons)
      setNewName('')
      setPhoneNumber('')
    } else {
      alert(`${newName} already exists in the phone book.`)
    }
  }
  
  
  return (
    <div>
      <h1>Phonebook</h1>
      <Input label='Filter Contacts' handleInput={handleSearchInput} value={searchName} />
      <h2>New Contact</h2>
      <form>
        <Input label='Name' handleInput={handleNameInput} value={newName} />
        <Input label='Phone Number' handleInput={handlePhoneNumberInput} value={phoneNumber} />
        <div>
          <button type='submit' onClick={addPerson}>Save</button>
        </div>
      </form>
      <h2>Contacts</h2>
      <p>
        {
          persons.filtered.map( person => (
            <Contact key={person.id} person={person} />
          ))
        }
      </p>
    </div>
  )
}

export default App