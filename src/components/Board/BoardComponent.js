import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../../config/apiConfig";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import Button from "@mui/material/Button";

const Board = ({ board, onEditBoard, onBoardDeleted }) => {
  const { currentTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

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
    <div
      className={`board-card ${currentTheme}`}
      onClick={() => navigate(`/boards/${board.id}`)}
    >
      <h3 className="board-card-header">{board.name}</h3>

      <div className="board-card-buttons">
        <Button
          variant="contained"
          onClick={(e) => {
            e.stopPropagation();
            onEditBoard(board);
          }}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          sx={{
            "&:hover": { backgroundColor: "var(--danger)" },
          }}
          onClick={(e) => {
            e.stopPropagation();
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
