import React from 'react';
import './App.css';
import PlanetsProvider from './context/PlanetsProvider';
import Table from './components/Table';
import InputNameFilter from './components/InputNameFilter';
import NumericFilter from './components/NumericFilter';

function App() {
  return (
    <PlanetsProvider>
      <InputNameFilter />
      <NumericFilter />
      <Table />
    </PlanetsProvider>
  );
}

export default App;
