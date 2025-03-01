import React from 'react';
import { Link } from 'react-router-dom';
import './BoardGrid.css';
import { db } from "../../config/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

const BoardGrid = ({ boards }) => {
    return (
        <div className='board-grid'>
            {boards.map((board) => (
                <Link key={board.id} to={`/boards/${board.id}`} className='board-card'>
                    <h3>{board.name}</h3>
                </Link>
            ))}
        </div>
    );
};

export default BoardGrid;
