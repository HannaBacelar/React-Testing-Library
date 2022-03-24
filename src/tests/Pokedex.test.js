import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import Pokedex from '../components/Pokedex';
import App from '../App';
import renderWithRouter from './renderWithRouter';

// REQUISITO 5

describe(' Teste o componente <Pokedex.js />', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const testeH2 = screen.getByRole('heading', {
      name: /encountered pokémons/i,
      level: 2,
    });
    expect(testeH2).toBeInTheDocument();
  });
});

// Teste se é exibido..

// describe('o próximo Pokémon da lista quando o botão Próximo pokémon é clicado', () => {
//   it('O botão deve conter o texto Próximo pokémon', () => {
//     renderWithRouter(<App />);
//     const buttonNextPokemon = screen.getByTestId('button', { name: /Próximo pokémon/i });
//     userEvent.click(buttonNextPokemon);
//     expect(buttonNextPokemon).toBeInTheDocument();
//   });
// });
