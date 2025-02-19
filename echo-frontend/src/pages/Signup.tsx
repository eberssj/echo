import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import Button from '../components/Button';
import './Login.css'; 

const Signup: React.FC = () => {
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate('/home'); 
  };

  return (
    <div className="login-page">
      <div className="top-image-container">
        <img src="/assets/logotopdeco.png" alt="Logo" className="top-image" />
      </div>

      <div className="login-container pages">
        <h1 className="login-title">
          Create your <span className="echo-text">Echo</span> account here.
        </h1>

        <div className="authform-container">
          <AuthForm mode="signup" /> 
        </div>
        <div className='button-container'>
          <Button onClick={handleSignup} text="Sign up" mode="green" />
        </div>
        <p className="signup-link">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;