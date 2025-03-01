import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Button from "../components/Utils/Button";
import BoardGrid from "../components/BoardGrid/BoardGrid";
import "./Dashboard.css";
import { auth, db } from "../config/firebaseConfig"; 
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

const Dashboard = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [boards, setBoards] = useState([]);

  const handleAddBoard = async () => {
    if (!auth.currentUser) {
      console.error("User not authenticated");
      return;
    }
  
    try {
      await addDoc(collection(db, "boards"), {
        name: "New Board",
        // Ensure the user is logged in
        userId: auth.currentUser.uid, 
        createdAt: new Date(),
      });
      console.log("Board added successfully!");
    } catch (error) {
      console.error("Error adding board:", error);
    }
  };
  
  // Fetch User Specific Boards
  useEffect(() => {
    const fetchBoards = async () => {
      if (!auth.currentUser) return;
      
      try {
        const q = query(
          collection(db, "boards"),
          // Fetch only the current user's boards
          where("userId", "==", auth.currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        const userBoards = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setBoards(userBoards);
      } catch (error) {
        console.error("Error fetching boards:", error);
      }
    };

    fetchBoards();
    // Re-run if the user changes
  }, [auth.currentUser]); 

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <h2 className="sidebar-header">Mello</h2>
        <nav className="sidebar-nav">
          <Button 
            type="primary" 
            text="Add New Board" 
            onClick={() => handleAddBoard()} 
          />
          <Link to="/settings" className="sidebar-link">Settings</Link>
          <Button type="primary" text="Logout" className="sidebar-logout" 
          onClick={async () => {
            await logout();
            // Redirect to login page
            navigate("/login");
          }} />
        </nav>   
      </aside>

      {/* Main Dashboard */}
      <main className="dashboard-main">
        <h1>Welcome to Your Dashboard!</h1>
        <p>Manage your projects and boards here.</p>

        {/* Conditionally Render Board Grid or Message */}
        {boards.length > 0 ? (
          <BoardGrid boards={boards} />
        ) : (
          <p className="no-boards-message">
            You have no boards yet. Click 'Add New Board' to create one!
          </p>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
