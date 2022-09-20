import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const requestPlanets = async () => {
    try {
      const response = await fetch('https://swapi.dev/api/planets');
      const data = await response.json();
      const result = data.results.filter((e) => e !== 'residents');
      setPlanets(result);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const planetsContextValue = {
    requestPlanets, planets, isLoading,
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
