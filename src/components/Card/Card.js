import React from "react";
import "./Card.css";
import Button from "../Utils/Button";

const Card = ({ card }) => {
  return (
    <div className="card-container">
      <div className="card-header">
        <h4 className="card-title">{card.title}</h4>
        <Button className="card-edit-btn" text="E" type="primary"/>
      </div>
      <p className="card-description">{card.description}</p>
    </div>
  );
};

export default Card;
