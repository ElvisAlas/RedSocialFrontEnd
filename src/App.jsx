import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Publicaciones from './components/Publicaciones';

const App = () => {
  const [usuario, setUsuario] = useState('');

  const handleLogin = (username) => {
    setUsuario(username); 
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login onLogin={handleLogin} />} />
        <Route path='/publicaciones' element={<Publicaciones usuario={usuario} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
