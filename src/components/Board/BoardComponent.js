import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { db, auth } from '../../config/firebaseConfig';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import Button from '../Utils/Button';

const Board = ({ board }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(board.name);

    // Handle Board Delete
    const handleBoardDelete = async (boardId) => {
        try {
            const boardRef = doc(db, `boards/${boardId}`);
            await deleteDoc(boardRef);
            console.log('Board ID ' + boardId + ' deleted successfully!');
        } catch (error) {
            console.error('Error deleting board: ', error);
        }
    }

    // Handle Board Edit
    const handleBoardEdit = async (boardId) => {
        console.log('Auth User ID:', auth.currentUser?.uid);
        console.log('Board ID received in handleBoardEdit:', boardId);

        try {
            const boardRef = doc(db, `boards/${boardId}`);
            await updateDoc(boardRef, {
                name: editedName,
                userId: auth.currentUser.uid,
            });
            setIsEditing(false);
            console.log('Board updated successfully!', editedName);
        } catch (error) {
            console.error('Error updating board:', error);
        }
    };

    return (
        <div className='board-card'>
            {isEditing ? (
                <div className='board-edit-form'>
                    <input
                        type='text'
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        placeholder='Board Name'
                        className='board-input'
                    />
                    <Button className='board-save-btn' text='Save' type='primary' onClick={() => handleBoardEdit(board.boardId)}>Save</Button>
                    <Button className='board-cancel-btn' text='Cancel' type='secondary' onClick={() => setIsEditing(false)}>Cancel</Button>
                </div>
            ) : (
                <div className='board-content'>

                    <Link
                        key={board.boardId}
                        board={board}
                        to={`/boards/${board.boardId}`}
                        className='board-card-header'>
                        <h3>{board.name}</h3>
                    </Link>

                    <div className='board-card-buttons'>
                        <Button className='board-edit-btn' text='Edit' type='primary' onClick={() => {
                            setIsEditing(true);
                            setEditedName(board.name);
                        }}>Edit</Button>
                        <Button className='board-delete-btn' text='Delete' type='secondary' onClick={() => handleBoardDelete(board.boardId)}>Delete</Button>
                    </div>
                </div>

            )}

        </div>
    );
};

export default Board