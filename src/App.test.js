import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Hello Mello link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Hello Mello/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders Welcome to Mello header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Welcome to Mello/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders footer text', () => {
  render(<App />);
  const footerElement = screen.getByText(/©.*Mello. All Rights Reserved./i);
  expect(footerElement).toBeInTheDocument();
});
