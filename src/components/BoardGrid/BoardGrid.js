import React from 'react';
import Board from '../Board/BoardComponent';

import './BoardGrid.css';

const BoardGrid = ({ boards, handleEditBoard }) => {
    // Render a grid of boards
    // TODO: Sort functionality
    // TODO: Implement drag and drop functionality
    return (
        <div className='board-grid'>
            {boards.map((board) => (
                <Board key={board.boardId} board={board} onEditBoard={handleEditBoard} />
            ))}
        </div>
    );
};

export default BoardGrid;
