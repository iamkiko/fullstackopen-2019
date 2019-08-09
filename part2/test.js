import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filter, setFilter] = useState('')

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
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    if (persons.map(x => x.name).includes(newName)){
      alert(`${newName} is already added to the phonebook`)
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
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
        <Persons persons={personsToShow}/>
    </div>
  )
}

export default App