import { render, screen } from '@testing-library/react';
import App from './App';

test('renders email generator text', () => {
  render(<App />);
  const headerElement = screen.getByText(/Email Generator/i); // Update this line
  expect(headerElement).toBeInTheDocument();
});
