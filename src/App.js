import React, { useContext } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Button from './components/Utils/Button';

import AboutPage from './pages/AboutPage';
import FAQPage from './pages/FAQPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import Dashboard from './pages/Dashboard';
import LoginSignUpPage from './pages/LoginSignUpPage';
import BoardDetail from './pages/BoardDetail';
import Settings from './pages/Settings';

import spinningm from './spinningm.svg';

import './App.css';

const App = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  if (loading) return <p>Loading...</p>;

  const handleHelloMelloClick = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className='App'>
      <Header />

      <div className='App-main'>
        <Routes>
          <Route
            path='/'
            element={
              <>
                <img src={spinningm} className='App-logo' alt='logo' style={{ cursor: 'pointer' }}
                  onClick={handleHelloMelloClick} />
                <p className='logline'>Manage your projects with ease.</p>
                <Button text='Hello Mello' className='App-link' onClick={handleHelloMelloClick} />
              </>
            }
          />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/faq' element={<FAQPage />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/privacy' element={<PrivacyPage />} />
          <Route path='/dashboard' element={user ? <Dashboard /> : <Navigate to='/' />} />
          <Route path='/login' element={!user ? <LoginSignUpPage /> : <Navigate to='/dashboard' />} />
          <Route path="/boards/:boardId" element={<BoardDetail />} />
          <Route path="/settings" element={!user ? <LoginSignUpPage /> : <Settings />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
};

export default App;
