import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signin.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function SignIn({ onSignIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (email === 'osafimran@gmail.com' && password === 'osaf1122') {
      if (onSignIn) onSignIn();
      setPopupMessage('Successfully signed in!');
      setShowPopup(true);
    } else {
      setPopupMessage('Your email or password is incorrect.');
      setShowPopup(true);
    }
  };

  const handleClosePopup = () => {
    if (popupMessage === 'Successfully signed in!') {
      navigate('/posts');
    }
    setShowPopup(false);
  };

  return (
    <div className="signin-container">
      <form className="signin-form" onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        <div className="mb-3">
          <label htmlFor="signinEmail" className="form-label">Email address</label>
          <input
            type="email"
            id="signinEmail"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3 password-container">
          <label htmlFor="signinPassword" className="form-label">Password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              id="signinPassword"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span 
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>
        <button type="submit" className="btn btn-primary w-100">Sign In</button>

        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-content">
            <img 
                src={
                  popupMessage === 'Success' 
                  ? 'https://png.pngtree.com/png-vector/20221215/ourmid/pngtree-green-check-mark-png-image_6525691.png' 
                  : 'https://png.pngtree.com/png-vector/20221215/ourmid/pngtree-green-check-mark-png-image_6525691.png' // Add your fallback image URL here
                } 
                alt="Notification" 
                className="popup-image" 
              />

              <p className="popup-message">{popupMessage}</p>
              <button 
                className={`btn ${popupMessage === 'Successfully signed in!' ? 'btn-success' : 'popup-close'}`} 
                onClick={handleClosePopup}
              >
                {popupMessage === 'Successfully signed in!' ? 'OK' : 'Close'}
              </button>
            </div>
          </div>
        )}
        <div className="signup-link">
          <p>Don't have an account? <a href="/signup">Sign Up</a></p>
        </div>
      </form>
    </div>
  );
}
