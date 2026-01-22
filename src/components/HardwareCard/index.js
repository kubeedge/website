import React from "react";

export default function HardwareCard({ name, image, description, link }) {
  return (
    <div
      className="hardware-card"
      onClick={() => window.open(link, "_blank")}
    >
      <img src={image} alt={name} className="hardware-image" />
      <div className="hardware-info">
        <h3>{name}</h3>
        <p>{description}</p>
        <a href={link} target="_blank" rel="noopener noreferrer">
          View More
        </a>
      </div>
    </div>
  );
}
