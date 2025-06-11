import React from 'react';

export default function AddButton({ onClick }) {
  return (
    <button style={styles.button} onClick={onClick}>
      <svg width="28" height="28" viewBox="0 0 24 24">
        <path fill="white" d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
      </svg>
    </button>
  );
}

const styles = {
  button: {
    width: 60,
    height: 60,
    marginBottom: 100,
    background: '#4B4B4B',
    borderRadius: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: 'none',
    cursor: 'pointer',
    position: 'fixed',
    bottom: 30,
    right: 30,
    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
    zIndex: 10,
  },
};