import React, { useState } from "react";
import api from "../../config/apiConfig";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useContext } from "react";
import "./Card.css";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";

const Card = ({ card, listId, cardId, onCardUpdated }) => {
  const { currentTheme } = useContext(ThemeContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(card.title);
  const [editedDescription, setEditedDescription] = useState(
    card.card_description,
  );

  // Handle Card Edit
  const handleEditCard = async () => {
    try {
      await api.put(`/cards/${cardId}/name`, {
        title: editedTitle,
      });
      await api.put(`/cards/${cardId}/description`, {
        card_description: editedDescription,
      });
      setIsEditing(false);
      onCardUpdated();
    } catch (error) {
      console.error("Error editing card:", error);
    }
  };

  // Handle Card Delete
  const handleDeleteCard = async () => {
    try {
      await api.delete(`/cards/${cardId}`);
      setIsEditing(false);
      onCardUpdated();
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  return (
    <div className={`card ${currentTheme}`}>
      {isEditing ? (
        <div className="card-edit-form">
          <TextField
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            placeholder="Card Title"
            className="card-input"
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            placeholder="Card Description"
            className="card-input"
          />
          <Button variant="contained" type="primary" onClick={handleEditCard}>
            {" "}
            Save
          </Button>
          <Button
            variant="outlined"
            type="secondary"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </Button>
        </div>
      ) : (
        <div className="card-content">
          <div className="card-text">
            <h3>{card.title}</h3>
            <p>{card.card_description}</p>
          </div>
          <div className="card-actions">
            <Button
              variant="contained"
              type="primary"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              sx={{
                "&:hover": {
                  backgroundColor: "var(--danger)",
                  color: "#fff",
                  borderColor: "var(--danger)",
                },
              }}
              onClick={() => handleDeleteCard()}
            >
              Delete
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
