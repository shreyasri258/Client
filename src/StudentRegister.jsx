
import React, { useState, useRef } from 'react';
import './css/UserRegister.css';
import CommonInput from './CommonInput';
import { Link } from 'react-router-dom';
import Webcam from 'react-webcam';
import axios from "axios";
const inputField = ['email', 'username', 'password', 'institutionName'];
import Icon from "./images/Icon.png";


const inputField = ['email', 'username', 'password', 'institutionName'];

const StudentRegister = () => {
  const [showModal, setShowModal] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const webcamRef = useRef(null);
  
// Initialize state for each input field
  const [inputValues, setInputValues] = useState(inputField.map(() => ""));

  const handleRegister = async (e) => {
    e.preventDefault();
    // Access inputValues to get the values of the input fields
    try {
      await axios.post("http://localhost:8800/Server/user/register",  inputValues );
      // history.push("/login");
    } catch (err) {
      console.error('Registration error:', err);
    }
    console.log('Input field values:', inputValues);

  

  // Function to handle changes to each input field
  const handleInputChange = (fieldName, event) => {
    const value= event.target.value;
    setInputValues(prevValues => ({
      ...prevValues,
      [fieldName]: value,
    }));
  };
  // Function to check if all input fields are filled
  const allFieldsFilled = inputValues.every((value) => value.trim() !== "");

  const capture = () => {

    const imageSrc = webcamRef.current.getScreenshot(); // Capture image from webcam
    setCapturedImage(imageSrc); // Save captured image in base64 format
    webcamRef.current.stream.getTracks().forEach((track) => track.stop()); // Turn off the camera

  };

  const videoConstraints = {
    width: 480,
    height: 360,
    facingMode: "user",
  };

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
//                 value={inputValues[index]}
                onChange={(value) => handleInputChange(item,value)}
                type={type} // Specify the type for each input field
              />
            );
          })}
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
              onUserMedia={() => console.log("user media")}
              minScreenshotHeight={720}
            />

            <button onClick={capture}>Capture Image</button>{" "}
            {/* Button to capture image */}
          </React.Fragment>

        )}
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