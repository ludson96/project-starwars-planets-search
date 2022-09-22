import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function InputNameFilter() {
  const {
    planets,
    inputNameFilter,
    setInputNameFilter,
    setFilteredPlanets,
  } = useContext(PlanetsContext);

  const handleInput = ({ target }) => {
    const nameSearched = target.value.toLowerCase();
    setInputNameFilter(nameSearched);
    const filteredPlanets = planets.filter((item) => item.name.toLowerCase()
      .includes(nameSearched));
    setFilteredPlanets(filteredPlanets);
  };

  return (
    <>
      <h1>Projeto Star Wars - Trybe</h1>
      <input
        type="text"
        data-testid="name-filter"
        value={ inputNameFilter }
        onChange={ handleInput }
      />
    </>
  );
}

export default InputNameFilter;
