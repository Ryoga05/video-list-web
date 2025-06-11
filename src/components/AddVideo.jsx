import React, { useState } from 'react';

export default function AddVideo({ visible, onClose, onAddVideo }) {
  const [url, setUrl] = useState('');

  const handleAddVideo = () => {
    if (url.trim()) {
      onAddVideo(url);
      setUrl('');
      onClose();
    }
  };

  if (!visible) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        <input
          style={styles.input}
          placeholder="Introduce la URL del video..."
          value={url}
          onChange={e => setUrl(e.target.value)}
        />
        <button style={styles.button} onClick={handleAddVideo}>
          <span style={styles.buttonText}>Añadir video</span>
        </button>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
  popup: {
    width: '80%',
    maxWidth: 350,
    background: '#4B4B4B',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    width: '100%',
    background: '#3A3A3A',
    color: '#fff',
    padding: '10px 15px',
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    border: 'none',
    outline: 'none',
  },
  button: {
    background: '#1C1C1C',
    padding: '12px 20px',
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    border: 'none',
    cursor: 'pointer',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
};