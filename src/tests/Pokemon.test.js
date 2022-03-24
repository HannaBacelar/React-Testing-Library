import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';
// REQUISITO 6

const mockPokemon = {
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
};

// 'Teste se é renderizado...
describe('...um card com as informações de determinado pokémon', () => {
  it('O nome correto do Pokémon deve ser mostrado na tela;', () => {
    renderWithRouter(<Pokemon pokemon={ mockPokemon } isFavorite={ false } />);
    const nomePokemon = screen.getByTestId('pokemon-name');
    expect(nomePokemon).toHaveTextContent(/Pikachu/i);
  });

  it('O tipo correto do pokémon deve ser mostrado na tela.;', () => {
    renderWithRouter(<Pokemon pokemon={ mockPokemon } isFavorite={ false } />);
    const typePokemon = screen.getByTestId('pokemon-type');
    expect(typePokemon).toHaveTextContent(/Electric/i);
  });
  it('O peso médio do pokémon deve ser exibido com um texto no formato;', () => {
    renderWithRouter(<Pokemon pokemon={ mockPokemon } isFavorite={ false } />);
    const valuePokemon = screen.getByTestId('pokemon-weight');
    expect(valuePokemon).toHaveTextContent(/6.0/i);
  });

  it('A imagem do Pokémon deve ser exibida. ;', () => {
    renderWithRouter(<Pokemon pokemon={ mockPokemon } isFavorite={ false } />);
    const imgPokemon = screen.getByRole('img', { name: /sprite/i });
    expect(imgPokemon.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('Teste se o card do Pokémon indicado na Pokédex contém um link.;', () => {
    renderWithRouter(<Pokemon pokemon={ mockPokemon } isFavorite={ false } />);
    const linkPokemon = screen.getByRole('link', { name: /More details/i });
    expect(linkPokemon).toHaveAttribute('href', '/pokemons/25');
  });

  // 'Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento
  it('...da aplicação para a página de detalhes de Pokémon..;', () => {
    const { history } = renderWithRouter(<Pokemon
      pokemon={ mockPokemon }
      isFavorite={ false }
    />);
    const linkNaveg = screen.getByRole('link', { name: /More details/i });
    userEvent.click(linkNaveg);
    expect(history.location.pathname).toBe('/pokemons/25');
  });
});

describe('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
  // 'O ícone deve ser uma imagem com...
  it('... o atributo src contendo o caminho /star-icon.svg;', () => {
    renderWithRouter(<Pokemon pokemon={ mockPokemon } isFavorite />);
    const iconeStar = screen.getByRole('img', { name: /is marked as favorite/i });
    expect(iconeStar).toHaveAttribute('src', '/star-icon.svg');
    expect(iconeStar).toBeDefined();
  });
});
