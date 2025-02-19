import React from 'react';
import './Button.css';

interface ButtonProps {
  text: string;
  mode: 'green' | 'red'; 
  onClick: () => void;   
}

const Button: React.FC<ButtonProps> = ({ text, mode, onClick }) => {
  return (
    <button className={`button ${mode}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
