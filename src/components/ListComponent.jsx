import React from 'react';

export default function ListComponent({ image, title, description, onPress }) {
  return (
    <div style={styles.container}>
      <img
        style={styles.image}
        src={image ? image : '/placeholder.jpg'} // Coloca placeholder.jpg en public/
        alt={title}
      />
      <div style={styles.textContainer}>
        <div style={styles.listTitle}>{title}</div>
        <div style={styles.text}>{description}</div>
      </div>
      <button style={styles.iconContainer} onClick={onPress}>
        <svg width={36} height={36} viewBox="0 0 24 24">
          <path fill="white" d="M10 17l5-5-5-5v10z" />
        </svg>
      </button>
    </div>
  );
}

const styles = {
  container: {
    background: '#4B4B4B',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '30px 0',
    borderRadius: 20,
    marginBottom: 30,
    width: '100%',
    maxWidth: 600,
  },
  image: {
    width: 80,
    height: 60,
    borderRadius: 10,
    backgroundColor: '#999',
    marginLeft: 20,
    marginRight: 20,
    objectFit: 'cover',
  },
  textContainer: {
    marginRight: 40,
    flex: 1,
    minWidth: 0,
  },
  listTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    margin: '5px 0',
    wordBreak: 'break-word',
  },
  text: {
    color: 'white',
    wordBreak: 'break-word',
  },
  iconContainer: {
    width: 50,
    height: 50,
    background: 'none',
    border: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    cursor: 'pointer',
    padding: 0,
  },
};