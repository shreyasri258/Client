import React, { useState } from 'react';
import './css/UserRegister.css';
import logo from './images/logo.png';
import CommonInput from './CommonInput';
import { Link } from 'react-router-dom';

const inputField = ['Email ID', 'Full Name', 'Password', 'College'];

const AdminRegister = () => {
  const [showModal, setShowModal] = useState(false);

  const handleRegister = () => {
    // Your registration logic goes here
    // After successful registration, show the modal
    setShowModal(true);
  };

  return (
    <div className="user-register">
      <div className="logo">
        <img src={logo} alt="aankh-logo" />
      </div>
      <div className="register-form">
        <h1 className="title-heading">Examiner Register</h1>
        <div className="input-fields">
          {inputField.map((item) => (
            <CommonInput key={item} placeholderText={item} />
          ))}
        </div>
        <button onClick={handleRegister}>Register</button>
      </div>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <p>Registration successful!</p>
            <div className="modal-buttons">
              <Link to="/teacher-login">
                <button>Login</button>
              </Link>
              <Link to="/">
                <button>Home Page</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminRegister;
