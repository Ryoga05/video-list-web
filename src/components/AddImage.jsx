import React, { useRef, useState } from 'react';

const width = Math.min(window.innerWidth, 600); // Limita el ancho máximo

export default function AddImage({ placeholder, onImageSelected }) {
  const [selectedImage, setSelectedImage] = useState(placeholder);
  const fileInputRef = useRef();

  const handleImagePick = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      onImageSelected(imageUrl);
    }
  };

  return (
    <div style={styles.container}>
      <div
        style={{
          ...styles.image,
          backgroundImage: `url(${selectedImage})`,
        }}
      >
        <button
          style={styles.plusButton}
          onClick={() => fileInputRef.current.click()}
          type="button"
        >
          <svg width={width * 0.1} height={width * 0.1} viewBox="0 0 24 24">
            <path fill="white" d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
          </svg>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleImagePick}
        />
      </div>
    </div>
  );
}

const styles = {
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  image: {
    width: width * 0.7,
    height: width * 0.5,
    marginBottom: 15,
    borderRadius: 10,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: 0.7,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  plusButton: {
    background: 'rgba(0,0,0,0.5)',
    width: width * 0.15,
    height: width * 0.15,
    borderRadius: (width * 0.15) / 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: 'none',
    cursor: 'pointer',
    position: 'absolute',
  },
};