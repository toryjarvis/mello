import React, { Component } from 'react';
import './AboutPage.css';

export default class AboutPage extends Component {
     render() {
          return (
               <div className='About-Container'>
               <div className='About-Header'>
                    <h1>About Mello</h1>
               </div>
               <div className='About-Text'>
                    <p>Mello is a Trello-inspired interactive project planning application, built with React, Node.js, Express, and Firebase. Mello allows users to organize tasks into boards, lists, and cards with a clean and intuitive interface. Mello is designed with compartmentalization and functionality in mind to enhance productivity and showcase my own full stack development skills.</p>
               </div>
               </div>
          )
     }
}