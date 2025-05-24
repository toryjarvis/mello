import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db, auth } from "../config/firebaseConfig";
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import List from "../components/List/List";
// import Button from '../components/Utils/Button';
import "./BoardDetail.css";

import Button from "@mui/material/Button";
import { TextField } from "@mui/material";

const BoardDetail = () => {
  const { boardId } = useParams();
  const navigate = useNavigate();
  const [board, setBoard] = useState(null);
  const [lists, setLists] = useState([]);
  const [newListName, setNewListName] = useState("");
  const [showListForm, setShowListForm] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch Board Details
  useEffect(() => {
    const boardRef = collection(db, "boards");
    const q = query(boardRef, where("__name__", "==", boardId));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (!querySnapshot.empty) {
        setBoard(querySnapshot.docs[0].data());
      }
    });

    return () => unsubscribe();
  }, [boardId]);

  // Fetch Lists in Real-Time
  useEffect(() => {
    if (!boardId) {
      console.error("Board ID is missing!");
      return;
    }

    const listsRef = collection(db, `boards/${boardId}/lists`);
    console.log("Listening to:", `boards/${boardId}/lists`);

    const unsubscribe = onSnapshot(
      listsRef,
      (snapshot) => {
        if (snapshot.empty) {
          console.warn("No lists found in Firestore.");
          setLoading(false);
        } else {
          console.log(
            "Snapshot received:",
            snapshot.docs.map((doc) => doc.data())
          );
          setLoading(false);
        }
        setLists(
          snapshot.docs.map((doc) => ({ listId: doc.id, ...doc.data() }))
        );
      },
      (error) => {
        console.error("Error fetching lists:", error);
      }
    );

    return () => unsubscribe();
  }, [boardId]);

  // Handle List Creation
  const handleAddList = async () => {
    if (newListName.trim() === "") return;
    if (!auth.currentUser) {
      console.error("User not authenticated");
      return;
    }

    try {
      await addDoc(collection(db, `boards/${boardId}/lists`), {
        name: newListName,
        boardId,
        userId: auth.currentUser.uid,
        createdAt: new Date(),
      });
      setNewListName("");
      setShowListForm(false);
    } catch (error) {
      console.error("Error adding list:", error);
    }
  };

  return (
    <div className="board-detail-container">
      {/* Back Button */}
      <Button
        className="back-button"
        // text='← Back to Dashboard'
        variant="contained"
        type="secondary"
        onClick={() => navigate("/dashboard")}
      >
        ← Back to Dashboard
      </Button>

      <h1 className="board-header">{board ? board.name : "Loading..."}</h1>

      {/* Lists Display */}

      {/* Conditionally render loading icon, board Grid or no boards message */}
      {loading ? (
        <div className="loading-icon">Loading...</div>
      ) : lists.length > 0 ? (
        <div className="lists-container">
          {lists.map((list, handleEditList, handleDeleteList) => (
            <List
              className="list-container"
              key={list.listId}
              listId={list.listId}
              list={list}
              boardId={boardId}
              handleEditList={handleEditList}
              handleDeleteList={handleDeleteList}
            />
          ))}
        </div>
      ) : (
        <p className="no-lists-message">
          You have no lists yet. Click 'Add List' to create one!
        </p>
      )}

      {/* <div className='lists-container'>
        {lists.map((list, handleEditList, handleDeleteList) => (
          <List
            className='list-container'
            key={list.listId}
            listId={list.listId}
            list={list}
            boardId={boardId}
            handleEditList={handleEditList}
            handleDeleteList={handleDeleteList}
          />
        ))}
      </div> */}

      {/* Add List Button */}
      {!showListForm ? (
        <Button
          className="add-list-button"
          variant="contained"
          type="primary"
          onClick={() => setShowListForm(true)}
        >
          {" "}
          Add List
        </Button>
      ) : (
        <div className="add-list-form">
          <TextField
            type="text"
            placeholder="Enter list name"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            className="list-input"
          />
          <Button
            className="add-list-btn"
            variant="contained"
            onClick={handleAddList}
          >
            Create
          </Button>
          <Button
            className="cancel-list-btn"
            variant="outlined"
            onClick={() => setShowListForm(false)}
          >
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
};

export default BoardDetail;
