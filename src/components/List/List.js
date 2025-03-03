import React, { useState, useEffect } from "react";
import { auth, db } from "../../config/firebaseConfig";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import Card from "../Card/Card";
import Button from "../Utils/Button";
import "./List.css";

const List = ({ list, listId, boardId }) => {
  const [cards, setCards] = useState([]);
  const [newCardTitle, setNewCardTitle] = useState("");
  const [newCardDescription, setNewCardDescription] = useState("");
  const [showCardForm, setShowCardForm] = useState(false);

  // Fetch cards in real-time
  useEffect(() => {
    if (!listId) return;

    const cardsRef = collection(db, `boards/${boardId}/lists/${listId}/cards`);

    // Listen for changes in real-time
    const unsubscribe = onSnapshot(cardsRef, (snapshot) => {
      setCards(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, [listId, boardId]);

  // Add a Card
  const handleAddCard = async () => {
    if (!auth.currentUser) {
      console.error("User not authenticated");
      return;
    }
  
    if (!listId) {
      console.error("List ID is missing!");
      return;
    }
  
    try {
      const newCard = {
        title: newCardTitle,
        description: newCardDescription,
        listId: listId,
        userId: auth.currentUser.uid,
        createdAt: new Date(),
      };
  
      await addDoc(collection(db, `boards/${boardId}/lists/${listId}/cards`), newCard);
  
      console.log("Card added successfully!", newCard);
      setNewCardTitle("");
      setNewCardDescription("");
      setShowCardForm(false);
    } catch (error) {
      console.error("Error adding card:", error);
    }
  };


  return (
    <div className="list-container">
      <h3 className="list-name-h3">{list.name}</h3>

      {/* Display Cards */}
      {cards && cards.map((card) => (
        <Card key={card.id} card={card} listId={listId} />
      ))}

      {/* Add Card Button */}
      {!showCardForm ? (
        <Button className="add-card-btn" text="Add Card" type="primary" onClick={() => setShowCardForm(true)} />
      ) : (
        <div className="add-card-form">
          <input
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
            className="card-input"
          />

          <Button text="Create" type="primary" onClick={handleAddCard} />

          <Button text="Cancel" type="secondary" onClick={() => setShowCardForm(false)} />
        </div>
      )}
    </div>
  );
};

export default List;
