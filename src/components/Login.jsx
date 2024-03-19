import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginStyles from '../components/Styles/LoginStyles ';

function Login({ onLogin }) {
  const [dataForm, setDataForm] = useState({
    nombre_usuario: "",
    pass: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:4000/api/validarUsuario/${dataForm.nombre_usuario}/${dataForm.pass}`);
      const data = response.data;
      console.log(data)

      if (data.success) {
        localStorage.setItem('nombre_usuario', dataForm.nombre_usuario);
        onLogin(dataForm.nombre_usuario); 
        navigate('/publicaciones');

      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Usuario o contraseña incorrectos',
        });
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al iniciar sesión',
      });
    }
  };

  return (
    <div className="container-fluit login-container">
      <LoginStyles />
      <div className="card mx-auto login-card">
        <h2 className="text-center mb-4">Iniciar sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nombre_usuario" className="form-label">Usuario</label>
            <input type="text" className="form-control" id="nombre_usuario" name="nombre_usuario" value={dataForm.nombre_usuario} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="pass" className="form-label">Contraseña</label>
            <input type="password" className="form-control" id="pass" name="pass" value={dataForm.pass} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-primary w-100">Iniciar sesión</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
