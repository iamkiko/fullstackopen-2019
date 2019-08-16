import React from 'react'
import Languages from './Languages'
import Weather from './Weather'
   
    //obtaining country (init state)
   const DetailedCountry = ({country}) => {
      return (
        <div key={country.name}>
            <h2>{country.name}</h2>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <h3>Languages spoken: </h3>
            <Languages country={country}/>
            <img src={country.flag} alt={`${country.name}'s flag`} height="170" width="170"/>
            <Weather country={country}/>
        </div>
   )
}

export default DetailedCountry