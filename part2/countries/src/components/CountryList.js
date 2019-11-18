import React from "react";
import Country from "./Country";
import DetailedCountry from "./DetailedCountry";

//obtain initial state and showCountry function from Country component
const CountryList = ({ countries, setCountry, showCountry }) => {
  // conditional flow for varying amount of results
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else if (countries.length === 1) {
    return (
      <DetailedCountry country={countries[0]} /> //returns an array but if only one country, obtain the 'first'/only result
    );
  } else if (countries.length > 1) {
    //to show a list of country names (country) + updated state (setCountry) + button to show more info about specific country (showCountry)
    return countries.map(country => (
      <Country
        key={country.name}
        country={country}
        setCountry={setCountry}
        showCountry={showCountry}
      />
    ));
  } else {
    return <div>No countries match your search.</div>;
  }
};

export default CountryList;
