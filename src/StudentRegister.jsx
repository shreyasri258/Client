import React, { useState, useRef } from 'react';
import './css/UserRegister.css';
import CommonInput from './CommonInput';
import { Link } from 'react-router-dom';
import Icon from "./images/Icon.png";

const inputField = ['Email ID', 'Name', 'Password', 'College'];

const StudentRegister = () => {
  const [showModal, setShowModal] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [inputValues, setInputValues] = useState({
    'Email ID': '',
    'Name': '',
    'Password': '',
    'College': ''
  });

  const startCamera = async () => {
    const constraints = {
      video: {
        facingMode: 'user',
        width: { ideal: 640 },
        height: { ideal: 480 }
      }
    };

    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    videoRef.current.srcObject = stream;
  };

  const handleCapture = () => {
    const context = canvasRef.current.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);

    const image = new Image();
    image.src = canvasRef.current.toDataURL('image/jpeg');
    setCapturedImage(image.src);

    detectFace(image);
  };

  const detectFace = (image) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
  
    // Wait for the image to load before getting its dimensions
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
  
      // Draw the image on the canvas
      context.drawImage(image, 0, 0, image.width, image.height);
  
      // Get the image data
      const imageData = context.getImageData(0, 0, image.width, image.height);
  
      // Example: count pixels with non-zero alpha channel as "face detected"
      let count = 0;
      for (let i = 0; i < imageData.data.length; i += 4) {
        if (imageData.data[i + 3] > 0) {
          count++;
        }
      }
  
      if (count > 1000) {
        console.log('Face detected');
      } else {
        console.log('No face detected');
      }
    };
  
    // Set the image source
    image.src = capturedImage;
  };
  
  const handleRegister = (e) => {
    e.preventDefault();
    // Handle registration logic here
    console.log('Registration values:', inputValues);
    setShowModal(true);
  };

  const handleInputChange = (fieldName, value) => {
    setInputValues(prevValues => ({
      ...prevValues,
      [fieldName]: value,
    }));
  };

  const allFieldsFilled = Object.values(inputValues).every((value) => value.trim() !== "");

  return (
    <div className="user-register">
      <div className="logo">
        <img src={Icon} alt="proctorpal-logo" />
      </div>
      <div className="register-form">
        <h1 className="title-heading">Examinee Register</h1>
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
                value={inputValues[item]}
                onChange={(value) => handleInputChange(item, value)}
                type={type}
              />
            );
          })}
        </div>
        {capturedImage && <img src={capturedImage} alt="captured" />}
        <video ref={videoRef} autoPlay playsInline style={{ display: 'none' }} />
        <canvas ref={canvasRef} style={{ display: 'none' }} />
        <button onClick={startCamera}>Start Camera</button>
        <button onClick={handleCapture}>Capture Image</button>
        <button onClick={handleRegister} disabled={!allFieldsFilled}>
          Register
        </button>
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
