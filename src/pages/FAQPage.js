import React, { Component } from "react";
import "./FAQPage.css";

export default class FAQPage extends Component {
  render() {
    return (
      <div className="FAQ-Container">
        <div className="FAQ-Title">(Soon to be Frequently Asked) Questions</div>
        <ol className="FAQ-Question-List">
          <li className="FAQ-Item">
            <div class="FAQ-Question">
              <strong>What is Mello?</strong>
            </div>
            <div class="FAQ-Answer">
              Mello is a project management tool that helps you organize your
              tasks and projects.
            </div>
          </li>
          <li className="FAQ-Item">
            <div class="FAQ-Question">
              <strong>How do I create a new board?</strong>
            </div>
            <div class="FAQ-Answer">
              You can create a new board by clicking the 'Add New Board' button
              on the dashboard. This will open a modal where you can enter the
              board name and description.{" "}
            </div>
          </li>
          <li className="FAQ-Item">
            <div class="FAQ-Question">
              <strong>How do I add a new card?</strong>
            </div>
            <div class="FAQ-Answer">
              To add a new card, click on the 'Add Card' button on the board.
              This will open a modal where you can enter the card title and
              description.
            </div>
          </li>
          <li className="FAQ-Item">
            <div class="FAQ-Question">
              <strong>Can I edit or delete a board?</strong>
            </div>
            <div class="FAQ-Answer">
              Yes, you can edit or delete a board by clicking the 'Edit' or
              'Delete' buttons on the board card.
            </div>
          </li>
          <li className="FAQ-Item">
            <div class="FAQ-Question">
              <strong>How do I change my account settings?</strong>
            </div>
            <div class="FAQ-Answer">
              You can change your account settings by going to the 'Settings'
              page. Here you can update your username, email, and password.
            </div>
          </li>
        </ol>
      </div>
    );
  }
}
