import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';

const favoritesMockPokemons = [{
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',

},
{
  id: 4,
  name: 'Charmander',
  type: 'Fire',
  averageWeight: {
    value: '8.5',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)',
}];

describe('Teste o componente <FavoritePokemons.js />', () => {
  // Teste se é exibido na tela a mensagem No favorite pokemon found,
  test(' ...se a pessoa não tiver pokémons favoritos.', () => {
    renderWithRouter(<FavoritePokemons />);
    const naoPokemon = screen.getByText(/No favorite pokemon found/i);
    expect(naoPokemon).toBeInTheDocument();
  });

  test('Teste se é exibido todos os cards de pokémons favoritados. ', () => {
    renderWithRouter(<FavoritePokemons pokemons={ favoritesMockPokemons } />);
    const todosCards = screen.getAllByTestId('pokemon-name');
    expect(todosCards).toHaveLength(2);
  });
});
