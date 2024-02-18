
import './css/StudentLogin.css';
import logo from './images/logo.png';
import CommonInput from './CommonInput';
import CtaButton from './CtaButton';
import { useNavigate } from "react-router-dom";
import React, { useState, useContext } from "react";
import { StudentContext } from "./contextCalls/studentContext/StudentContext";
import { login } from "./contextCalls/studentContext/apiCalls";


const inputField = ['email', 'username', 'password', 'institutionName'];


const StudentLogin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { dispatch } = useContext(StudentContext);
  const [inputFieldValues, setInputFieldValues] = useState({});
  let navigate = useNavigate();


  const handleInputChange = (fieldName, event) => {
    const value = event.target.value
    setInputFieldValues(prevValues => ({
      ...prevValues,
      [fieldName]: value,
    }));
  };

  const handleLogin = async(e) => {
      e.preventDefault();
      // console.log('Input field values:', inputFieldValues);
      try{
      login( inputFieldValues , dispatch);
      setIsLoggedIn(true);
      } catch(err){
        console.log(err);
      }
      // navigate("/student-dashboard");
      console.log('Input field values:', inputFieldValues);
     
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
            <CommonInput
              key={item}
              placeholderText={item}
              onChange={(value) => handleInputChange(item, value)}
            />
          ))}
        </div>
        
        <button onClick={handleLogin}>Login</button>
       
      </div>
    </div>
 );
};

export default StudentLogin;
