import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import FilterProvider from '../context/FilterProvider';
import userEvent from '@testing-library/user-event';

it("Deve realizar um fetch no App", async () => {
  render(
    <FilterProvider>
      <App />
    </FilterProvider>
  )
  const tatooine = await screen.findByText(/tatooine/i);
  expect(tatooine).toBeInTheDocument();
});

it("Deve filtrar um item pelo input de texto", async () => {
  render(
    <FilterProvider>
      <App />
    </FilterProvider>
  )
  await waitFor(() => {
    const coruscant = screen.getByText(/Coruscant/i);
    expect(coruscant).toBeInTheDocument();
  })
  const nameInput = screen.getByTestId('name-filter');
  expect(nameInput).toBeInTheDocument();
  userEvent.type(nameInput, "Corus")
});

it("Deve ser possível filtrar utilizando o drop-down list de tipo da pesquisa", async () => {
  render(
    <FilterProvider>
      <App />
    </FilterProvider>
  )
  await waitFor(() => {
    const coruscant = screen.getByText(/Coruscant/i);
    expect(coruscant).toBeInTheDocument();
  })
  const typeSelect = screen.getByTestId('column-filter');
  expect(typeSelect).toBeInTheDocument();
  userEvent.selectOptions(typeSelect, 'population')
});

it("Deve ser possível filtrar utilizando multiplos drop-down lists", async () => {
  render(
    <FilterProvider>
      <App />
    </FilterProvider>
  )
  await waitFor(() => {
    const coruscant = screen.getByText(/Coruscant/i);
    expect(coruscant).toBeInTheDocument();
  })
  const typeSelect = screen.getByTestId('column-filter');
  userEvent.selectOptions(typeSelect, 'surface_water');
  const operatorSelect = screen.getByTestId('comparison-filter');
  userEvent.selectOptions(operatorSelect, 'igual a');
  const numberInput = screen.getByTestId('value-filter');
  userEvent.type(numberInput, '100');
  const button = screen.getByTestId('button-filter');
  userEvent.click(button);

  const secondTypeSelect = screen.getByTestId('column-filter');
  userEvent.selectOptions(secondTypeSelect, 'diameter');
  const secondOperatorSelect = screen.getByTestId('comparison-filter');
  userEvent.selectOptions(secondOperatorSelect, 'menor que');
  const secondNumberInput = screen.getByTestId('value-filter');
  userEvent.type(secondNumberInput, '10000');
  const secondButton = screen.getByTestId('button-filter');
  userEvent.click(secondButton);

  const thirdTypeSelect = screen.getByTestId('column-filter');
  userEvent.selectOptions(thirdTypeSelect, 'orbital_period');
  const thirdOperatorSelect = screen.getByTestId('comparison-filter');
  userEvent.selectOptions(thirdOperatorSelect, 'maior que');
  const thirdNumberInput = screen.getByTestId('value-filter');
  userEvent.type(thirdNumberInput, '500');
  const thirdButton = screen.getByTestId('button-filter');
  userEvent.click(thirdButton);
});