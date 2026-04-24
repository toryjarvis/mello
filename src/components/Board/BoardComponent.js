import React from "react";
import { Link } from "react-router-dom";

import api from "../../config/apiConfig";

import Button from "@mui/material/Button";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

const Board = ({ board, onEditBoard, onBoardDeleted }) => {
  console.log('board prop:', board);
  const { currentTheme } = useContext(ThemeContext);

  // Handle Board Delete
  const handleBoardDelete = async (boardId) => {
    try {
      await api.delete(`/boards/${boardId}`);
      // Refresh of the board list
      onBoardDeleted();
    } catch (error) {
      console.error("Error deleting board:", error);
    }
  };

  // Render treats the board as a "card" (remember this for implementing drag and drop)
  return (
    <div className={`board-card ${currentTheme}`}>
      <Link
        key={board.id}
        board={board}
        to={`/boards/${board.id}`}
        className="board-card-header"
      >
        <h3>{board.name}</h3>
      </Link>

      <div className="board-card-buttons">
        <Button
          className="board-edit-btn"
          variant="contained"
          type="primary"
          onClick={() => onEditBoard(board)}
        >
          Edit
        </Button>
        <Button
          className="board-delete-btn"
          variant="contained"
          type="secondary"
          onClick={() => {
            console.log("board at click:", board);
            handleBoardDelete(board.id);
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default Board;
