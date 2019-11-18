import React from "react";
import countryStyles from "./country.module.scss";

//destructure country and setCountry (initial states)
const Country = ({ country, setCountry }) => {
  const showCountry = () => {
    //button functionality to show more when clicked below
    setCountry(country.name);
  };
  return (
    <div>
      {country.name}{" "}
      <button className={countryStyles.button} onClick={showCountry}>
        Show
      </button>
    </div>
  );
};
export default Country;
