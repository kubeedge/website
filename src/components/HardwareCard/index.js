import React from "react";

export default function HardwareCard({ name, image, description, link }) {
  return (
    <article className="hardware-card">
      {image ? (
        <div className="hardware-card__media">
          <img src={image} alt={name} className="hardware-card__image" />
        </div>
      ) : null}

      <div className="hardware-card__body">
        <h3>{name}</h3>
        <p>{description}</p>

        {link ? (
          <a
            className="hardware-card__link"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
          >
            View device details
          </a>
        ) : null}
      </div>
    </article>
  );
}
