import React from 'react';
import './css/UserRegister.css';
import logo from './images/logo.png';
import CommonInput from './CommonInput';
import CtaButton from './CtaButton';

const inputField =['Email ID', 'Full Name', 'Password', 'College'];

const StudentRegister = () => {

 return (
    <div className="student-register">
        <div className="logo">
            <img src={logo} alt="aankh-logo" />
        </div>
        <div className="register-form">
            <h1 className="title-heading">Register</h1>
            <div className="input-fields">
                {inputField.map((item) => (
                    <CommonInput placeholderText={item} />
                ))}
            </div>
            <CtaButton text="Register" />
        </div>
    </div>
);

};

export default StudentRegister;
