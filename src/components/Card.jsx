/* eslint-disable react/prop-types */

import './Card.css'; // Create this CSS file to style the cards

const Card = ({ title, description }) => {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default Card;
