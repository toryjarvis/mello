import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Utils/Button';
import BoardGrid from '../components/BoardGrid';
import './Dashboard.css';

const Dashboard = () => {
  const [boards, setBoards] = useState([]);

  // useEffect(() => {
  //   // Fetch user boards from API (Replace with real API call)
  //   const fetchBoards = async () => {
  //     try {
  //       // Simulated API response
  //       const userBoards = [
  //         { id: '1', name: 'Personal Projects' },
  //         { id: '2', name: 'Work Tasks' },
  //         { id: '3', name: 'Learning Goals' },
  //       ];
  //       setBoards(userBoards);
  //     } catch (error) {
  //       console.error('Error fetching boards:', error);
  //     }
  //   };

  //   fetchBoards();
  // }, []);

  return (
    <div className='dashboard-container'>

      {/* Sidebar */}
      <aside className='dashboard-sidebar'>
        <h2>Mello</h2>
        <nav className='sidebar-nav'>
          <Button type='primary' text='Add New Board' onClick={() => console.log('Open board creation modal')} />
          <Link to='/settings'>Settings</Link>
        </nav>
      </aside>

      {/* Main Dash */}
      <main className='dashboard-main'>
        <h1>Welcome to Your Dashboard!</h1>
        <p>Manage your projects and boards here.</p>

        {/* Conditionally Render Board Grid or Message */}
        {boards.length > 0 ? (
          <BoardGrid boards={boards} />
        ) : (
          <p className='no-boards-message'>You have no boards yet. Click 'Add New Board' to create one!</p>
        )}
        
      </main>
    </div>
  );
};

export default Dashboard;
