import './css/TeacherLogin.css';
import Icon from './images/Icon.png';
import CommonInput from './CommonInput';
import CtaButton from './CtaButton';
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

const inputField = [ 'Name', 'College', 'Email ID', 'Password' ];

const TeacherLogin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let navigate = useNavigate();
  const handleLogin = () => {
  
      setIsLoggedIn(true);
       navigate("/admin-dashboard");
   
   };
   
  return (
    <div className="user-login">
      <div className="logo">
        <img src={Icon} alt="proctorpal-logo" />
      </div>
      <div className="login-form">
        <h1 className="title-heading">Examiner Login</h1>
        <div className="input-fields">
          {inputField.map((item) => (
            <CommonInput placeholderText={item} />
          ))}
        </div>
        <a href="/admin-dashboard">
          <CtaButton text="Login" onClick={handleLogin}/>
        </a>
      </div>
    </div>
 );
};

export default TeacherLogin;
