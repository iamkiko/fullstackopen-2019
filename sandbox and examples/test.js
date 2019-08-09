import React from 'react'

const Countries = ({ countries, countriesToShow }) => {

    const detailedCountry = () => {
      return (
        <h2>{country.name}</h2>
        <p>{country.capital}</p>
        <p>{country.population}</p>
        <h3>languages</h3>
        <ul>{country.languages}</ul>
      )
      
    }
    const searchResult = () => {
        if (countriesToShow.length > 10) { 
          return <p>too many matches, specify another filter</p>
        }
      else if (countriesToShow.length === 1) { 
          return <p>{detailedCountry}</p>   }
      else {
        return <p>{countriesToShow}</p> 
      }
  
      }

    //put in conditional flow here
    // (<p>{person.name} {person.number}</p>)
const display = () => 
    countries.map((country) => 
        <div key={country.name}>{country.name}</div>) //change key to id?
            return (
            <>
            {display()}
            </>
            )
} 
export default Countries