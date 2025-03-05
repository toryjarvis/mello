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
      setCards(snapshot.docs.map((doc) => ({ cardId: doc.id, ...doc.data() })));
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, [listId, boardId]);


  // Add a Card
  const handleAddCard = async () => {
    if (!newCardTitle.trim()) return;
  
    try {
      const docRef = await addDoc(collection(db, `boards/${boardId}/lists/${listId}/cards`), {
        title: newCardTitle,
        description: newCardDescription,
        createdAt: new Date(),
        userId: auth.currentUser?.uid,
      });
  
      console.log("New card added with ID:", docRef.id);
  
      // setCards((prevCards) => [
      //   ...prevCards,
      //   { id: docRef.id, title: newCardTitle, description: newCardDescription }
      // ]);
  
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
      <h3 className="list-name-h3">{list.name}</h3>

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
