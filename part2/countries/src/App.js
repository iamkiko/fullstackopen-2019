import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import CountryList from "./components/CountryList";
import countryStyles from "./components/country.module.scss";

const App = () => {
  //setting state
  const [countries, setCountries] = useState([]);
  const [chosenCountry, setChosenCountry] = useState("");

  //obtaining data from country API via useEffect
  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      setCountries(response.data);
    });
  }, []);

  //updating input search and updating state of country searched for
  const handleFilterChange = event => {
    setChosenCountry(event.target.value);
  };

  //filter/search function
  const countriesToShow = countries.filter(country =>
    country.name.toLowerCase().includes(chosenCountry.toLowerCase())
  );

  return (
    <div className={countryStyles.container}>
      <Filter
        chosenCountry={chosenCountry}
        handleFilterChange={handleFilterChange}
      />
      <h1>Countries & Their Information</h1>
      <CountryList countries={countriesToShow} setCountry={setChosenCountry} />
    </div>
  );
};

export default App;
