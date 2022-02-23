import { useState } from 'react'

const Contact = ({person}) => (
  <>
    <span>{person.name} {person.number}</span><br/>
  </>
)

const Filter = ({query, handleFilter}) => (
  <div>
    Filter Contacts: <input onChange={handleFilter} value={query} />
  </div>
)

const ContactForm = ({handleName, nameValue, handlePhoneNumber, phoneNumberValue, submitContact}) => (
  <form>
    <div>
      Name: <input onChange={handleName} value={nameValue} />
    </div>
    <div>
      Phone Number: <input onChange={handlePhoneNumber} value={phoneNumberValue} />
    </div>
    <div>
      <button type='submit' onClick={submitContact}>Save</button>
    </div>
  </form>
)

const ContactList = ({contacts}) => (
  <p>
    {
      contacts.filtered.map( contact => (
        <Contact key={contact.id} person={contact} />
      ))
    }
  </p>
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
      <Filter query={searchName} handleFilter={handleSearchInput} />
      <h2>New Contact</h2>
      <ContactForm 
        handleName={handleNameInput} 
        nameValue={newName} 
        handlePhoneNumber={handlePhoneNumberInput} 
        phoneNumberValue={phoneNumber}
        submitContact={addPerson}
      />
      <h2>Contacts</h2>
      <ContactList contacts={persons} />
    </div>
  )
}

export default App