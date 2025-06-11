import React from 'react';

export default function Menu({ active, onNavigate }) {
  return (
    <div style={styles.container}>
      <button style={styles.iconButton} onClick={() => onNavigate('favoritos')}>
        {active === 'favoritos' ? (
          <svg width={36} height={36} viewBox="0 0 24 24">
            <path fill="black" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        ) : (
          <svg width={36} height={36} viewBox="0 0 24 24">
            <path fill="white" d="M16.5,3c-1.74,0-3.41,0.81-4.5,2.09C10.91,3.81,9.24,3,7.5,3C4.42,3,2,5.42,2,8.5
              c0,3.78,3.4,6.86,8.55,11.54c0.29,0.27,0.74,0.27,1.03,0C18.6,15.36,22,12.28,22,8.5C22,5.42,19.58,3,16.5,3z M12.1,18.55
              l-0.1,0.1l-0.1-0.1C7.14,14.24,4,11.39,4,8.5C4,6.5,5.5,5,7.5,5c1.54,0,3.04,1,3.57,2.36h1.87C13.46,6,14.96,5,16.5,5
              C18.5,5,20,6.5,20,8.5C20,11.39,16.86,14.24,12.1,18.55z"/>
          </svg>
        )}
      </button>
      <button style={styles.iconButton} onClick={() => onNavigate('listas')}>
        <svg width={36} height={36} viewBox="0 0 24 24">
          <path fill={active === 'listas' ? 'black' : 'white'} d="M3 18h6v-2H3v2zm0-5h12v-2H3v2zm0-7v2h18V6H3zm16 7h-6v2h6v-2z"/>
        </svg>
      </button>
      <button style={styles.iconButton} onClick={() => onNavigate('usuario')}>
        {active === 'usuario' ? (
          <svg width={36} height={36} viewBox="0 0 24 24">
            <path fill="black" d="M12 12c2.7 0 8 1.34 8 4v2H4v-2c0-2.66 5.3-4 8-4zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/>
          </svg>
        ) : (
          <svg width={36} height={36} viewBox="0 0 24 24">
            <path fill="white" d="M12 12c2.7 0 8 1.34 8 4v2H4v-2c0-2.66 5.3-4 8-4zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/>
          </svg>
        )}
      </button>
    </div>
  );
}

const styles = {
  container: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    background: '#4B4B4B',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '30px 0',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 100,
  },
  iconButton: {
    background: 'none',
    border: 'none',
    padding: 0,
    margin: 0,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};