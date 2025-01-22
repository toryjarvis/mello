import React from 'react';
import { Routes, Route } from 'react-router-dom';
import spinningm from './spinningm.svg';
import './App.css';

import MelloContext from './contexts/mellocontext';
import TokenService from './services/token-service';
import AuthApiService from './services/auth-api-service';
import IdleService from './services/idle-service';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import SignInSignUpForm from './components/Registration/SignInSignUpForm';
import AboutPage from './pages/AboutPage';
import FAQPage from './pages/FAQPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import Dashboard from './pages/Dashboard';
import LoginSignUpPage from './pages/LoginPage';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      hasError: false,
    };
  }

  static getDerivedStateFromError(error) {
    console.error(error);
    return { hasError: true };
  }

  componentDidMount() {
    IdleService.setIdleCallback(this.logoutFromIdle);

    if (TokenService.hasAuthToken()) {
      IdleService.regiserIdleTimerResets();
      TokenService.queueCallbackBeforeExpiry(() => {
        AuthApiService.postRefreshToken();
      });
    }
  }

  componentWillUnmount() {
    IdleService.unRegisterIdleResets();
    TokenService.clearCallbackBeforeExpiry();
  }

  logoutFromIdle = () => {
    TokenService.clearAuthToken();
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets();
    this.setState({ loggedIn: false });
  };

  setLoginStatus = (status) => {
    this.setState({
      loggedIn: status,
    });
  };

  handleHelloMelloClick = () => {
    const { loggedIn } = this.state;
    const { navigate } = this.props;
  
    if (navigate) { // Ensure navigate exists
      if (loggedIn) {
        navigate('/dashboard');
      } else {
        navigate('/login');
      }
    } else {
      console.error('Navigate function is not available!');
    }
  };
  

  render() {
    return (
      <MelloContext.Provider
        value={{
          loggedIn: this.state.loggedIn,
          setLoginStatus: this.setLoginStatus,
        }}
      >
        <div className="App">
          {/* Header */}
          <Header />

          {/* Main */}
          <div className="App-main">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <img
                      src={spinningm}
                      className="App-logo"
                      alt="logo"
                      onClick={this.handleHelloMelloClick}
                      style={{ cursor: 'pointer' }}
                    />
                    <p>Manage your projects with ease.</p>
                    <button
                      className="App-link"
                      onClick={this.handleHelloMelloClick}
                    >
                      Hello Mello
                    </button>
                  </>
                }
              />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<LoginSignUpPage />} />
            </Routes>
          </div>

          {/* Footer */}
          <Footer />
        </div>
      </MelloContext.Provider>
    );
  }
}

export default App;
