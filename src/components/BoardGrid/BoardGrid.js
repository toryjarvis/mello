import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './BoardGrid.css';
import { db, auth } from "../../config/firebaseConfig";
import { collection, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";
import Button from "../Utils/Button";
// import { AuthContext } from '../../contexts/AuthContext';

const BoardGrid = () => {
    // const { user } = useContext(AuthContext)
    const [boards, setBoards] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState("");
    const [newBoardName, setNewBoardName] = useState("");
    const [showBoardForm, setShowBoardForm] = useState(false);

    // Fetch boards in real-time
    useEffect(() => {
        console.log("User ID:", auth.currentUser?.uid);
        if (!boards) {
            console.error("Boards are missing!");
            return;
        }

        const boardsRef = collection(db, "boards");
        console.log("Listening to:", `boards`);

        // Listen for changes in real-time
        const unsubscribe = onSnapshot(
            boardsRef,
            (snapshot) => {
                if (snapshot.empty) {
                    console.warn("No boards found in Firestore.");
                } else {
                    console.log("Snapshot received:", snapshot.docs.map((doc) => doc.data()));
                }
                setBoards(snapshot.docs.map((doc) => ({ boardId: doc.id, ...doc.data() })));
            }, (error) => {
                console.error("Error fetching boards:", error);
            }
        );

        // Cleanup listener on unmount
        return () => unsubscribe();
    }, [boards]);

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

    // Handle Board Edit
    const handleBoardEdit = async (boardId) => {
        console.log("Auth User ID:", auth.currentUser?.uid);
        console.log("Board ID:", boardId);

        try {
            const boardRef = doc(db, `boards/${boardId}`);
            await updateDoc(boardRef, {
                name: editedName,
                userId: auth.currentUser.uid,
            });
            setIsEditing(false);
            console.log("Board updated successfully!", editedName);
        } catch (error) {
            console.error("Error updating board:", error);
        }
    };

    return (
        <div className='board-grid'>
            {boards.map((board) => (
                <div key={board.boardId} className='board-card'>
                    <Link
                        key={board.boardId}
                        board={board}
                        to={`/boards/${board.boardId}`}
                        className='board-card-header'>
                        <h3>{board.name}</h3>
                    </Link>

                    <div className="board-card-buttons">
                        <Button className="board-edit-btn" text="Edit" type="primary" onClick={() => {
                            setIsEditing(true);
                            setEditedName(board.name);
                        }}>Edit</Button>
                        <Button className="board-delete-btn" text="Delete" type="secondary" onClick={() => handleBoardDelete(board.boardId)}>Delete</Button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BoardGrid;
