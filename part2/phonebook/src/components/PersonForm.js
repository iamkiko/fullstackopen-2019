<<<<<<< HEAD
import React from 'react'

const PersonForm = ({newName, newNumber, addPerson, handlePersonChange, handleNumberChange }) => 
    <div>
    <form onSubmit={addPerson}>
      <div>
        name:
        <input
              value={newName}
              onChange={handlePersonChange}
          />
      </div>
      <div>
      number:
        <input
          value={newNumber}
          onChange={handleNumberChange}
        />
        <br></br>
      </div>
      <div>
         <button type="submit">add or update</button>
      </div>
    </form>
  </div>


export default PersonForm
||||||| merged common ancestors
=======
import React from 'react'

const PersonForm = ({newName, newNumber, addPerson, handlePersonChange, handleNumberChange }) => 
    <div>
    <form onSubmit={addPerson}>
      <div>
        name:
        <input
              value={newName}
              onChange={handlePersonChange}
          />
      </div>
      <div>
      number:
        <input
          value={newNumber}
          onChange={handleNumberChange}
        />
        <br></br>
      </div>
      <div>
         <button type="submit">add or update</button>
      </div>
    </form>
  </div>


export default PersonForm
>>>>>>> 4485d87913d18963e60650c66c8ab6f2831fa7f0
