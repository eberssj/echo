import React from 'react';
import './Footer.css'; 

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-logo">
        <img src="/assets/logo-branca.png" alt="Logo" />
      </div>
      <p>© 2025 Myspaceber's Company. Nenhum dos direitos reservados.</p>
    </footer>
  );
};

export default Footer;