import React, { useState, useRef } from 'react';
import './css/UserRegister.css';
import logo from './images/logo.png';
import CommonInput from './CommonInput';
import { Link } from 'react-router-dom';
import Webcam from 'react-webcam';
import axios from "axios";
const inputField = ['email', 'username', 'password', 'institutionName'];

const StudentRegister = () => {
  const [showModal, setShowModal] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const webcamRef = useRef(null);
  const [inputFieldValues, setInputFieldValues] = useState({});

  const handleInputChange = (fieldName, event) => {
    const value = event.target.value
    setInputFieldValues(prevValues => ({
      ...prevValues,
      [fieldName]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    // Access inputFieldValues to get the values of the input fields
    try {
      await axios.post("http://localhost:8800/Server/user/register",  inputFieldValues );
      // history.push("/login");
    } catch (err) {
      console.error('Registration error:', err);
    }
    console.log('Input field values:', inputFieldValues);
    // After successful registration, show the modal
    setShowModal(true);
    
    // Clear the inputFieldValues state after registration if needed
    setInputFieldValues({});
  };

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    webcamRef.current.stream.getTracks().forEach(track => track.stop());
  };

  const videoConstraints = {
    width: 480,
    height: 360,
    facingMode: "user"
  };

  return (
    <div className="user-register">
      <div className="logo">
        <img src={logo} alt="aankh-logo" />
      </div>
      <div className="register-form">
        <h1 className="title-heading">Student Register</h1>
        <div className="input-fields">
          {inputField.map((item) => (
            <CommonInput
              key={item}
              placeholderText={item}
              onChange={(value) => handleInputChange(item, value)}
            />
          ))}
        </div>
        {capturedImage && <p>Base64 Format: {capturedImage}</p>}
        {!capturedImage && (
          <>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="webcam"
              videoConstraints={videoConstraints}
              screenshotQuality={1}
              onUserMediaError={(err) => console.log(err)}
              onUserMedia={() => console.log('user media')}
              minScreenshotHeight={720}
            />
            <button onClick={capture}>Capture Image</button>
          </>
        )}
        <button onClick={handleRegister}>Register</button>
      </div>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <p>Registration successful!</p>
            <div className="modal-buttons">
              <Link to="/student-login">
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

export default StudentRegister;
