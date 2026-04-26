import React from "react";
import "./PrivacyPage.css";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const PrivacyPage = () => {
  const { currentTheme } = useContext(ThemeContext);
  return (
    <div className={`Privacy-Container ${currentTheme}`}>
      <div className={"Privacy-Title"}>Privacy Policy</div>
        <div className="Privacy-Text">
          If you're reading this, you probably already know that this is a
          personal portfolio project. Rest assured, I am not a company, and I do
          not collect any data from you. I do not use cookies, and I do not
          track your IP address.
          <br />
          <br />
          Your privacy is important, and I do not want to collect any data from
          you without your explicit consent. Frankly, I'm also not interested in
          collecting any data from you or selling it. The most information
          "collected" so far is just your email address, used for signup, and
          future user authentication features such as password reset, email
          verification, and email notifications.
        </div>
      </div>
    );
  }

export default PrivacyPage;
