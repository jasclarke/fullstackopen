import { useState, useEffect } from 'react'
import personService from './services/persons'

const Notification = ({notification}) => {
  if (notification.message === null) {
    return null
  }

  const notificationStyle = {
    color: '',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (notification.success) {
    notificationStyle.color = 'green'
  } else {
    notificationStyle.color = 'red'
  }

  return <div style={notificationStyle}>{notification.message}</div>
}

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
  const [notification, setNotification] = useState({
    message: null,
    success: false
  })

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

  const notify = (message, success) => {
    setNotification({
      message: message,
      success: success
    })

    setTimeout(() => {
      setNotification({
        message: null,
        success: false
      })
    }, 5000)
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
          notify(`${contact.name} was successfully added to the phone book`, true)
        })
        .catch(error => notify(error.response.data.error, false))
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

            notify(`${updatedContact.name} number was successfully updated.`, true)
          })
          .catch(error => {
            notify(`${contactToUpdate.name} no longer exists due to being removed prior to this action.`, false)
            setPersons({
              contacts: persons.contacts.filter(c => c.id !== contactToUpdate.id),
              filtered: persons.filtered.filter(c => c.id !== contactToUpdate.id)
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
      <Notification notification={notification} />
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