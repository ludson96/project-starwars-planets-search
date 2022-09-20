import React, { useContext, useEffect } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Table() {
  const { requestPlanets, planets, isLoading } = useContext(PlanetsContext);

  useEffect(() => {
    requestPlanets();
  }, []);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <main>
      <table>
        <thead>
          <tr className="column">
            <th className="line">Name</th>
            <th className="line">Rotation Period</th>
            <th className="line">Orbital Period</th>
            <th className="line">Diameter</th>
            <th className="line">Climate</th>
            <th className="line">Gravity</th>
            <th className="line">Terrain</th>
            <th className="line">Surface Water</th>
            <th className="line">Population</th>
            <th className="line">Films</th>
            <th className="line">Created</th>
            <th className="line">Edited</th>
            <th className="line">URL</th>
          </tr>
        </thead>
        <tbody>
          {planets.map((planet) => (
            <tr key={ planet.name } className="column">
              <td className="line">{planet.name}</td>
              <td className="line">{planet.rotation_period}</td>
              <td className="line">{planet.orbital_period}</td>
              <td className="line">{planet.diameter}</td>
              <td className="line">{planet.climate}</td>
              <td className="line">{planet.gravity}</td>
              <td className="line">{planet.terrain}</td>
              <td className="line">{planet.surface_water}</td>
              <td className="line">{planet.population}</td>
              <td className="line">{planet.films}</td>
              <td className="line">{planet.created}</td>
              <td className="line">{planet.edited}</td>
              <td className="line">{planet.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default Table;
