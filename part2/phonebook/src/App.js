import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import SuccessNotification from './components/SuccessNotification'
import ErrorNotification from './components/ErrorNotification'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import './index.css' 

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filter, setFilter] = useState('')
  const [ successMessage, setSuccessMessage] = useState(null)
  const [ errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
    })
  }, [])

  const errorContent = (error, standardStatus) => {
    const message = error.response.data ? `Error: ${error.response.data.error}` : standardStatus
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const successContent = (message) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 5000)
  }

  // const setSuccess = (message) => {
  //   setSuccessMessage(message);
  //   setTimeout(() => {
  //     setSuccessMessage(null);
  //   }, notificationTimeout)
  // };

  
  //filter/search function
  const personsToShow = persons.filter(person => 
    person.name.toLowerCase().includes(filter.toLowerCase()))

    //adding a person
  const addPerson = (event) => {
    event.preventDefault()
    const updatedPersonObject = {
      name: newName,
      number: newNumber,
      //id: persons[persons.length - 1].id + 1
    }
    const indexSameNamePerson = persons.map(person => person.name).indexOf(newName) //checking if person exists in db
    if (indexSameNamePerson > -1) { //if already exists
      const personInArray = persons[indexSameNamePerson]; //finding position
      window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)
      personService //updating 
      .update(personInArray.id, updatedPersonObject)
      .then(returnedPerson => {
        setPersons(persons
          .map(p => p.id === personInArray.id 
            ? {
              ...updatedPersonObject,
              id: returnedPerson.id,
            } 
            : p
          )
        )
        successContent(`Updated ${newName}`)
      })
      .catch(error => {
        errorContent(error, `Error: Information of ${newName} was already removed from the server `)
        // personService.getAll().then(data => setPersons(data))
      })
    } else { //if added successfully
      personService
        .create(updatedPersonObject)
        .then(newPerson => {
        setPersons(persons.concat(newPerson))
        successContent(`Added ${newName}`)
        setNewName('')
        setNewNumber('')
    })
    .catch(error => {
      errorContent(error, error.message)
      // const errorState = error.response.data.error
      console.log(error.response.data)
      // personService.getAll().then(data => setPersons(data))
    })
  }
}

const deletePerson = (id, name) => {
  if(window.confirm(`Delete ${name}?`)){
    personService
    .removePerson(id)
    .then(() =>  {
      setPersons(persons.filter(p => p.id !== id) )
      console.log(newName)
      setSuccessMessage(`Information of ${name} has been removed from the server`)
    })
    .catch(error => {
      errorContent(error, `Have you already deleted ${name}?`)
      // personService.getAll().then(data => setPersons(data))
      })
    }
}
    //updating state based on input updates
  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <SuccessNotification message={successMessage}/>
      <ErrorNotification message={errorMessage}/>
        <Filter 
          value={filter} 
          updateFilter={handleFilterChange} 
        />
      <h3>Add a new</h3>
        <PersonForm 
          newName={newName} 
          newNumber={newNumber} 
          addPerson={addPerson} 
          handlePersonChange={handlePersonChange} 
          handleNumberChange={handleNumberChange}         
        />
      <h3>Numbers</h3>
        <Persons 
          persons={personsToShow}
          removePerson={deletePerson}
        />
    </div>
  )
}

export default App