import './css/StudentLogin.css';
import Icon from './images/Icon.png';
import CommonInput from './CommonInput';
import CtaButton from './CtaButton';
import { useNavigate } from "react-router-dom";
import React, { useState, useContext } from "react";
import { StudentContext } from "./contextCalls/studentContext/StudentContext";
import { login } from "./contextCalls/studentContext/apiCalls";
import {useRef } from "react";
import Button from './components/Button';


const inputField = ['email', 'username', 'password', 'institutionName'];

const StudentLogin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { dispatch } = useContext(StudentContext);
  const [inputValues, setInputValues] = useState({});
  let navigate = useNavigate();
  
  const handleInputChange = (fieldName, event) => {
    const value= event.target.value;
    setInputValues(prevValues => ({
      ...prevValues,
      [fieldName]: value,
    }));
  };

  const handleLogin = async(e) => {
      e.preventDefault();
      // console.log('Input field values:', inputValues);
      try{
      login( inputValues , dispatch);
      setIsLoggedIn(true);
      } catch(err){
        console.log(err);
      }
      // navigate("/student-dashboard");
      console.log('Input field values:', inputValues);
     


   const isFormValid = name.trim() !== "" && college.trim() !== "" && email.trim() !== "" && password.trim() !== "";

 return (
    <div className="user-login">
      <div className="logo">
        <img src={Icon} alt="proctorpal-logo" />
      </div>
      <div className="login-form">
        <h1 className="title-heading">Examinee Login</h1>
        <div className="input-fields">

     
       
 {inputField.map((item) => {
            let type;
            switch (item) {
              case "Email ID":
                type = "email";
                break;
              case "Name":
                type = "text";
                break;
              case "Password":
                type = "password";
                break;
              case "College":
                type = "text";
                break;
              default:
                type = "text";
            }
            return (
              <CommonInput
                key={item}
                placeholderText={item}
//                 value={inputValues[index]}
                onChange={(value) => handleInputChange(item, value)}
                type={type} // Specify the type for each input field
              />
            );
          })}
        </div>
          <Button onClick={handleLogin} disabled={!isFormValid}>Login</Button>

      </div>
    </div>
 );
};
export default StudentLogin;