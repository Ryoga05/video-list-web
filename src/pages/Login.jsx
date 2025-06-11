import React, { useEffect, useState } from 'react';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/favoritos');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    signInWithEmailAndPassword(auth, email, password)
      .then(() => navigate('/favoritos'))
      .catch(() => setError('Correo o contraseña incorrectos'));
  };

  return (
    <div style={styles.scrollContainer}>
      <div style={styles.container}>
        <h1 style={styles.title}>VideoList</h1>
        <img
          src="/Logo.png" // Coloca tu logo en public/Logo.png
          alt="Logo"
          style={styles.logo}
        />
        <form style={styles.loginBox} onSubmit={handleLogin}>
          <button
            type="button"
            style={styles.signUpButton}
            onClick={() => navigate('/SignUp')}
          >
            <span style={styles.signUpText}>Sign Up</span>
          </button>
          <input
            style={styles.loginInput}
            placeholder="Introduce tu correo..."
            value={email}
            onChange={e => setEmail(e.target.value)}
            type="email"
            autoComplete="username"
          />
          <input
            style={styles.loginInput}
            placeholder="Introduce tu contraseña..."
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
            autoComplete="current-password"
          />
          <button type="submit" style={styles.loginButton}>
            <span style={styles.loginText}>Login</span>
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
    background: '#1C1C1C',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  container: {
    width: '100%',
    maxWidth: 400,
    margin: '0 auto',
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
    fontFamily: 'sans-serif',
  },
  logo: {
    width: '60%',
    aspectRatio: '1/1',
    objectFit: 'contain',
    borderRadius: 50,
    marginBottom: 10,
  },
  loginBox: {
    width: '90%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: '#4B4B4B',
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    marginTop: 40,
  },
  loginInput: {
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
  loginButton: {
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
  loginText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  signUpButton: {
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
  signUpText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
};