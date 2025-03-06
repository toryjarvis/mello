import React from 'react';
import './BoardGrid.css';
import Board from '../Board/Board';

const BoardGrid = ({boards}) => {
    return (
        <div className='board-grid'>
            {boards.map((board) => (
                <Board key={board.boardId} board={board} />
            ))}
        </div>
    );
};

export default BoardGrid;
