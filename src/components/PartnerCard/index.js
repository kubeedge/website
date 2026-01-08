import React, { useState } from 'react';

export default function PartnerCard({ name, logo, product, description, link }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => window.open(link, '_blank')}
      style={{
        position: 'relative',
        borderRadius: '20px',
        padding: '24px',
        margin: '10px',
        width: '100%',
        maxWidth: '380px',
        height: hovered ? '360px' : '260px', // 加高
        background: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: hovered
          ? '0 16px 32px rgba(0, 0, 0, 0.15)'
          : '0 6px 12px rgba(0, 0, 0, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', //子元素居中
        justifyContent: 'flex-start',
        cursor: 'pointer',
        overflow: 'hidden',
        transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
        transform: hovered ? 'scale(1.05)' : 'scale(1)',
      }}
    >
      {/* Name */}
      <h3 style={{
        margin: '10px 0 5px 0',
        fontSize: '32px',
        fontWeight: '700',
        color: '#0084FF',
        textAlign: 'center',
      }}>
        {name}
      </h3>

      {/* Logo图片 */}
      {logo && (
        <img
          src={logo}
          alt={`${name} logo`}
          style={{
            width: '150px',
            height: '75px',
            objectFit: 'contain',
            margin: '5px 0', // 上下留空
          }}
        />
      )}

      {/* Product */}
      <h4 style={{
        margin: '10px 0 0 0',
        fontSize: '16px',
        fontWeight: '400',
        color: '#000000',
        textAlign: 'center',
      }}>
        {product}
      </h4>

      {/* 蒙版 */}
      {hovered && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.7)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            textAlign: 'center',
            fontSize: '14px',
            lineHeight: '1.8',
            overflowY: 'auto',
            borderRadius: '20px',
          }}
        >
          {description}
        </div>
      )}
    </div>
  );
}
