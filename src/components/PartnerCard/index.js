import React, { useState } from 'react';

export default function PartnerCard({ name, product, description, link }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      style={{
        border: '1px solid #e0e0e0',
        borderRadius: '12px',
        padding: '20px',
        margin: '10px',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fff',
      }}
    >
      <div>
        <h3 style={{ margin: '0 0 10px 0' }}>{name}</h3>
        <h4 style={{ margin: '0 0 10px 0', color: '#555' }}>{product}</h4>
        <p
          style={{
            fontSize: '14px',
            color: '#666',
            lineHeight: '1.6',
            overflow: expanded ? 'visible' : 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: expanded ? 'none' : 3,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {description}
        </p>
        {description.length > 120 && (
          <button
            onClick={() => setExpanded(!expanded)}
            style={{
              marginTop: '4px',
              background: 'none',
              border: 'none',
              color: '#0078e7',
              cursor: 'pointer',
              fontSize: '14px',
              padding: 0,
            }}
          >
            {expanded ? 'Collapse' : 'Expand'}
          </button>
        )}
      </div>

      <div style={{ marginTop: '8px' }}>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: '8px 16px',
            backgroundColor: '#0078e7',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '6px',
            fontSize: '14px',
          }}
        >
          Visit Website
        </a>
      </div>
    </div>
  );
}
