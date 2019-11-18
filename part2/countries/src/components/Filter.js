import React from "react";

//destructing the inputs of country searched for in the input and initial country searched for
const Filter = ({ handleFilterChange, chosenCountry }) => {
  return (
    <div>
      Find countries:{" "}
      <input value={chosenCountry} onChange={handleFilterChange} />
    </div>
  );
};

export default Filter;
