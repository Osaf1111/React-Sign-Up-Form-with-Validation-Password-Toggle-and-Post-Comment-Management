import React, { useState } from 'react';
import './Signup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const validatePassword = () => {
    const validationErrors = [];

    if (password.length < 8) {
      validationErrors.push('Password must be at least 8 characters long.');
    }

    if (!/\d/.test(password)) {
      validationErrors.push('Password must contain at least one number.');
    }

    if (password !== confirmPassword) {
      validationErrors.push('Passwords do not match.');
    }

    return validationErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validatePassword();

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
    } else {
      console.log('Sign Up:', { name, email, password });
      setShowPopup(true);
      // Reset the form fields
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      // Clear validation errors
      setErrors([]);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    // Clear errors related to password
    setErrors([]);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    // Clear errors related to confirm password
    setErrors([]);
  };

  return (
    <div className="signin-container">
      <form className="signin-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <div className="mb-3">
          <label htmlFor="signupName" className="form-label">Name</label>
          <input
            type="text"
            id="signupName"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="signupEmail" className="form-label">Email address</label>
          <input
            type="email"
            id="signupEmail"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3 position-relative">
          <label htmlFor="signupPassword" className="form-label">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="signupPassword"
            className="form-control"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <FontAwesomeIcon
            icon={showPassword ? faEyeSlash : faEye}
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>

        <div className="mb-3 position-relative">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            className="form-control"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
          <FontAwesomeIcon
            icon={showConfirmPassword ? faEyeSlash : faEye}
            className="password-toggle"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          />
        </div>

        {errors.length > 0 && (
          <div className="alert alert-danger">
            {errors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}

        <button type="submit" className="btn btn-primary w-100">Sign Up</button>
        <p className="mt-3">Already have an account? <a href="/signin">Sign In</a></p>
      </form>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <img src="https://png.pngtree.com/png-vector/20221215/ourmid/pngtree-green-check-mark-png-image_6525691.png" alt="Check Mark" className="popup-image"/>
            <p className="popup-message">Sign Up Successfully</p>
            <button className="popup-close" onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
