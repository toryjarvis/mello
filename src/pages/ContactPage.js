import React, { useContext } from "react";
import "./ContactPage.css";
import { Link } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";

const ContactPage = () => {
  const { currentTheme } = useContext(ThemeContext);

  return (
    <div className={`Contact-Container ${currentTheme}`}>
      <div className="Contact-Title">Contact Mello</div>
      <div className="Contact-Text">
        Feel free to reach out if you have any questions, feedback, or
        suggestions. While this is a personal portfolio project, I am open to
        hearing from anyone who has used the app or has any contributions.
      </div>
      <div className="Contact-Options">
        <div className="Contact-Email">
          <Link to="mailto:toryjarvisdev@gmail.com">Email</Link>
        </div>
        <div className="Contact-LinkedIn">
          <Link to="https://www.linkedin.com/in/victorjarvis/">LinkedIn</Link>
        </div>
        <div className="Contact-GitHub">
          <Link to="https://github.com/toryjarvis">Github</Link>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
