import React, { useState } from 'react';
import './css/UserRegister.css';
import Icon from './images/Icon.png';
import CommonInput from './CommonInput';
import { Link } from 'react-router-dom';

const inputField = ['Email ID', 'Full Name', 'Password', 'College'];

const AdminRegister = () => {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [college, setCollege] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isFormValid = name.trim().length > 0 &&
   college.trim().length > 0 &&
   email.trim().length > 0 &&
   password.trim().length > 0;

  const handleRegister = () => {
    // Your registration logic goes here
    // After successful registration, show the modal
    setShowModal(true);
  };

  return (
    <div className="user-register">
      <div className="logo">
        <img src={Icon} alt="proctorpal-logo" />
      </div>
      <div className="register-form">
        <h1 className="title-heading">Examiner Register</h1>
        <div className="input-fields">
        <input
          type="text"
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={college}
          placeholder="College"
          onChange={(e) => setCollege(e.target.value)}
        />
        <input
          type="email"
          value={email}
          placeholder="Email ID"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        </div>
        <button onClick={handleRegister} disabled={!isFormValid}>Register</button>
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
