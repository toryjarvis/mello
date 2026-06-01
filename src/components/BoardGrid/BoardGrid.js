import React, { useContext, useState } from "react";
import Board from "../Board/BoardComponent";
import "./BoardGrid.css";
import { Button, MenuItem, Select, TextField } from "@mui/material";
import { ThemeContext } from "../../contexts/ThemeContext";

const BoardGrid = ({
  boards,
  handleEditBoard,
  handleAddBoard,
  handleBoardFilter,
  onBoardDeleted,
  handleBoardSearch,
  handleBoardSort,
}) => {
  const { currentTheme } = useContext(ThemeContext);

  const [sortValue, setSortValue] = useState("last_changed");

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

        {/* MUI Select for sort */}
        <Select
          value={sortValue}
          size="small"
          onChange={(e) => {
            setSortValue(e.target.value);
            handleBoardSort(e.target.value);
          }}
        >
          <MenuItem value="last_changed">Last Changed</MenuItem>
          <MenuItem value="name-asc">Name (A-Z)</MenuItem>
          <MenuItem value="name-desc">Name (Z-A)</MenuItem>
          <MenuItem value="newest">Newest</MenuItem>
          <MenuItem value="oldest">Oldest</MenuItem>
        </Select>
        <Button
          className="grid-option-btn"
          variant="contained"
          type="primary"
          onClick={handleBoardFilter}
        >
          Filter
        </Button>
        <TextField
          size="small"
          variant="outlined"
          className="board-search-input"
          placeholder="Search"
          onChange={handleBoardSearch}
          inputProps={{ "aria-label": "search boards" }}
        />
      </div>
      <div className="board-grid">
        {boards.map((board) => (
          <Board
            className="board-grid-item"
            key={board.id}
            board={board}
            onEditBoard={handleEditBoard}
            onBoardDeleted={onBoardDeleted}
          />
        ))}
      </div>
    </div>
  );
};

export default BoardGrid;
