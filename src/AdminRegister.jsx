import React from 'react';
import './css/UserRegister.css';
import logo from './images/logo.png';
import CommonInput from './CommonInput';
import CtaButton from './CtaButton';
import { useNavigate } from 'react-router-dom';

const inputField =['Email ID', 'Full Name', 'Password', 'College'];

const AdminRegister = () => {
    const navigate = useNavigate();
    const handleRegister = () => {
        // Perform registration logic here
        // Once registration is successful, redirect to the admin dashboard
        navigate('/');
      };
 return (
    <div className="admin-register">
        <div className="logo">
            <img src={logo} alt="aankh-logo" />
        </div>
        <div className="register-form">
            <h1 className="title-heading">Register</h1>
            <div className="input-fields">
                {inputField.map((item,index) => (
                    <CommonInput key={index} placeholderText={item} />
                ))}
            </div>
            <CtaButton text="Register" onClick={handleRegister} />
        </div>
    </div>
);

};

export default AdminRegister;
