import React, { useEffect, useState } from 'react';
import { auth, FIREBASE_STORAGE } from '../firebaseConfig';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Menu from '../components/Menu';

export default function Usuario() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setEmail(user.email);

      // Leer el nombre de usuario desde Firestore
      const fetchUsername = async () => {
        try {
          const userDoc = await getDoc(doc(FIREBASE_STORAGE, 'users', user.email));
          if (userDoc.exists()) {
            setUsername(userDoc.data().username || '');
          }
        } catch (error) {
          console.error('Error al obtener el nombre de usuario:', error);
        }
      };
      fetchUsername();
    }
  }, []);

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      alert('No se pudo cerrar sesión');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.title}>Usuario</div>
      <div style={styles.info}>Correo: {email}</div>
      <div style={styles.info}>Nombre: {username}</div>
      <button style={styles.button} onClick={handleLogOut}>
        <span style={styles.buttonText}>Log Out</span>
      </button>
      <Menu active="usuario" onNavigate={route => navigate('/' + route)} />
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: '#1C1C1C',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    color: 'white',
    fontSize: 32,
    marginBottom: 20,
    marginTop: 50,
  },
  info: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    background: '#4B4B4B',
    padding: '12px 20px',
    borderRadius: 8,
    alignItems: 'center',
    width: '50%',
    marginTop: 20,
    border: 'none',
    cursor: 'pointer',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
};