<<<<<<< HEAD
import React from 'react'

const Persons = ({ persons, removePerson }) => {
    const display = () => 
    persons.map((person) => 
    <div key={person.id}>
            {person.name} 
            {person.number} 
            <button onClick={() => removePerson(person.id, person.name)}> delete</button>
    </div>) //change key to id?
            return (
                <>
                {display()}
                </>
            )
} 
export default Persons
||||||| merged common ancestors
=======
import React from 'react'

const Persons = ({ persons, removePerson }) => {
    const display = () => 
    persons.map((person) => 
    <div key={person.id}>
            {person.name} 
            {person.number} 
            <button onClick={() => removePerson(person.id, person.name)}> delete</button>
    </div>) //change key to id?
            return (
                <>
                {display()}
                </>
            )
} 
export default Persons
>>>>>>> 4485d87913d18963e60650c66c8ab6f2831fa7f0
