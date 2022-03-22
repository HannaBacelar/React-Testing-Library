import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('Teste se a página contém as informações sobre a Pokédex ', () => {
  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const h2Pokedex = screen.getByRole('heading', {
      name: /About Pokédex/i,
      level: 2,
    });
    expect(h2Pokedex).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    const paragrafosPoker1 = screen.getByText(/This application/i);
    expect(paragrafosPoker1).toBeInTheDocument();

    const paragrafosPoker2 = screen.getByText(/One can filter Pokémons by type/i);
    expect(paragrafosPoker2).toBeInTheDocument();
  });

  it('Teste se a página contém a seguinte imagem de uma Pokédex:', () => {
    renderWithRouter(<About />);
    const imagemPokedex = screen.getByRole('img');
    expect(imagemPokedex.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
