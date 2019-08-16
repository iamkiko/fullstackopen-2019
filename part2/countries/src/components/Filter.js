<<<<<<< HEAD
import React from 'react'

//destructing the inputs of country searched for in the input and initial country searched for
const Filter = ({handleFilterChange, chosenCountry}) => {
    return (
      <div>
      find countries:
          <input 
            value={chosenCountry}
            onChange={handleFilterChange} 
          />
      </div>
    )
  }

export default Filter
||||||| merged common ancestors
=======
import React from 'react'

//destructing the inputs of country searched for in the input and initial country searched for
const Filter = ({handleFilterChange, chosenCountry}) => {
    return (
      <div>
      find countries:
          <input 
            value={chosenCountry}
            onChange={handleFilterChange} 
          />
      </div>
    )
  }

export default Filter
>>>>>>> 4485d87913d18963e60650c66c8ab6f2831fa7f0
