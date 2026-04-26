import React from "react";
import "./AboutPage.css";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const AboutPage = () => {
  const { currentTheme } = useContext(ThemeContext);
  return (
    <div className={`About-Container ${currentTheme}`}>
      <div className={"About-Header"}>
          <h1>About Mello</h1>
        </div>
        <div className={"About-Text"}>
          <p>
            Mello is a full-stack task management tool built for collaborative planning, 
            designed to emulate the utility and structure of internal tools used in 
            modern tech teams. Inspired by productivity platforms like Trello, Asana, 
            and Taigi, Mello demonstrates user-friendly and scalable architecture, 
            secure authentication, modular UI/UX, and real-time responsiveness. 
            Mello is designed with compartmentalization and
            functionality in mind to enhance productivity and showcase my own
            full stack development skills.
          </p>
        </div>
      </div>
    );
  }

export default AboutPage;
