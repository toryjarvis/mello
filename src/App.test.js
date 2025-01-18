import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders "Hello Mello" link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Hello Mello/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders header button', () => {
  render(<App />);
  const headerButton = screen.getByRole('button', { name: /m\./i }); // Checks for the "m." button
  expect(headerButton).toBeInTheDocument();
});

test('renders footer text', () => {
  render(<App />);
  const footerElement = screen.getByText(/©.*Mello. All Rights Reserved./i);
  expect(footerElement).toBeInTheDocument();
});

test('shows sign-in/sign-up form when "Hello Mello" link is clicked', () => {
  render(<App />);
  const helloMelloLinks = screen.getAllByText(/Hello Mello/i); // Gets all matching elements
  fireEvent.click(helloMelloLinks[0]); // Clicks the first instance
  const formHeadings = screen.getAllByText(/Sign In/i); // Gets all "Sign In" headings
  expect(formHeadings.length).toBeGreaterThan(0); // Ensure at least one form is shown
});

test('shows sign-in/sign-up form when logo is clicked', () => {
  render(<App />);
  const logos = screen.getAllByAltText(/logo/i); // Gets all matching logos
  fireEvent.click(logos[0]); // Clicks the first logo
  const formHeadings = screen.getAllByText(/Sign In/i); // Gets all "Sign In" headings
  expect(formHeadings.length).toBeGreaterThan(0); // Ensure at least one form is shown
});
