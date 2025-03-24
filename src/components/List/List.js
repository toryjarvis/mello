import React, { useState, useEffect } from "react";
import { auth, db } from "../../config/firebaseConfig";
import { collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";
import Card from "../Card/Card";
import "./List.css";

import Button from "@mui/material/Button";
import { TextField } from "@mui/material";

const List = ({ list, listId, boardId }) => {
  const [cards, setCards] = useState([]);
  const [newCardTitle, setNewCardTitle] = useState("");
  const [newCardDescription, setNewCardDescription] = useState("");
  const [showCardForm, setShowCardForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(list.name);

  // Fetch cards in real-time
  useEffect(() => {
    if (!listId) return;

    const cardsRef = collection(db, `boards/${boardId}/lists/${listId}/cards`);

    // Listen for changes in real-time
    const unsubscribe = onSnapshot(cardsRef, (snapshot) => {
      setCards(snapshot.docs.map((doc) => ({ cardId: doc.id, ...doc.data() })));
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, [listId, boardId]);

  // Handle List Edit
  const handleEditList = async () => {
    console.log("Auth User ID:", auth.currentUser?.uid);
    console.log("List ID received in handleEditList:", listId);
    console.log("Board ID:", boardId);

    try {
      const listRef = doc(db, `boards/${boardId}/lists/${listId}`);
      await updateDoc(listRef, {
        name: editedName,
        userId: auth.currentUser.uid,
      });
      setIsEditing(false);
      console.log("List updated successfully!", editedName);
    } catch (error) {
      console.error("Error updating list:", error);
    }
  };

  // Handle List Delete
  const handleDeleteList = async (listId, boardId) => {
    console.log("Auth User ID:", auth.currentUser?.uid);
    console.log("List ID received in handleDeleteList:", listId);
    console.log("Board ID:", boardId);

    try {
      const listRef = doc(db, `boards/${boardId}/lists/${listId}`);
      await deleteDoc(listRef);
      setIsEditing(false);
      console.log("List deleted successfully!");
    } catch (error) {
      console.error("Error deleting list:", error);
    }
  };

  // Add Card
  const handleAddCard = async () => {
    if (!newCardTitle.trim()) return;

    try {
      const docRef = await addDoc(
        collection(db, `boards/${boardId}/lists/${listId}/cards`),
        {
          title: newCardTitle,
          description: newCardDescription,
          createdAt: new Date(),
          userId: auth.currentUser?.uid,
        }
      );

      console.log("New card added with ID:", docRef.id);

      setNewCardTitle("");
      setNewCardDescription("");
      setShowCardForm(false);
      console.log("Card added successfully!");
    } catch (error) {
      console.error("Error adding card:", error);
    }
  };

  return (
    <div className="list-container">
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
          <h3 className="list-name-h3">{list.name}</h3>
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
      {cards.map((card, handleEditCard, handleDeleteCard) => (
        <Card
          key={card.cardId}
          card={card}
          cardId={card.cardId}
          listId={listId}
          boardId={boardId}
          handleDeleteCard={handleDeleteCard}
          handleEditCard={handleEditCard}
        />
      ))}

      {/* Add Card Button */}
      {!showCardForm ? (
        <Button
          className="add-card-btn"
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
