import React, { useState } from 'react';
import logo from '../Assets/LogoBlanco.svg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => { 
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const loginButton = async (e) => {
    e.preventDefault();
    const credential = {
      nombre: user,
      contraseña: password
    };
    console.log(credential);
    
    try {
      const res = await axios.post("http://localhost:4000/api/login/login", credential);
      // Redireccionar a dashboard, aquí ya no se utiliza un token
      console.log("Login exitoso:", res.data);
      navigate('/dashboard');
    } catch (error) {
      console.log(error);
      alert("Credenciales incorrectas");
    }
  }

  return (
    <div className='container'>
      <div className="login">
        <span>
          <img src={logo} alt='logo' className='logologin' />
        </span>
        <form>
          <div className="form-group">
            <span className="pi pi-user" style={{ color: 'white' }}></span>
            <input 
              type="text" 
              id="username" 
              name="username" 
              className='formcaja' 
              onChange={(e) => setUser(e.target.value)} 
            />
          </div>
          <div className="form-group">
            <span className="pi pi-lock" style={{ color: 'white' }}></span>
            <input 
              type="password" 
              id="password" 
              name="password" 
              className='formcaja' 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>
          <button className='but_login' onClick={loginButton}>Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
