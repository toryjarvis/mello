import React, { useState } from 'react';
import './Card.css';
import Button from '../Utils/Button';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../../config/firebaseConfig';

const Card = ({ card, listId, cardId, boardId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(card.title);
  const [editedDescription, setEditedDescription] = useState(card.description);

  // Handle Card Edit
  const handleEditCard = async () => {
    console.log('Auth User ID:', auth.currentUser?.uid);
    if (!editedTitle.trim()) return;

    try {
      const cardRef = doc(db, `boards/${boardId}/lists/${listId}/cards/${cardId}`);
      await updateDoc(cardRef, {
        title: editedTitle,
        description: editedDescription,
        userId: auth.currentUser.uid,
        // cardId: cardId
      });
      setIsEditing(false);
      console.log('Card updated successfully!');
    } catch (error) {
      console.error('Error updating card:', error);
    }
  };

  // Handle Card Delete
  const handleDeleteCard = async (cardId, listId, boardId) => {
    console.log('Auth User ID:', auth.currentUser?.uid);
    console.log('Card ID received in handleDeleteCard:', cardId);
    console.log('List ID:', listId);
    console.log('Board ID:', boardId);

    try {
      const cardRef = doc(db, `boards/${boardId}/lists/${listId}/cards/${cardId}`);
      await deleteDoc(cardRef);
      setIsEditing(false);
      console.log('Card deleted successfully!');
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };

  return (
    <div className='card'>
      {isEditing ? (
        <div className='card-edit-form'>
          <input
            type='text'
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            placeholder='Card Title'
            className='card-input'
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            placeholder='Card Description'
            className='card-input'
          />
          <Button text='Save' type='primary' onClick={handleEditCard} />
          <Button text='Cancel' type='secondary' onClick={() => setIsEditing(false)} />
        </div>
      ) : (
        <div className='card-content'>
          <div className='card-text'>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </div>
          <div className='card-actions'>
            <Button text='Edit' type='primary' onClick={() => setIsEditing(true)} />
            <Button text='Delete' type='secondary' onClick={() => handleDeleteCard(cardId, listId, boardId)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
