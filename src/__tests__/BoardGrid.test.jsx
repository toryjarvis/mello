// BoardGrid.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import BoardGrid from "../components/BoardGrid/BoardGrid";
import { ThemeContext } from "../contexts/ThemeContext";

// mock board
vi.mock(
  "../components/Board/BoardComponent",
  () => ({
    default: ({ board, onEditBoard }) => (
      <div data-testid="board" data-board-id={board.id}>
        {board.name}
      </div>
    ),
  }),
);

// mock console.log
beforeEach(() => {
  vi.spyOn(console, "log").mockImplementation(() => {});
});
afterEach(() => {
  console.log.mockRestore();
});

const renderBoardGrid = (props = {}) => {
  const defaultBoards = [
    { id: "1", name: "Board One" },
    { id: "2", name: "Board Two" },
  ];
  const defaultProps = {
    boards: defaultBoards,
    handleEditBoard: vi.fn(),
  };

  return render(
    <ThemeContext.Provider value={{ currentTheme: "light" }}>
      <BoardGrid {...defaultProps} {...props} />
    </ThemeContext.Provider>,
  );
};

describe("BoardGrid component", () => {
  test("renders boards from props", () => {
    renderBoardGrid();
    expect(screen.getByText("Board One")).toBeInTheDocument();
    expect(screen.getByText("Board Two")).toBeInTheDocument();
  });

  test("calls handleEditBoard(null) when Add Board button is clicked", () => {
    const handleEditBoard = vi.fn();
    renderBoardGrid({ handleEditBoard });

    fireEvent.click(screen.getByText(/add board/i));
    expect(handleEditBoard).toHaveBeenCalledWith(null);
  });

  test("calls console.log when Sort button is clicked", () => {
    renderBoardGrid();
    fireEvent.click(screen.getByText(/sort/i));
    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining("Sorting"),
      expect.any(Array),
    );
  });

  test("calls a console.log when Filter button is clicked", () => {
    renderBoardGrid();
    fireEvent.click(screen.getByText(/filter/i));
    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining("Searching"),
      expect.any(Array),
    );
  });

  test("logs input value when typing in search field", () => {
    renderBoardGrid();
    const input = screen.getByPlaceholderText(/search/i);
    fireEvent.change(input, { target: { value: "test search" } });
    expect(console.log).toHaveBeenCalledWith(
      "Searching boards:",
      "test search",
    );
  });

  test("applies theme class from ThemeContext", () => {
    renderBoardGrid();
    const boardGrid = screen.getByTestId("board-grid-container");
    expect(boardGrid).toHaveClass("light");
  });
});
