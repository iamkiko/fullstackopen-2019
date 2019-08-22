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
    if (indexSameNamePerson > -1) { 
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
        setSuccessMessage(
          `Updated ${newName}`
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
      .catch(error => {
        setErrorMessage(
          `Information of ${newName} was already removed from the server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
    } else {
      personService
        .create(updatedPersonObject)
        .then(newPerson => {
        setPersons(persons.concat(newPerson))
        setSuccessMessage(`Added ${newName}`)
        setNewName('')
        setNewNumber('')
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
      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
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