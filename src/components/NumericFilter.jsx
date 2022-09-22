import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function NumericFilter() {
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);

  const {
    filteredPlanets,
    setFilteredPlanets,
  } = useContext(PlanetsContext);

  const handleChangeColumn = ({ target }) => {
    setColumn(target.value);
  };

  const handleChangeComparison = ({ target }) => {
    setComparison(target.value);
  };

  const handleChangeValue = ({ target }) => {
    setValue(target.value);
  };

  function handleSubmitNumeric() {
    let filteredOptions = [];
    if (comparison === 'maior que') {
      filteredOptions = filteredPlanets.filter((item) => item[column]
        !== 'unknown' && +item[column] > +value);
    }
    if (comparison === 'menor que') {
      filteredOptions = filteredPlanets.filter((item) => item[column]
        !== 'unknown' && +item[column] < +value);
    }
    if (comparison === 'igual a') {
      filteredOptions = filteredPlanets.filter((item) => +item[column] === +value);
    }
    setFilteredPlanets(filteredOptions);
  }

  return (
    <div>

      <form>
        <select
          name="column"
          data-testid="column-filter"
          value={ column }
          onChange={ handleChangeColumn }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>

        <select
          name="comparison"
          data-testid="comparison-filter"
          value={ comparison }
          onChange={ handleChangeComparison }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>

        <input
          type="number"
          name="value"
          data-testid="value-filter"
          value={ value }
          onChange={ handleChangeValue }
        />

        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleSubmitNumeric }
        >
          FILTRAR
        </button>
      </form>
    </div>
  );
}

export default NumericFilter;
