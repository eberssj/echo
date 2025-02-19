import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import Button from '../components/Button';
import './Login.css';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/home');
  };

  return (
    <div className="login-page">
      <div className="top-image-container">
        <img src="/assets/logotopdeco.png" alt="Logo" className="top-image" />
      </div>

      <div className="login-container pages">
        <h1 className="login-title">
          Log in to your <span className="echo-text">Echo</span> account here.
        </h1>

        <div className="authform-container">
          <AuthForm mode="login" />
        </div>
        <div className='button-container'>
          <Button onClick={handleLogin} text="Log in" mode="green" />
        </div>
        <p className="signup-link">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
