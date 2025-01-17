import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Hello Mello link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Hello Mello/i);
  expect(linkElement).toBeInTheDocument();
});
