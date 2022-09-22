import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import App from '../App';
import PlanetsProvider from '../context/PlanetsProvider';
import testData from '../../cypress/mocks/testData';
import userEvent from "@testing-library/user-event";

describe('Componente InputNameFilter', () => {
  it('Testando se existe um input para filtrar pelo nome' , () => {
    render(<App />)

    const inputName = screen.getByRole('textbox')
    expect(inputName).toBeInTheDocument();
  })

  it('Testando se ao digitar "oo" exibe apenas os planetas "Tatooine" e "Naboo"' , async () => {
    render(<PlanetsProvider><App /></PlanetsProvider>)
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve(testData),
    });
    const inputName = screen.getByRole('textbox')
    userEvent.type(inputName, 'oo')
    expect(inputName).toHaveValue('oo')


    waitFor(() => {
      const planets = screen.getByText('Naboo');
      expect(planets).toBeInTheDocument()
    });



  })
})