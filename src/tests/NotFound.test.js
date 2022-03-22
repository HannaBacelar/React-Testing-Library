import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

describe(' Teste o componente <NotFound.js />', () => {
  it('Teste..contém um heading h2 com o texto Page requested not found 😭', () => {
    renderWithRouter(<NotFound />);
    const textNotFound = screen.getByText(/Page requested not found/i);
    expect(textNotFound).toBeInTheDocument();
  });
  it('Teste se página mostra a imagem', () => {
    renderWithRouter(<NotFound />);
    const imagem = screen.getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(imagem.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
