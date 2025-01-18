import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage.js';
import SignUpPage from './pages/SignUpPage';
// import DashboardPage from './pages/DashboardPage';
// import WorkspacePage from './pages/WorkspacePage';
import AboutPage from './pages/AboutPage';
import FAQPage from './pages/FAQPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';

export default class Routes extends Component {

     render() {
          return (
               <Switch>
                    <Route exact path='/' component={HomePage} />
                    <Route path='/login' component={LoginPage} />
                    <Route path='/signup' component={SignUpPage} />
                    {/* <Route path='/dashboard' component={DashboardPage} /> */}
                    <Route path='/FAQ' component={FAQPage} />
                    <Route path='/privacy' component={PrivacyPage} />
                    <Route path='/about' component={AboutPage} />
                    <Route path='/contact' component={ContactPage} />
                    {/* <Route path='/workspace' component={ WorkspacePage } /> */}
               </Switch>
          );
     };
};