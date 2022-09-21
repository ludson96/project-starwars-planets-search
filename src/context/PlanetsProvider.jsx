import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import ISSApi from '../services/ISSApi';

function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [filterByName, setFilterByName] = useState({ name: '' });

  const requestPlanets = async () => {
    try {
      const data = await ISSApi();
      const result = data.results.filter((e) => e !== 'residents');
      setPlanets(result);
    } catch (error) {
      setError('Erro na API');
    } finally {
      setIsLoading(false);
    }
  };

  // função que filtra pelo input name
  function handleChangeName({ target }) {
    setFilterByName({ name: target.value });
  }

  const filteredName = filterByName.name.length > 0
    ? planets.filter((item) => item.name.includes(filterByName.name))
    : planets;

  const planetsContextValue = {
    requestPlanets,
    isLoading,
    planets,
    filterByName,
    handleChangeName,
    filteredName,
  };

  return (
    <PlanetsContext.Provider value={ planetsContextValue }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
