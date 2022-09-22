import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import testData from '../../cypress/mocks/testData';
import PlanetsProvider from '../context/PlanetsProvider';

describe('', () => {
  it('Testando se o "Carregando..." renderiza na tela antes da chamada da API e se sai ao carregar', () => {
    render(<App />)
    const loading = screen.getByText(/Carregando.../i);
    expect(loading).toBeInTheDocument();
    waitFor(() => {
      expect(loading).not.toBeInTheDocument();
    });
    const btnFilter = screen.getByRole('heading', { level: 1 }, {name: /Projeto Star Wars - Trybe/i});
    expect(btnFilter).toBeInTheDocument();
  })

  it('Testando se renderiza a API na tela', async() => {
    render(<PlanetsProvider><App /></PlanetsProvider>)
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve(testData),
    });

    await waitFor(() => {
      expect(fetch).toHaveBeenCalled()
    });

    const Naboo = await screen.findByText('Naboo');
    expect(Naboo).toBeInTheDocument();

  });
})