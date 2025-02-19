import React, { useState, useEffect } from 'react';
import './AuthForm.css';

interface AuthFormProps {
  mode: 'login' | 'signup';
}

const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Função para validar se as senhas coincidem
  useEffect(() => {
    if (mode === 'signup') {
      if (password && confirmPassword) {
        setPasswordsMatch(password === confirmPassword);
      } else {
        setPasswordsMatch(true); // Não mostrar erro se um dos campos estiver vazio
      }
    }
  }, [password, confirmPassword, mode]);

  return (
    <div className="auth-form">
      <input type="email" placeholder="Email" className="auth-input" />

      {/* Campo de Password */}
      <div className="password-container">
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          className="auth-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span onClick={togglePasswordVisibility} className="password-toggle">
          <img
            src={showPassword ? "/assets/eye.png" : "/assets/hidden.png"}
            alt={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
            className="password-icon"
          />
        </span>
      </div>

      {mode === 'signup' && (
        <>
          <div className="password-container">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              className="auth-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span onClick={toggleConfirmPasswordVisibility} className="password-toggle">
              <img
                src={showConfirmPassword ? "/assets/eye.png" : "/assets/hidden.png"}
                alt={showConfirmPassword ? 'Ocultar senha' : 'Mostrar senha'}
                className="password-icon"
              />
            </span>
          </div>

          <div className="error-message-container">
            {!passwordsMatch && (
              <p className="error-message">Passwords do not match.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AuthForm;