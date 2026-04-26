import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../config/apiConfig";
import List from "../components/List/List";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
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
  const { currentTheme } = useContext(ThemeContext);

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const response = await api.get(`/boards/${boardId}`);
        setBoard(response.data);
      } catch (error) {
        console.error("Error fetching board:", error);
      }
    };

    if (boardId) {
      fetchBoard();
    }
  }, [boardId]);

  const fetchLists = useCallback(async () => {
    try {
      const response = await api.get(`/lists/board/${boardId}`);
      setLists(response.data);
    } catch (error) {
      console.error("Error fetching lists:", error);
    } finally {
      setLoading(false);
    }
  }, [boardId]);

  useEffect(() => {
    if (boardId) fetchLists();
  }, [fetchLists]);

  // Handle List Creation
  const handleAddList = async () => {
    if (newListName.trim() === "") return;
    try {
      await api.post("/lists", { boardId: boardId, list_name: newListName });
      setNewListName("");
      setShowListForm(false);
      fetchLists();
    } catch (error) {
      console.error("Error adding list:", error);
    }
  };

  return (
    <div className={`board-detail-container ${currentTheme}`}>
      {/* Back Button */}
      <Button
        className="back-button"
        variant="contained"
        type="secondary"
        onClick={() => navigate("/dashboard")}
      >
        Back to Dashboard
      </Button>

      <h1 className={"board-header"}>{board ? board.name : "Loading..."}</h1>

      {/* Add List Button */}
      {!showListForm ? (
        <Button
          className="add-list-button"
          variant="contained"
          type="primary"
          onClick={() => setShowListForm(true)}
        >
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
            variant="outlined"
            size="small"
            fullWidth
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

      {/* Lists Display */}
      {/* Conditionally render loading icon, board Grid or no boards message */}
      {loading ? (
        <div className="loading-icon">Loading...</div>
      ) : lists.length > 0 ? (
        <div className="lists-container">
          {lists.map((list) => (
            <List
              className="list-container"
              key={list.id}
              listId={list.id}
              list={list}
              boardId={boardId}
              onListUpdated={fetchLists}
            />
          ))}
        </div>
      ) : (
        <p className="no-lists-message">
          You have no lists yet. Click 'Add List' to create one!
        </p>
      )}
    </div>
  );
};

export default BoardDetail;
