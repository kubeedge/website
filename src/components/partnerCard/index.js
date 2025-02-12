// import PropTypes from "prop-types";
import React from "react";
import "./style.scss";

const PartnerCard = ({ name, product, description, website, logo }) => {
  return (
    <div className="partner-card">
      <div className="image-container">
      <img src={logo} alt={`${name} logo`} className="partner-logo" />
      </div>
      <h3>{name}</h3>
      <strong>{product}</strong>
      <p>{description}</p>
      <a href={website} target="_blank" rel="noopener noreferrer" className="learn-more-btn">
        Learn More
      </a>
    </div>
  );
};


export default PartnerCard;
