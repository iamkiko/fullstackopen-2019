<<<<<<< HEAD
import React from 'react'

const Filter = ({persons, filter, updateFilter}) => {
  

    const callFilterFunction = event => {
      event.preventDefault();
      persons(filter);

    //   if (persons.filter(person => person.name.toLowerCase()
    //   .includes(filter.toLowerCase()))){

    //   }
    }

  
    return (
      <div>
            <form onSubmit={callFilterFunction}>
              <div>
              filter shown with:
                  <input 
                  value={filter}
                  onChange={updateFilter} //need to () => hSC()?
                  />
              </div>
            </form>
          </div>
    )
  }

  export default Filter
||||||| merged common ancestors
=======
import React from 'react'

const Filter = ({persons, filter, updateFilter}) => {
  

    const callFilterFunction = event => {
      event.preventDefault();
      persons(filter);

    //   if (persons.filter(person => person.name.toLowerCase()
    //   .includes(filter.toLowerCase()))){

    //   }
    }

  
    return (
      <div>
            <form onSubmit={callFilterFunction}>
              <div>
              filter shown with:
                  <input 
                  value={filter}
                  onChange={updateFilter} //need to () => hSC()?
                  />
              </div>
            </form>
          </div>
    )
  }

  export default Filter
>>>>>>> 4485d87913d18963e60650c66c8ab6f2831fa7f0
