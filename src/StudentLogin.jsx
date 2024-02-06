
import './css/StudentLogin.css';
import logo from './images/logo.png';
import CommonInput from './CommonInput';
import CtaButton from './CtaButton';
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";


const inputField = [ 'Name', 'College', 'Email ID', 'Password' ];

const StudentLogin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let navigate = useNavigate();
  const handleLogin = () => {
  
      setIsLoggedIn(true);
       navigate("/student-dashboard");
   
   };
 return (
    <div className="user-login">
      <div className="logo">
        <img src={logo} alt="aankh-logo" />
      </div>
      <div className="login-form">
        <h1 className="title-heading">User Login</h1>
        <div className="input-fields">
          {inputField.map((item) => (
            <CommonInput placeholderText={item} />
          ))}
        </div>
        <a href="/student-dashboard">
          <CtaButton text="Login" onClick={handleLogin}/>
        </a>
      </div>
    </div>
 );
};

export default StudentLogin;
