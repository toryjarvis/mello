import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";
import { AuthContext } from "../contexts/AuthContext";
import { ThemeContext } from "../contexts/ThemeContext";

// dummy dash and login pages to test the routing
jest.mock("../pages/Dashboard", () => () => <div>Dashboard Page</div>);
jest.mock("../pages/LoginSignUpPage", () => () => <div>Login Page</div>);

const renderWithProviders = ({
  user = null,
  loading = false,
  theme = "light",
  initialRoute = "/",
} = {}) => {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <AuthContext.Provider value={{ user, loading }}>
        <ThemeContext.Provider value={{ currentTheme: theme }}>
          <App />
        </ThemeContext.Provider>
      </AuthContext.Provider>
    </MemoryRouter>
  );
};

describe("App component", () => {
  test("shows loading state", () => {
    renderWithProviders({ loading: true });
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test("renders intro page when not authenticated", () => {
    renderWithProviders({ user: null });
    expect(
      screen.getByText(/manage your projects with ease/i)
    ).toBeInTheDocument();
  });

  test("navigates to login when Hello Mello button is clicked and user is not authenticated", async () => {
    renderWithProviders({ user: null });

    const helloBtn = screen.getAllByText(/hello mello/i)[0];
    fireEvent.click(helloBtn);

    await waitFor(() => {
      expect(screen.getByText(/login page/i)).toBeInTheDocument();
    });
  });

  test("navigates to dashboard when Hello Mello button is clicked and user is authenticated", async () => {
    renderWithProviders({ user: { id: "123" } });

    const helloBtn = screen.getAllByText(/hello mello/i)[0];
    fireEvent.click(helloBtn);

    await waitFor(() => {
      expect(screen.getByText(/dashboard page/i)).toBeInTheDocument();
    });
  });

  test("protects dashboard route: redirects to / if not authenticated", () => {
    renderWithProviders({ user: null, initialRoute: "/dashboard" });

    // redirected to home, should see the splash page
    expect(
      screen.getByText(/manage your projects with ease/i)
    ).toBeInTheDocument();
  });

  test("allows access to dashboard if authenticated", () => {
    renderWithProviders({ user: { id: "123" }, initialRoute: "/dashboard" });

    expect(screen.getByText(/dashboard page/i)).toBeInTheDocument();
  });
});
