import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
// REQUISITO 1

describe(' o topo da aplicação contém um conjunto fixo de links de navegação', () => {
  it('O primeiro link deve possuir o texto Home.', () => {
    renderWithRouter(<App />);
    const home = screen.getByText(/Home/i);
    expect(home).toBeInTheDocument();
  });

  it('O segundo link deve possuir o texto About.', () => {
    renderWithRouter(<App />);
    const about = screen.getByText(/About/i);
    expect(about).toBeInTheDocument();
  });

  it('O terceiro link deve possuir o texto Favorite Pokémons.', () => {
    renderWithRouter(<App />);
    const favoritePokemons = screen.getByText(/Favorite Pokémons/i);
    expect(favoritePokemons).toBeInTheDocument();
  });

  it('É redi a página inicial,na URL / ao clicar no link Home da barra de naveg ', () => {
    const { history } = renderWithRouter(<App />);
    const pagInittial = screen.getByRole('link', { name: /Home/i });
    expect(pagInittial).toBeInTheDocument();
    userEvent.click(pagInittial);
    expect(history.location.pathname).toBe('/');
  });

  it('É redi a página de About, na URL /about, ao clicar no link About da barra ', () => {
    const { history } = renderWithRouter(<App />);
    const pagAbout = screen.getByRole('link', { name: /About/i });
    expect(pagAbout).toBeInTheDocument();
    userEvent.click(pagAbout);
    expect(history.location.pathname).toBe('/about');
  });

  // é redirecionada
  it('Pokémons Favoritados,na URL /fav ao clicar no link FavPokémons. ', () => {
    const { history } = renderWithRouter(<App />);
    const pagPokemonFav = screen.getByRole('link', { name: /favorite/i });
    expect(pagPokemonFav).toBeInTheDocument();
    userEvent.click(pagPokemonFav);
    expect(history.location.pathname).toBe('/favorites');
  });

  it('É redirecionada para a página Not Found ao entrar em uma URL desconhecida.', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/NoFound');

    const notFound = screen.getByRole('heading',
      { name: /Page requested not found/i });
    expect(notFound).toBeInTheDocument();
  });
});
