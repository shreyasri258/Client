import React, { useState, useRef } from 'react';
import './css/UserRegister.css';
import logo from './images/logo.png';
import CommonInput from './CommonInput';
import { Link } from 'react-router-dom';
import Webcam from 'react-webcam'; // Import the Webcam component

const inputField = ['Email ID', 'Full Name', 'Password', 'College'];

const StudentRegister = () => {
  const [showModal, setShowModal] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null); // State to store captured image
  const webcamRef = useRef(null); // Reference to the webcam component

  const handleRegister = async() => {
    // Your registration logic goes here
    // After successful registration, show the modal
    setShowModal(true);
    try {
      await axios.post("user/register", { email,username, password });
      // history.push("/login");
    } catch (err) {}
  };

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot(); // Capture image from webcam
    setCapturedImage(imageSrc); // Save captured image in base64 format
    webcamRef.current.stream.getTracks().forEach(track => track.stop()); // Turn off the camera
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
            <CommonInput key={item} placeholderText={item} />
          ))}
        </div>
        {/* Render the base64 image if available */}
        {capturedImage && <p>Base64 Format: {capturedImage}</p>}
        {/* Render the webcam component or the button to capture image */}
        {!capturedImage && (
          <React.Fragment>
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
            <button onClick={capture}>Capture Image</button> {/* Button to capture image */}
          </React.Fragment>
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
