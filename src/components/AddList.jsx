import React, { useState } from 'react';
import AddImage from './AddImage';

export default function AddList({ visible, onClose, onAddList }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('/placeholder.jpg'); // Usa el placeholder por defecto

  if (!visible) return null;

  const handleAddList = (e) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) {
      alert('Por favor llena todos los campos.');
      return;
    }
    if (!image || image === '/placeholder.jpg') {
      alert('Por favor selecciona una imagen.');
      return;
    }
    onAddList(name, description, image);
    setName('');
    setDescription('');
    setImage('/placeholder.jpg');
    onClose();
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        <AddImage
          placeholder="/placeholder.jpg"
          onImageSelected={setImage}
        />
        <input
          style={styles.input}
          placeholder="Nombre"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          style={styles.input}
          placeholder="Descripción"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button style={styles.button} onClick={handleAddList}>
          <span style={styles.buttonText}>Crear lista nueva</span>
        </button>
        <button style={styles.cancelButton} onClick={onClose}>
          Cancelar
        </button>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
  },
  popup: {
    width: '90%',
    maxWidth: 400,
    background: '#4B4B4B',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
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
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    background: '#888',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    padding: '8px 16px',
    cursor: 'pointer',
    width: '100%',
  },
};