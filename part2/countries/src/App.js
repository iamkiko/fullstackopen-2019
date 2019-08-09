import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import CountryList  from './components/CountryList'

const App = () =>  {
  //setting state
  const [ countries, setCountries ] = useState([])
  const [ chosenCountry, setChosenCountry ] = useState('')

  //obtaining data from country API via useEffect
  useEffect(() => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountries(response.data)
    })
  }, [])

  //updating input search and updating state of country searched for
  const handleFilterChange = (event) => {
    setChosenCountry(event.target.value)
  }

    //filter/search function
  const countriesToShow = countries.filter(country => 
    country.name.toLowerCase().includes(chosenCountry.toLowerCase()))

  return (
    <div>
      <Filter 
        chosenCountry={chosenCountry}
        handleFilterChange={handleFilterChange}
      />
      <h3>Countries</h3>
      <CountryList 
        countries={countriesToShow} 
        setCountry={setChosenCountry} 
      />
    </div>
  )

}

export default App
