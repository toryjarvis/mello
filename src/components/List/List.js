import React, { useState, useEffect } from "react";
import { db } from "../../config/firebaseConfig";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import Card from "../Card/Card";
import Button from "../Utils/Button";
import "./List.css";

const List = ({ list }) => {
  const [cards, setCards] = useState([]);
  const [newCardTitle, setNewCardTitle] = useState("");
  const [newCardDescription, setNewCardDescription] = useState("");
  const [showCardForm, setShowCardForm] = useState(false);

  // Fetch cards in real-time
  useEffect(() => {
    const cardsRef = collection(db, `boards/${list.boardId}/lists/${list.id}/cards`);
    const unsubscribe = onSnapshot(cardsRef, (snapshot) => {
      setCards(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    // Cleanup listener
    return () => unsubscribe();
  }, [list.id, list.boardId]);

  // Adding a Card
  const handleAddCard = async () => {
    if (newCardTitle.trim() === "") return;

    try {
      await addDoc(collection(db, `boards/${list.boardId}/lists/${list.id}/cards`), {
        title: newCardTitle,
        description: newCardDescription,
        createdAt: new Date(),
      });

      // Reset form fields
      setNewCardTitle("");
      setNewCardDescription("");
      setShowCardForm(false);
    } catch (error) {
      console.error("Error adding card:", error);
    }
  };

  return (
    <div className="list-container">
      <h3>{list.name}</h3>

      {/* Display Cards */}
      {cards.map((card) => (
        <Card key={card.id} card={card} />
      ))}

      {/* Add Card Button */}
      {!showCardForm ? (
        <Button text="Add Card" type="primary" onClick={() => setShowCardForm(true)} />
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
