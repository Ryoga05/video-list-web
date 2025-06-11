import React, { useState } from 'react';
import { auth, FIREBASE_STORAGE } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // Crear el usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      // Crear un documento en Firestore con el email del usuario y el nombre de usuario
      await setDoc(doc(FIREBASE_STORAGE, 'users', email), {
        username: username,
      });
      // Navegar a Favoritos
      navigate('/favoritos');
    } catch (error) {
      setError('Hubo un problema al crear la cuenta. Intenta nuevamente.');
      console.error(error.message);
    }
  };

  return (
    <div style={styles.scrollContainer}>
      <div style={styles.container}>
        <h1 style={styles.title}>VideoList</h1>
        <img
          src="/Logo.png"
          alt="Logo"
          style={styles.logo}
        />
        <form style={styles.signUpBox} onSubmit={handleSignUp}>
          <button
            type="button"
            style={styles.loginButton}
            onClick={() => navigate('/login')}
          >
            <span style={styles.loginText}>Login</span>
          </button>
          <input
            style={styles.signUpInput}
            placeholder="Introduce tu nombre de usuario..."
            value={username}
            onChange={e => setUsername(e.target.value)}
            autoCapitalize="none"
          />
          <input
            style={styles.signUpInput}
            placeholder="Introduce tu correo..."
            value={email}
            onChange={e => setEmail(e.target.value)}
            type="email"
            autoCapitalize="none"
          />
          <input
            style={styles.signUpInput}
            placeholder="Introduce tu contraseña..."
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
          <button type="submit" style={styles.signUpButton}>
            <span style={styles.signUpText}>Sign Up</span>
          </button>
          {error && <div style={{ color: 'red', marginTop: 10 }}>{error}</div>}
        </form>
      </div>
    </div>
  );
}

const styles = {
  scrollContainer: {
    minHeight: '100vh',
    width: '100vw',
    overflowX: 'hidden',
    background: '#1C1C1C',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  container: {
    width: '100vw',
    maxWidth: 400,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 16,
    boxSizing: 'border-box', // <-- Añade esto
  },
  title: {
    color: 'white',
    fontSize: 32,
    marginBottom: 20,
    marginTop: 50,
    fontFamily: 'sans-serif',
  },
  logo: {
    width: '60%',
    aspectRatio: '1/1',
    objectFit: 'contain',
    borderRadius: 50,
    marginBottom: 10,
  },
  signUpBox: {
    width: '100%',
    maxWidth: 400,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: '#4B4B4B',
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    marginTop: 40,
  },
  signUpInput: {
    background: 'rgba(28, 28, 28, 0.4)',
    borderRadius: 15,
    margin: 10,
    padding: 12,
    minHeight: 40,
    width: '90%',
    color: 'white',
    border: 'none',
    fontSize: 16,
    outline: 'none',
  },
  signUpButton: {
    background: '#1C1C1C',
    borderRadius: 15,
    margin: 15,
    height: 40,
    width: '60%',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
  },
  signUpText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  loginButton: {
    background: '#1C1C1C',
    borderRadius: 15,
    margin: 15,
    height: 30,
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
  },
  loginText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
};