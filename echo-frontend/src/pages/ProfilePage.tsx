import React, { useState } from 'react';
import Navbar from "../components/Navbar";
import './ProfilePage.css';
import Button from '../components/Button';

const ProfilePage: React.FC = () => {
  const [email, setEmail] = useState<string>('user@example.com');
  const [password, setPassword] = useState<string>('••••••••');
  const [newPassword, setNewPassword] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [showSavePopup, setShowSavePopup] = useState<boolean>(false);

  const handleSendEmail = () => {
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  const handleSave = () => {
    setShowSavePopup(true);
    setTimeout(() => setShowSavePopup(false), 3000);
  };

  return (
    <>
      <Navbar /> 
      <div className="container pages">
        <div className="profile-container">
          <div className="form-container">
            <form>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  readOnly
                  className="input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input"
                />
                <p className="send-code-text">
                  To change your password, request a code via email.
                </p>
                <div className="send-code-button-container">
                  <button
                    type="button"
                    onClick={handleSendEmail}
                    className="send-email-button"
                  >
                    Send Code
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="newPassword">New Password:</label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="input"
                  placeholder="Enter your new password"
                />
              </div>
              <div className="form-group">
                <label htmlFor="code">Insert Code:</label>
                <input
                  type="text"
                  id="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="input"
                  placeholder="Enter the code sent to your email"
                />
              </div>
            </form>
          </div>
        </div>

        {showPopup && (
          <div className="popup">
            <p>To change your password, check your mailbox.</p>
          </div>
        )}

        {showSavePopup && (
          <div className="popup">
            <p>Your changes have been saved successfully!</p>
          </div>
        )}

        <div className="buttons-container">
          <Button text="Save" mode="green" onClick={handleSave} />
          <div className="button-spacing" /> 
          <Button text="Delete Account" mode="red" onClick={() => {}} />
        </div>
      </div>
    </>
  );
};

export default ProfilePage;