import React from 'react';

export default function VideoCard({ title, link, image }) {
  return (
    <div
      style={{
        borderRadius: '16px',
        overflow: 'hidden',
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s ease',
        cursor: 'pointer',
      }}
      onClick={() => window.open(link, '_blank')}
      onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.03)')}
      onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
    >
      {image && (
        <img
          src={image}
          alt={title}
          style={{
            width: '100%',
            height: '160px',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      )}
      <div style={{ padding: '16px' }}>
        <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#0078E7' }}>
          {title}
        </h4>
        <p style={{ fontSize: '14px', color: '#666', marginTop: '8px' }}>
            Click to watch
        </p>
      </div>
    </div>
  );
}
