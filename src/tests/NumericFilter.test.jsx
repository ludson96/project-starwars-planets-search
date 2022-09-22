import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import testData from '../../cypress/mocks/testData';
import PlanetsProvider from '../context/PlanetsProvider';
import userEvent from '@testing-library/user-event';

describe('Testando componente NumericFilter', () => {
  it('Testando se existe todos os campos para o filtro', () => {
    render(<App />)

    const inputFilterColumn = screen.getByTestId('column-filter');
    const inputFilterComparison = screen.getByTestId('comparison-filter');
    const inputFilterValue = screen.getByTestId('value-filter');
    const btnFilter = screen.getByRole('button', { name: /filtrar/i })

    expect(inputFilterColumn).toBeInTheDocument()
    expect(inputFilterComparison).toBeInTheDocument()
    expect(inputFilterValue).toBeInTheDocument()
    expect(btnFilter).toBeInTheDocument()
    
  })
  
  it('Testando se ao pesquisar planetas com a polução maior que 100000000 resta apenas 4 planetas', () => {
    render(<PlanetsProvider><App /></PlanetsProvider>)
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve(testData),
    });

    const inputFilterColumn = screen.getByTestId('column-filter');
    const inputFilterComparison = screen.getByTestId('comparison-filter');
    const inputFilterValue = screen.getByTestId('value-filter');
    const btnFilter = screen.getByRole('button', { name: /filtrar/i })

    userEvent.selectOptions(
      inputFilterColumn,
      screen.getByRole('option', { name: 'diameter' })
    )
    userEvent.selectOptions(
      inputFilterComparison,
      screen.getByRole('option', { name: 'igual a' })
    )
    userEvent.type(inputFilterValue, '10200');
    userEvent.click(btnFilter)

    const loading = screen.getByText(/Carregando.../i);
    waitFor(() => {
      expect(loading).not.toBeInTheDocument();
      const planets = screen.getAllByTestId('name-planet')
      expect(planets).toHaveLength(10)
    });


  })

  it('Testando a comparação "menor que" ', () => {
    render(<PlanetsProvider><App /></PlanetsProvider>)
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve(testData),
    });

    const inputFilterColumn = screen.getByTestId('column-filter');
    const inputFilterComparison = screen.getByTestId('comparison-filter');
    const inputFilterValue = screen.getByTestId('value-filter');
    const btnFilter = screen.getByRole('button', { name: /filtrar/i })

    userEvent.selectOptions(
      inputFilterColumn,
      screen.getByRole('option', { name: 'orbital_period' })
    )
    userEvent.selectOptions(
      inputFilterComparison,
      screen.getByRole('option', { name: 'menor que' })
    )
    userEvent.type(inputFilterValue, '549');
    userEvent.click(btnFilter)

    const loading = screen.getByText(/Carregando.../i);
    waitFor(() => {
      expect(loading).not.toBeInTheDocument();
      const planets = screen.getAllByTestId('name-planet')
      expect(planets).toBeInTheDocument()
    });

  })

  it('Testando a comparação "maior que" ', () => {
    render(<PlanetsProvider><App /></PlanetsProvider>)
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve(testData),
    });

    const inputFilterComparison = screen.getByTestId('comparison-filter');
    const btnFilter = screen.getByRole('button', { name: /filtrar/i })

    userEvent.selectOptions(
      inputFilterComparison,
      screen.getByRole('option', { name: 'maior que' })
    )
    userEvent.click(btnFilter)

    const loading = screen.getByText(/Carregando.../i);
    waitFor(() => {
      expect(loading).not.toBeInTheDocument();
      const planets = screen.getAllByTestId('name-planet')
      expect(planets).toHaveLength(1)
    });

  })
})