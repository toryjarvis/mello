import React from 'react';
import Board from '../Board/BoardComponent';

import './BoardGrid.css';

const BoardGrid = ({ boards }) => {
    return (
        <div className='board-grid'>
            {boards.map((board) => (
                <Board key={board.boardId} board={board} />
            ))}
        </div>
    );
};

export default BoardGrid;
