import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import Button from '../components/Utils/Button';
import BoardGrid from '../components/BoardGrid/BoardGrid';
import './Dashboard.css';
import { auth, db } from '../config/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, query, where, onSnapshot } from 'firebase/firestore';

const Dashboard = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [boards, setBoards] = useState([]);

  const handleAddBoard = async () => {
    if (!auth.currentUser) {
      console.error('User not authenticated');
      return;
    }

    try {
      await addDoc(collection(db, 'boards'), {
        name: 'New Board',
        // Assign board to the logged-in user
        userId: auth.currentUser.uid,
        createdAt: new Date(),
      });
      console.log('Board added successfully!');
    } catch (error) {
      console.error('Error adding board:', error);
    }
  };

  const handleOpenEditBoardModal = () => {
    // Logic to open the edit board modal and save the board details (updatedoc)
    console.log('Edit board modal opened');
  }

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
        }, (error) => {
          console.error('Error fetching boards:', error);
        });
        // Cleanup listener when user logs out or unmounts
        return () => unsubscribeBoards();
      }
    });
    // Cleanup auth listener when component unmounts
    return () => unsubscribeAuth();
  }, []);


  return (
    <div className='dashboard-container'>
      {/* Sidebar */}
      <aside className='dashboard-sidebar'>
        <h2 className='sidebar-header'>Mello</h2>
        <nav className='sidebar-nav'>
          <Button
            type='primary'
            text='Add New Board'
            onClick={() => [handleAddBoard(), handleOpenEditBoardModal()]}
          />
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

        {/* Conditionally Render Board Grid or Message */}
        {boards.length > 0 ? (
          <BoardGrid boards={boards} />
        ) : (
          <p className='no-boards-message'>
            You have no boards yet. Click Add New Board to create one!
          </p>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
