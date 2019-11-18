import React from "react";
import Languages from "./Languages";
import Weather from "./Weather";
import countryStyles from "./country.module.scss";

//obtaining country (init state)
const DetailedCountry = ({ country }) => {
  return (
    <div className={countryStyles.country}>
      <div key={country.name}>
        <h2>{country.name}</h2>
        <img
          className={countryStyles.flag}
          src={country.flag}
          alt={`${country.name}'s flag`}
          height="170"
          width="170"
        />
        <p>
          <span className={countryStyles.detail}>Region: </span>
          {country.subregion}
        </p>
        <p>
          <span className={countryStyles.detail}>Capital: </span>
          {country.capital}
        </p>
        <p>
          <span className={countryStyles.detail}>Population: </span>{" "}
          {country.population}
        </p>
      </div>
      <div className={countryStyles.language}>
        <h3>Languages spoken: </h3>
        <Languages country={country} />
      </div>
      <div className={countryStyles.weather}>
        <Weather country={country} />
      </div>
    </div>
  );
};

export default DetailedCountry;
