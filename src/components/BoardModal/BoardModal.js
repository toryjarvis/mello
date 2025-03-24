import React, { useState, useEffect } from 'react';
import { db, auth } from '../../config/firebaseConfig';
import { doc, addDoc, updateDoc, collection } from 'firebase/firestore';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

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

  // TODO: Fix old board names appearing in the modal when adding new boards
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
        <TextField 
          type='text'
          label='Board Name'
          variant='outlined'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button variant='contained' onClick={handleBoardSave}>{mode === 'add' ? 'Add' : 'Save'}</Button>
        <Button variant='contained' onClick={onClose}>Cancel</Button>
      </div>
    </div>
  );
};

export default BoardModal;
