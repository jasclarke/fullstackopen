import { useState, useEffect } from 'react'
import personService from './services/persons'

const Contact = ({person, deleteButton}) => (
  <span>
    {person.name} {`${person.number} `}
    <button onClick={deleteButton}>Delete</button>
    <br/>
  </span>
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

const ContactList = ({contacts, deleteButton}) => (
  <p>
    {
      contacts.filtered.map( contact => (
        <Contact key={contact.id} person={contact} deleteButton={() => deleteButton(contact)} />
      ))
    }
  </p>
)


const App = () => {
  const [persons, setPersons] = useState({
    contacts: [], 
    filtered: []
  })
  const [newName, setNewName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [searchName, setSearchName] = useState('')

  useEffect( () => {
    personService
      .getAll()
      .then(notes => {
        const returnedNotes = {
          contacts: [...notes],
          filtered: [...notes]
        }
        setPersons(returnedNotes)
      })
  }, [])

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

      personService
        .create(contact)
        .then(contact => {
          setPersons({
            contacts: persons.contacts.concat(contact),
            filtered: persons.contacts.concat(contact)
          })
          setNewName('')
          setPhoneNumber('')
        })
    } else {
      const confirmation = window.confirm(
        `${newName} already exists in the phone book, replace the old number with the new one?`
      )

      if (confirmation) {
        const contactToUpdate = {
          ...persons.contacts.find( person => person.name === newName),
          number: phoneNumber
        }

        personService
          .update(contactToUpdate.id, contactToUpdate)
          .then(updatedContact => {
            const updatedContacts = {
              contacts: [...persons.contacts.filter(contact => contact.name !== updatedContact.name)],
              filtered: [...persons.filtered.filter(contact => contact.name !== updatedContact.name)]
            }

            setPersons({
              contacts: updatedContacts.contacts.concat(updatedContact),
              filtered: updatedContacts.contacts.concat(updatedContact)
            })
          })
      }
    }
  }

  const deleteContact = (contact) => {
    const confirmation = window.confirm(`Delete ${contact.name}?`)
    
    if (confirmation) {
      personService
        .remove(contact.id)
        .then(status => {
          setPersons({
            contacts: persons.contacts.filter(c => c.id !== contact.id),
            filtered: persons.filtered.filter(c => c.id !== contact.id)
          })
        })  
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
      <ContactList contacts={persons} deleteButton={deleteContact} />
    </div>
  )
}

export default App