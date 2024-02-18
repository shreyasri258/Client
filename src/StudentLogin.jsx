
import './css/StudentLogin.css';
import Icon from './images/Icon.png';
import { useNavigate } from "react-router-dom";
import React, { useState,useRef } from "react";
import Button from './components/Button';

const inputField = [ 'Name', 'College', 'Email ID', 'Password' ];

const StudentLogin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [college, setCollege] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
      setIsLoggedIn(true);
       navigate("/student-dashboard");
   
   };

   const isFormValid = name.trim().length > 0 &&
   college.trim().length > 0 &&
   email.trim().length > 0 &&
   password.trim().length > 0;

 return (
    <div className="user-login">
      <div className="logo">
        <img src={Icon} alt="proctorpal-logo" />
      </div>
      <div className="login-form">
        <h1 className="title-heading">Examinee Login</h1>
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
          <button onClick={handleLogin} disabled={!isFormValid}>Login</button>

      </div>
    </div>
 );
};

export default StudentLogin;
