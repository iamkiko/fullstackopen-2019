import React from 'react'

//destructure country and setCountry (initial states)
const Country = ({ country, setCountry }) => {
    const showCountry = () => { //button functionality to show more when clicked below
        setCountry(country.name)
    }
    return (
        <div>
            {country.name} 
            <button onClick={showCountry}>show</button>
        </div>
    )
} 
export default Country 