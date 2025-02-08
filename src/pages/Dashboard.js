import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className='dashboard-container'>
      {/* Sidebar */}
      <aside className='dashboard-sidebar'>
        <h2>Mello</h2>
        <nav>
          <ul>
            <li><a href='#'>Boards</a></li>
            <li><a href='#'>Settings</a></li>
            <li><a href='#'>Logout</a></li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className='dashboard-main'>
        <h1>Welcome to Your Dashboard</h1>
        <p>Here you can manage your projects and boards.</p>
      </main>
    </div>
  );
};

export default Dashboard;
