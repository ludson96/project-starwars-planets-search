import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import ISSApi from '../services/ISSApi';

function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [inputNameFilter, setInputNameFilter] = useState('');
  const [filteredPlanets, setFilteredPlanets] = useState([]);

  const requestPlanets = async () => {
    try {
      const data = await ISSApi();
      const result = data.results.filter((e) => e !== 'residents');
      setPlanets(result);
      setFilteredPlanets(result);
    } catch (error) {
      setError('Erro na API');
    } finally {
      setIsLoading(false);
    }
  };

  const planetsContextValue = {
    planets,
    isLoading,
    requestPlanets,
    inputNameFilter,
    setInputNameFilter,
    filteredPlanets,
    setFilteredPlanets,
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
