import React, { useState, useEffect } from 'react';
import { db, auth } from '../../config/firebaseConfig';
import { doc, addDoc, updateDoc, collection } from 'firebase/firestore';

import './BoardModal.css';

const BoardModal = ({ isOpen, onClose, mode, board }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    if (mode === 'edit' && board) {
      setName(board.name);
    } else if (mode === 'create') {
      setName('');
    }
  }, [mode, board]);

  const handleBoardSave = async () => {
    if (!auth.currentUser) {
      console.error('User not authenticated');
      return;
    }
    try {
      if (mode === 'add') {
        await addDoc(collection(db, 'boards'), {
          name,
          userId: auth.currentUser.uid,
          createdAt: new Date(),
        });
        console.log('Board added successfully!');
      } else if (mode === 'edit' && board) {
        const boardRef = doc(db, 'boards', board.boardId);
        await updateDoc(boardRef, { name });
        console.log('Board updated successfully!');
      }
      onClose();
    } catch (error) {
      console.error('Error saving board:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <h2>{mode === 'add' ? 'Add New Board' : 'Edit Board'}</h2>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Board Name'
        />
        <button onClick={handleBoardSave}>{mode === 'add' ? 'Add' : 'Save'}</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default BoardModal;
