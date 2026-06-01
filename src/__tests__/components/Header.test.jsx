import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "../components/Header/Header";

import { AuthContext } from "../contexts/AuthContext";
import { ThemeContext } from "../contexts/ThemeContext";

// mock ThemeSwitcher
vi.mock("../components/ThemeSwitcher", () => ({
  default: () => <div data-testid="theme-switcher">ThemeSwitcher</div>,
}));

// mock useNavigate, now with vite
const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const originalModule = await vi.importActual("react-router-dom");
  return {
    ...originalModule,
    useNavigate: () => mockNavigate,
  };
});

const renderHeader = ({
  user = null,
  theme = "light",
  logout = vi.fn(),
} = {}) => {
  render(
    <MemoryRouter>
      <AuthContext.Provider value={{ user, logout }}>
        <ThemeContext.Provider value={{ currentTheme: theme }}>
          <Header />
        </ThemeContext.Provider>
      </AuthContext.Provider>
    </MemoryRouter>,
  );
};

describe("Header component", () => {
  test("renders logo and nav links", () => {
    renderHeader();
    // expect(screen.getByText("m.")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About Mello")).toBeInTheDocument();
    expect(screen.getByText("FAQ")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
    expect(screen.getByTestId("theme-switcher")).toBeInTheDocument();
  });

  test("applies current theme to header", () => {
    renderHeader({ theme: "dark" });
    const header = screen.getByRole("banner");
    expect(header.className).toMatch(/dark/);
  });

  test("toggles menu when button is clicked", () => {
    renderHeader();
    const toggleBtn = screen.getByLabelText(/toggle menu/i);
    fireEvent.click(toggleBtn);
    expect(toggleBtn.textContent).toBe("✖");
  });

  test("navigates to /dashboard if user is authenticated when logo is clicked", () => {
    renderHeader({ user: { id: "abc" } });
    fireEvent.click(screen.getByText("m."));
    expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
  });

  test("navigates to / if not authenticated when logo is clicked", () => {
    renderHeader({ user: null });
    fireEvent.click(screen.getByText("m."));
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  test("shows logout button if user is authenticated", () => {
    renderHeader({ user: { id: "abc" } });
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  test("calls logout when logout button is clicked", () => {
    const mockLogout = vi.fn();
    renderHeader({ user: { id: "abc" }, logout: mockLogout });
    fireEvent.click(screen.getByText("Logout"));
    expect(mockLogout).toHaveBeenCalled();
  });
});
