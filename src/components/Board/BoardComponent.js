import React from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../config/firebaseConfig';
import { doc, deleteDoc } from 'firebase/firestore';
// import Button from '../Utils/Button';
import Button from '@mui/material/Button';
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

const Board = ({ board, onEditBoard }) => {
    const { currentTheme } = useContext(ThemeContext);

    // Handle Board Delete
    const handleBoardDelete = async (boardId) => {
        try {
            const boardRef = doc(db, `boards/${boardId}`);
            await deleteDoc(boardRef);
            console.log("Board ID " + boardId + " deleted successfully!");
        } catch (error) {
            console.error("Error deleting board: ", error);
        }
    }
    
    // Render treats the board as a "card" (remember for implementing drag and drop)
    return (
        <div className={`board-card ${currentTheme}`}>
            <Link
                key={board.boardId}
                board={board}
                to={`/boards/${board.boardId}`}
                className='board-card-header'>
                <h3>{board.name}</h3>
            </Link>

            <div className="board-card-buttons">
                <Button className="board-edit-btn" variant='contained' type="primary" onClick={() => onEditBoard(board)}>Edit</Button>
                <Button className="board-delete-btn" variant='contained' type="secondary" onClick={() => handleBoardDelete(board.boardId)}>Delete</Button>
            </div>
        </div>
    );
};

export default Board