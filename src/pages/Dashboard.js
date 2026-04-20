import React, { useContext, useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

import Button from "@mui/material/Button";
import BoardGrid from "../components/BoardGrid/BoardGrid";
import BoardModal from "../components/BoardModal/BoardModal";
import FilterModal from "../components/FilterModal/FilterModal";

import api from "../config/apiConfig";

import "./Dashboard.css";
import { ThemeContext } from "../contexts/ThemeContext";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [boards, setBoards] = useState([]);
  const [modalMode, setModalMode] = useState("add");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [loading, setLoading] = useState(false);
  const { currentTheme } = useContext(ThemeContext);
  const [filterText, setFilterText] = useState("");

  const handleAddBoard = () => {
    setModalMode("add");
    setSelectedBoard(null);
    setIsModalOpen(true);
  };

  const handleEditBoard = (board) => {
    setModalMode("edit");
    setSelectedBoard(board);
    setIsModalOpen(true);
  };

  const handleBoardFilter = () => {
    setFilterModalOpen(true);
  };

  const handleApplyFilter = (text) => {
    setFilterText(text);
  };

  const fetchBoards = useCallback(async () => {
    if (!user || !user.id) {
      console.error("User ID is missing. Cannot fetch boards.");
      return;
    }
    setLoading(true);
    try {
      const response = await api.get(`/boards/user/${user.id}`);
      setBoards(response.data);
    } catch (err) {
      console.error("Failed to fetch boards:", err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchBoards();
  }, [fetchBoards]);

  const filteredBoards = filterText
    ? boards.filter((board) =>
        board.name.toLowerCase().includes(filterText.toLowerCase()),
      )
    : boards;

  return (
    <div className={`dashboard-container ${currentTheme}`}>
      {/* Sidebar */}
      <aside className={`dashboard-sidebar ${currentTheme}`}>
        <Link className="sidebar-header" to="/dashboard">
          Mello
        </Link>
        <nav className={`sidebar-nav ${currentTheme}`}>
          <Button
            type="primary"
            variant="contained"
            onClick={() => [handleAddBoard()]}
          >
            Add New Board
          </Button>
          <Link to="/settings" className="sidebar-link">
            Settings
          </Link>
          <Button
            type="primary"
            className="sidebar-logout"
            variant="contained"
            onClick={async () => {
              await logout();
              navigate("/login");
            }}
          >
            Logout
          </Button>
        </nav>
      </aside>

      <main className={`dashboard-main ${currentTheme}`}>
        <p className="user-greeting">
          Hello {user && user.email ? user.email : "User"}!
        </p>
        <h1>Your Dashboard</h1>
        <p>Manage your projects and boards here.</p>

        {/* Conditionally render loading icon, board grid or no boards message */}
        {loading ? (
          <div className="loading-icon">Loading...</div>
        ) : filteredBoards.length > 0 ? (
          <BoardGrid
            boards={filteredBoards}
            handleAddBoard={handleAddBoard}
            handleEditBoard={handleEditBoard}
            handleBoardFilter={handleBoardFilter}
            handleApplyFilter={handleApplyFilter}
          />
        ) : (
          <p className="no-boards-message">
            You have no boards yet. Click 'Add New Board' to create one!
          </p>
        )}
      </main>
      <BoardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        board={selectedBoard}
        onBoardSaved={fetchBoards}
      />
      {/* Filter Modal */}
      {filterModalOpen && (
        <FilterModal
          isOpen={filterModalOpen}
          onClose={() => setFilterModalOpen(false)}
          onApplyFilter={handleApplyFilter}
        />
      )}
    </div>
  );
};

export default Dashboard;
