import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Header() {
  const { filterByName, handleChangeName } = useContext(PlanetsContext);

  return (
    <div>
      <form>
        <input
          type="text"
          name="name"
          data-testid="name-filter"
          onChange={ handleChangeName }
          value={ filterByName.name }
        />
      </form>
    </div>
  );
}

export default Header;
