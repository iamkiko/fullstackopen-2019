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