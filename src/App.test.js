import { render, screen } from '@testing-library/react';
import App from './App';

test('renderiza la página de inicio', () => {
  render(<App />);
  expect(screen.getByRole('heading', { level: 1, name: /web gallery/i })).toBeInTheDocument();
});
