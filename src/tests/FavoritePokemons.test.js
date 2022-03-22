import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <FavoritePokemons.js />', () => {
  // Teste se é exibido na tela a mensagem No favorite pokemon found,
  test(' ...se a pessoa não tiver pokémons favoritos.', () => {
    renderWithRouter(<FavoritePokemons />);
    const naoPokemon = screen.getByText(/No favorite pokemon found/i);
    expect(naoPokemon).toBeInTheDocument();
  });
//   test('Teste se é exibido todos os cards de pokémons favoritados. ', () => {
//     renderWithRouter(<FavoritePokemons />);
//     const todosCards = screen.getByText(/No favorite pokemon found/i);
//     expect(todosCards).toBeInTheDocument();
//   });
});
