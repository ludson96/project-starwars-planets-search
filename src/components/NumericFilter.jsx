import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function NumericFilter() {
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState('0');
  const tiposColunas = ['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water'];
  const [columnSelect, setColumnSelect] = useState(tiposColunas);

  const tiposOperadores = ['maior que', 'menor que', 'igual a'];

  const {
    filteredPlanets,
    setFilteredPlanets,
    todosFiltros, setTodosFiltros,
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

  function handleSubmit() {
    let selectedFilters = [];
    if (comparison === 'maior que') {
      selectedFilters = filteredPlanets.filter((planet) => planet[column]
        !== 'unknown' && +planet[column] > +value);
    }
    if (comparison === 'menor que') {
      selectedFilters = filteredPlanets.filter((planet) => planet[column]
        !== 'unknown' && +planet[column] < +value);
    }
    if (comparison === 'igual a') {
      selectedFilters = filteredPlanets.filter((planet) => +planet[column] === +value);
    }
    const tiposFiltros = {
      column,
      comparison,
      value,
    };
    const newfilter = columnSelect.filter((item) => item !== column);
    setTodosFiltros([...todosFiltros, tiposFiltros]);
    setFilteredPlanets(selectedFilters);
    setColumnSelect(newfilter);
    setColumn(newfilter[0]);
  }

  const handleEraseBtn = ({ target }) => {
    const recoveredColumn = (target.previousElementSibling.innerText).split(' ');
    setColumnSelect(columnSelect.concat(recoveredColumn[0]));
    const teste = todosFiltros.filter((filter) => filter.column !== recoveredColumn[0]);
    setTodosFiltros(teste);
  };

  return (
    <div>

      <form>
        <select
          name="column"
          data-testid="column-filter"
          value={ column }
          onChange={ handleChangeColumn }
        >
          {
            columnSelect.map((item) => (
              <option
                value={ item }
                key={ item }
              >
                {item}
              </option>
            ))
          }
        </select>

        <select
          name="comparison"
          data-testid="comparison-filter"
          value={ comparison }
          onChange={ handleChangeComparison }
        >
          {
            tiposOperadores.map((item) => (
              <option
                id="id"
                value={ item }
                key={ item }
              >
                {item}
              </option>
            ))
          }
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
          onClick={ handleSubmit }
        >
          FILTRAR
        </button>
      </form>

      {
        todosFiltros.map((item, i) => (
          <div key={ i } data-testid="filter">
            <p>{`${item.column} ${item.comparison} ${item.value}`}</p>
            <button
              type="button"
              onClick={ handleEraseBtn }
            >
              apagar
            </button>
          </div>
        ))
      }
    </div>
  );
}

export default NumericFilter;
