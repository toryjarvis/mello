import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders "Hello Mello" link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Hello Mello/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders header button', () => {
  render(<App />);
  const headerButton = screen.getByRole('button', { name: /m\./i });
  expect(headerButton).toBeInTheDocument();
});

test('renders footer text', () => {
  render(<App />);
  const footerElement = screen.getByText(/©.*Mello. All Rights Reserved./i);
  expect(footerElement).toBeInTheDocument();
});

test('shows sign-in/sign-up form when "Hello Mello" link is clicked', () => {
  render(<App />);
  const helloMelloLinks = screen.getAllByText(/Hello Mello/i);
  fireEvent.click(helloMelloLinks[0]); 
  const formHeadings = screen.getAllByText(/Sign In/i); 
  expect(formHeadings.length).toBeGreaterThan(0); 
});

test('shows sign-in/sign-up form when logo is clicked', () => {
  render(<App />);
  const logos = screen.getAllByAltText(/logo/i); 
  fireEvent.click(logos[0]);
  const formHeadings = screen.getAllByText(/Sign In/i);
  expect(formHeadings.length).toBeGreaterThan(0); 
});
