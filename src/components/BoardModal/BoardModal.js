import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import api from "../../config/apiConfig";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";

import "./BoardModal.css";

const BoardModal = ({ isOpen, onClose, mode, board, onBoardSaved }) => {
  const [name, setName] = useState("");
  const { currentTheme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (isOpen) {
      if (mode === "edit" && board) {
        setName(board.name);
      } else if (mode === "add") {
        setName("");
      }
    }
  }, [isOpen, mode, board]);

  const handleBoardSave = async () => {
    if (!name.trim()) return;
    if (!user || !user.id) return;
    try {
      if (mode === "add") {
        await api.post("/boards", { userId: user.id, board_name: name });
      } else if (mode === "edit" && board) {
        await api.put(`/boards/${board.id}/name`, { board_name: name });
      }
      onBoardSaved();
      onClose();
    } catch (error) {
      console.error("Error saving board:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className={`modal-content ${currentTheme}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" aria-label="Close" onClick={onClose}>
          <CloseIcon />
        </button>

        <h2>{mode === "add" ? "Add New Board" : "Edit Board"}</h2>

        <TextField
          type="text"
          label="Board Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          sx={{ marginBottom: 3 }}
          onKeyDown={(e) => {if (e.key === 'Enter') handleBoardSave();}}
        />

        <div className="modal-actions">
          <Button color="primary" variant="contained" onClick={handleBoardSave}>
            {mode === "add" ? "Add" : "Save"}
          </Button>
          <Button variant="contained" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BoardModal;
