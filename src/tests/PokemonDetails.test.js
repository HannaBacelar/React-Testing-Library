import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import PokemonDetails from '../components/PokemonDetails';
import App from '../App';

const mockDatails = [{
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Kanto Viridian Forest',
      map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
    },
    {
      location: 'Kanto Power Plant',
      map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    },
  ],
  summary: `This intelligent Pokémon roasts hard
  berries with electricity to make them tender enough to eat.`,
}];
const match = { params: { id: 25 } };

describe('Teste se é renderizado um card com as informações de determinado pokémon.',
  () => {
    it('O nome correto do Pokémon deve ser mostrado na tela;', () => {
      renderWithRouter(<PokemonDetails
        isPokemonFavoriteById={ false }
        match={ match }
        pokemons={ mockDatails }
        onUpdateFavoritePokemons={ false }
      />);
      const nomeDatails = screen.getByRole('heading', { name: /Pikachu details/i });
      expect(nomeDatails).toBeInTheDocument();
    });

    it('Não deve existir o link de navegação para os detalhes do Pokémon selecionado.',
      () => {
        renderWithRouter(<PokemonDetails
          isPokemonFavoriteById={ false }
          match={ match }
          pokemons={ mockDatails }
          onUpdateFavoritePokemons={ false }
        />);
        const linkNot = screen.queryByText('link', { name: /more details/i });
        expect(linkNot).not.toBeInTheDocument();
      });
    it('A seção de detalhes deve conter um heading h2 com o texto Summary', () => {
      renderWithRouter(<PokemonDetails
        isPokemonFavoriteById={ false }
        match={ match }
        pokemons={ mockDatails }
        onUpdateFavoritePokemons={ false }
      />);
      const headingh2 = screen.getByRole('heading', { name: /Summary/i });
      expect(headingh2).toBeInTheDocument();
    });
    // 'A seção de detalhes deve conter um parágrafo com o resumo..
    it('...do Pokémon específico sendo visualizadoo.', () => {
      renderWithRouter(<PokemonDetails
        isPokemonFavoriteById={ false }
        match={ match }
        pokemons={ mockDatails }
        onUpdateFavoritePokemons={ false }
      />);
      const resumo = screen.getByText(/This intelligent Pokémon roasts hard/i);
      expect(resumo).toBeInTheDocument();
    });
    // Na seção de detalhes deverá existir um heading h2 com o texto
    it('Game Locations of <name>; onde <name> é o nome do Pokémon exibido.', () => {
      renderWithRouter(<PokemonDetails
        isPokemonFavoriteById={ false }
        match={ match }
        pokemons={ mockDatails }
        onUpdateFavoritePokemons={ false }
      />);
      const nameLocation = screen.getByRole('heading', { name:
        /game locations of pikachu/i });
      expect(nameLocation).toBeInTheDocument();
    });
    it('Todas as localizações do Pokémon devem ser mostradas na seção de detalhes;',
      () => {
        renderWithRouter(<PokemonDetails
          isPokemonFavoriteById={ false }
          match={ match }
          pokemons={ mockDatails }
          onUpdateFavoritePokemons={ false }
        />);
        const loctionPokemons = screen.getByText(/Kanto Viridian Forest/i);
        expect(loctionPokemons).toBeInTheDocument();
        const locationPokemons2 = screen.getByText(/Kanto Power Plant/i);
        expect(locationPokemons2).toBeInTheDocument();
      });
    // Devem ser exibidos, o nome da localização e uma imagem ...
    it(' ..do mapa em cada localização;', () => {
      renderWithRouter(<PokemonDetails
        isPokemonFavoriteById={ false }
        match={ match }
        pokemons={ mockDatails }
        onUpdateFavoritePokemons={ false }
      />);
      const nameLocation = screen.getByText(/Kanto Viridian Forest/i);
      expect(nameLocation).toBeInTheDocument();
      const nameLocation2 = screen.getByText(/Kanto Power Plant/i);
      expect(nameLocation2).toBeInTheDocument();

      const imgLoction = screen.getAllByRole('img', { name: /Pikachu Location/i });
      expect(imgLoction).toHaveLength(2);
      expect(imgLoction[0]).toBeDefined();
      expect(imgLoction[1]).toBeDefined();
    });
    it('A imagem da locali.. deve ter um atributo src com a URL da localização;', () => {
      renderWithRouter(<PokemonDetails
        isPokemonFavoriteById={ false }
        match={ match }
        pokemons={ mockDatails }
        onUpdateFavoritePokemons={ false }
      />);
      const imgLocationPt2 = screen.getAllByRole('img', { name: /Pikachu Location/i });
      expect(imgLocationPt2).toHaveLength(2);
      expect(imgLocationPt2[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
      expect(imgLocationPt2[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    });
    // A imagem da localização deve ter um atributo alt com..
    it('o texto <name> location, onde <name> é o nome do Pokémon;', () => {
      renderWithRouter(<PokemonDetails
        isPokemonFavoriteById={ false }
        match={ match }
        pokemons={ mockDatails }
        onUpdateFavoritePokemons={ false }
      />);
      const imagemloc = screen.getAllByRole('img', { name: /Pikachu Location/i });
      expect(imagemloc).toHaveLength(2);
    });
    it('A página deve exibir um checkbox que permite favoritar o Pokémon;', () => {
      renderWithRouter(<App />);
      const moreDetails = screen.getByRole('link', { name: /more details/i });
      userEvent.click(moreDetails);

      const checkbox = screen.getByRole('checkbox', {
        name: /pokémon favoritado\?/i,
      });
      expect(checkbox).toBeInTheDocument();

      userEvent.click(checkbox);
      expect(checkbox).toBeChecked();

      userEvent.click(checkbox);
      expect(checkbox).not.toBeChecked();
    });

    it('O label do checkbox deve conter o texto Pokémon favoritado?', () => {
      renderWithRouter(<PokemonDetails
        isPokemonFavoriteById={ false }
        match={ match }
        pokemons={ mockDatails }
        onUpdateFavoritePokemons={ false }
      />);
      const label = screen.getByText(/Pokémon favoritado?/i);
      expect(label).toBeInTheDocument();
    });
  });
