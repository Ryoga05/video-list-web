import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Favoritos from './pages/Favoritos';
import Listas from './pages/Listas';
import Usuario from './pages/Usuario';
import Lista from './pages/Lista';
import './App.css';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/Login" replace />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Favoritos" element={<Favoritos />} />
          <Route path="/Listas" element={<Listas />} />
          <Route path="/Usuario" element={<Usuario />} />
          <Route path="/Lista/:id" element={<Lista />} />
          {/* Puedes agregar rutas adicionales aquí */}
        </Routes>
    </Router>
  );
}

export default App;
