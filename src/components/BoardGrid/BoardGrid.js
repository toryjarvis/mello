import React, { useContext } from "react";
import Board from "../Board/BoardComponent";

import "./BoardGrid.css";
import { Button, Input } from "@mui/material";
import { ThemeContext } from "../../contexts/ThemeContext";

const BoardGrid = ({ boards, handleEditBoard, handleAddBoard }) => {
  const { currentTheme } = useContext(ThemeContext);

  // Render a grid of boards
  // TODO: Implement drag and drop functionality (Finish Material UI migration before implementing drag and drop)

  // TODO: Sort functionality
  //Use a drop down to decide which way to sort
  const handleBoardSort = (boards) => {
    // Options: by name (A-Z or Z-A), by creation date (recent or older), by last changed date(recent or older)
    // For now, just log the boards to console
    console.log("Sorting boards:", boards);
  };

  // TODO: Filter functionality
  //Use a drop down to decide which way to filter
  const handleBoardFilter = (boards) => {
    // Filter boards by name, status, starred
    // For now, just log the boards to console
    console.log("Filtering boards:", boards);
  };

    // TODO: Search functionality
  //Use a drop down to decide which way to filter
  const handleBoardSearch = (e) => {
    // Filter boards by name, status, starred
    // For now, just log the boards to console
    console.log("Searching boards:", e.target.value);
  };

  return (
    <div
      className={`board-grid-container ${currentTheme}`}
      data-testid="board-grid-container"
    >
      <div className={`board-grid-options ${currentTheme}`}>
        <Button
          className="grid-option-btn"
          variant="contained"
          type="primary"
          onClick={handleAddBoard}
        >
          Add Board
        </Button>
        <Button
          className="grid-option-btn"
          variant="contained"
          type="primary"
          onClick={() => handleBoardSort(boards)}
        >
          Sort
        </Button>
        <Button
          className="grid-option-btn"
          variant="contained"
          type="primary"
          onClick={() => handleBoardFilter(boards)}
        >
          Filter
        </Button>
        <Input
          type="search"
          className="board-search-input"
          placeholder="Search..."
          variant="outlined"
          onChange={handleBoardSearch}
        />
      </div>
      <div className="board-grid">
        {boards.map((board) => (
          <Board
            className="board-grid-item"
            key={board.boardId}
            board={board}
            onEditBoard={handleEditBoard}
          />
        ))}
      </div>
    </div>
  );
};

export default BoardGrid;
