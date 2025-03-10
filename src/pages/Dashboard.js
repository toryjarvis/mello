import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { AuthContext } from '../contexts/AuthContext';

import Button from '../components/Utils/Button';
import BoardGrid from '../components/BoardGrid/BoardGrid';
import BoardModal from '../components/BoardModal/BoardModal';

import { auth, db } from '../config/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

import './Dashboard.css';

const Dashboard = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [boards, setBoards] = useState([]);
  const [modalMode, setModalMode] = useState('add');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleAddBoard = () => {
    setModalMode('add');
    setSelectedBoard(null);
    setIsModalOpen(true);
  };

  const handleEditBoard = (board) => {
    setModalMode('edit');
    setSelectedBoard(board);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const q = query(collection(db, 'boards'), where('userId', '==', user.uid));

        // Listen for changes in real-time
        const unsubscribeBoards = onSnapshot(q, (querySnapshot) => {
          const userBoards = querySnapshot.docs.map((doc) => ({
            boardId: doc.id,
            ...doc.data(),
          }));
          setBoards(userBoards);
          // Set loading to false once the boards are fetched
          setLoading(false);
        }, (error) => {
          console.error('Error fetching boards:', error);
          // Set loading to false in case there is an error
          setLoading(false);
        });
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
    <div className='dashboard-container'>
      {/* Sidebar */}
      <aside className='dashboard-sidebar'>
        <h2 className='sidebar-header' href='/dashboard'>Mello</h2>
        <nav className='sidebar-nav'>
          <Button type='primary' text='Add New Board' onClick={() => [handleAddBoard()]} />
          <Link to='/settings' className='sidebar-link'>Settings</Link>
          <Button type='primary' text='Logout' className='sidebar-logout'
            onClick={async () => {
              await logout();
              navigate('/login');
            }} />
        </nav>
      </aside>

      {/* Main Dashboard */}
      <main className='dashboard-main'>
        <h1>Your Dashboard</h1>
        <p>Manage your projects and boards here.</p>

        {/* Conditionally render loading icon, board Grid or no boards message */}
        {loading ? (
          <div className='loading-icon'>Loading...</div>
        ) : boards.length > 0 ? (
          <BoardGrid boards={boards} handleEditBoard={handleEditBoard} />
        ) : (
          <p className='no-boards-message'>
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
