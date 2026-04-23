import React, { useState, useEffect, useContext, useCallback } from "react";
import api from "../../config/apiConfig";
import Card from "../Card/Card";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { ThemeContext } from "../../contexts/ThemeContext";
import "./List.css";

const List = ({ list, listId, boardId }) => {
  const [cards, setCards] = useState([]);
  const [newCardTitle, setNewCardTitle] = useState("");
  const [newCardDescription, setNewCardDescription] = useState("");
  const [showCardForm, setShowCardForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(list.name);
  const { currentTheme } = useContext(ThemeContext);

  // Fetch cards in real-time
  const fetchCards = useCallback(async () => {
    try {
      const response = await api.get(`/cards/list/${listId}`);
      setCards(response.data);
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  }, [listId]);

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  // Handle List Edit
  const handleEditList = async () => {
    try {
      await api.put(`/lists/${listId}/name`, { list_name: editedName });
      setIsEditing(false);
    } catch (error) {
      console.error("Error editing list:", error);
    }
  };

  // Handle List Delete
  const handleDeleteList = async (listId, boardId) => {
    try {
      await api.delete(`/lists/${listId}`);
      setIsEditing(false);
    } catch (error) {
      console.error("Error deleting list:", error);
    }
  };

  // Add Card
  const handleAddCard = async () => {
    if (newCardTitle.trim() === "") return;
    try {
      await api.post("/cards", {
        title: newCardTitle,
        card_description: newCardDescription,
        list_id: listId,
        board_id: boardId,
      });
      setNewCardTitle("");
      setNewCardDescription("");
      setShowCardForm(false);
      fetchCards();
    } catch (error) {
      console.error("Error adding card:", error);
    }
  };

  return (
    <div className={`list-container ${currentTheme}`}>
      {isEditing ? (
        <div className="list-edit-form">
          <TextField
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            placeholder="List Title"
            className="list-input"
          />
          <Button text="Save" type="primary" onClick={handleEditList}>
            Save
          </Button>
          <Button
            text="Cancel"
            type="secondary"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </Button>
        </div>
      ) : (
        <div className="list-content">
          <h3 className="list-name-h3">{list.list_name}</h3>
          <div className="list-actions">
            <Button
              className="list-edit-btn"
              text="Edit"
              variant="contained"
              type="primary"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </Button>
            <Button
              className="list-delete-btn"
              variant="contained"
              text="Delete"
              type="secondary"
              onClick={() => handleDeleteList(listId, boardId)}
            >
              Delete
            </Button>
          </div>
        </div>
      )}

      {/* Display Cards */}
      <div className="cards-container">
        {cards.map((card) => (
          <Card
            key={card.cardId}
            card={card}
            cardId={card.cardId}
            listId={listId}
            boardId={boardId}
          />
        ))}
      </div>

      {/* Add Card Button */}
      {!showCardForm ? (
        <Button
          className={`add-card-btn ${currentTheme}`}
          variant="contained"
          text="Add Card"
          type="primary"
          onClick={() => setShowCardForm(true)}
        >
          Add Card
        </Button>
      ) : (
        <div className="add-card-form">
          <TextField
            type="text"
            placeholder="Card Title"
            value={newCardTitle}
            onChange={(e) => setNewCardTitle(e.target.value)}
            className="card-input"
          />

          <textarea
            placeholder="Card Description"
            value={newCardDescription}
            onChange={(e) => setNewCardDescription(e.target.value)}
            className="card-input-textarea"
          />

          <Button
            text="Create"
            variant="contained"
            type="primary"
            onClick={handleAddCard}
          >
            Create
          </Button>
          <Button
            text="Cancel"
            variant="outline"
            type="secondary"
            onClick={() => setShowCardForm(false)}
          >
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
};

export default List;
