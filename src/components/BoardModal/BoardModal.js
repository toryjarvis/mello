import React, { useState, useEffect, useContext } from "react";
import { db, auth } from "../../config/firebaseConfig";
import { doc, addDoc, updateDoc, collection } from "firebase/firestore";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { ThemeContext } from "../../contexts/ThemeContext";
import CloseIcon from "@mui/icons-material/Close";

import "./BoardModal.css";

const BoardModal = ({ isOpen, onClose, mode, board }) => {
  const [name, setName] = useState("");
  const { currentTheme } = useContext(ThemeContext);

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
    if (!auth.currentUser) {
      console.error("User not authenticated");
      return;
    }
    try {
      if (mode === "add") {
        await addDoc(collection(db, "boards"), {
          name,
          userId: auth.currentUser.uid,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        console.log("Board added successfully!");
      } else if (mode === "edit" && board) {
        const boardRef = doc(db, "boards", board.boardId);
        await updateDoc(boardRef, { name, updatedAt: new Date() });
        console.log("Board updated successfully!");
      }
      onClose();
    } catch (error) {
      console.error("Error saving board:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" aria-modal="true" role="dialog">
      <div className={`modal-content ${currentTheme}`}>
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
        />

        <Button
          color="primary"
          variant="contained"
          className="modal-save"
          onClick={handleBoardSave}
        >
          {mode === "add" ? "Add" : "Save"}
        </Button>

        <Button variant="contained" onClick={onClose} className="modal-cancel">
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default BoardModal;
