import React, { useContext } from "react";
import Board from "../Board/BoardComponent";

import "./BoardGrid.css";
import { Button, Input } from "@mui/material";
import { ThemeContext } from "../../contexts/ThemeContext";

const BoardGrid = ({ boards, handleEditBoard }) => {
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

  return (
    <div className={`board-grid-container ${currentTheme}`}>
      <div className="board-grid-options">
        <Button
          className="grid-option-btn"
          variant="contained"
          type="primary"
          onClick={() => handleEditBoard(null)}
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
          onChange={(e) => console.log("Searching boards:", e.target.value)}
        />
      </div>
      <div className="board-grid">
        {boards.map((board) => (
          <Board
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
