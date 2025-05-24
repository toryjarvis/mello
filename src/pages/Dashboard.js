import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../contexts/AuthContext";

// import Button from '../components/Utils/Button';
import Button from "@mui/material/Button";
import BoardGrid from "../components/BoardGrid/BoardGrid";
import BoardModal from "../components/BoardModal/BoardModal";

import { auth, db } from "../config/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";

import "./Dashboard.css";
import { ThemeContext } from "../contexts/ThemeContext";

const Dashboard = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [boards, setBoards] = useState([]);
  const [modalMode, setModalMode] = useState("add");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [loading, setLoading] = useState(true);
  const { currentTheme } = useContext(ThemeContext);

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

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const q = query(
          collection(db, "boards"),
          where("userId", "==", user.uid),
          orderBy("updatedAt", "desc")
        );
        // , orderBy('updatedAt', 'desc')

        console.log("Fetching boards for user:", user.uid);
        // Listen for changes in real-time
        const unsubscribeBoards = onSnapshot(
          q,
          (querySnapshot) => {
            const userBoards = querySnapshot.docs.map((doc) => ({
              boardId: doc.id,
              ...doc.data(),
            }));
            console.log("Fetched boards:", userBoards);
            setBoards(userBoards);
            // Set loading to false once the boards are fetched
            setLoading(false);
          },
          (error) => {
            console.error("Error fetching boards:", error);
            // Set loading to false in case there is an error
            setLoading(false);
          }
        );
        // Cleanup listener when user logs out or unmounts
        return () => unsubscribeBoards();
      } else {
        setLoading(false); // Set loading to false if user is not authenticated
      }
    });
    // Cleanup auth listener when component unmounts
    return () => unsubscribeAuth();
  }, []);

  return (
    <div className={`dashboard-container ${currentTheme}`}>
      {/* Sidebar */}
      <aside className={`dashboard-sidebar ${currentTheme}`}>
        <Link className="sidebar-header" href="/dashboard">
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

      {/* Main Dashboard */}
      <main className={`dashboard-main ${currentTheme}`}>
        <h1>Your Dashboard</h1>
        <p>Manage your projects and boards here.</p>

        {/* Conditionally render loading icon, board Grid or no boards message */}
        {loading ? (
          <div className="loading-icon">Loading...</div>
        ) : boards.length > 0 ? (
          <BoardGrid
            boards={boards}
            handleAddBoard={handleAddBoard}
            handleEditBoard={handleEditBoard}
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
      />
    </div>
  );
};

export default Dashboard;
