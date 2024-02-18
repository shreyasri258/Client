import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CreateExamPopup from "./components/CreateExamPopup";
import { Link } from "react-router-dom";
import Icon from '../src/images/Icon.png';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import '../src/css/userDashboard.css'; 

const AdminDashboard = () => {
  const [value, setValue] = useState(0);
  const [showCreateExamPopup, setShowCreateExamPopup] = useState(false);
  const [examData, setExamData] = useState([]);
  const [open, setOpen] = useState(false);
const [adminDetails, setAdminDetails] = useState({ name: '', email: '' });

const handleOpenDetails = () => {
  // Set the admin details here. This is just an example.
  setAdminDetails({ name: 'John Doe', email: 'john.doe@example.com' });
  setOpen(true);
};

const handleCloseDetails = () => {
  setOpen(false);
};
  // Retrieve exam data from local storage on component mount
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("examData")) || [];
    setExamData(storedData);
  }, []);

  const handleCreateExamClick = () => {
    setShowCreateExamPopup(true);
  };

  const handleCloseCreateExamPopup = () => {
    setShowCreateExamPopup(false);
  };

  const handleSubmitCreateExam = (newExam) => {
    // Update exam data state
    setExamData([...examData, newExam]);
    // Update local storage with new exam data
    localStorage.setItem("examData", JSON.stringify([...examData, newExam]));
    handleCloseCreateExamPopup();
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleDeleteExam = (index) => {
    // Remove exam at specified index from the exam data state
    const updatedExamData = [...examData];
    updatedExamData.splice(index, 1);
    setExamData(updatedExamData);
    // Update local storage with updated exam data
    localStorage.setItem("examData", JSON.stringify(updatedExamData));
  };

  const handlePostExam = (index) => {
    // Mark the exam as posted
    const updatedExamData = [...examData];
    updatedExamData[index].posted = true;
    setExamData(updatedExamData);
    // Update local storage with updated exam data
    localStorage.setItem("examData", JSON.stringify(updatedExamData));
  
    // Add the posted exam to the shared location
    const postedExam = updatedExamData[index];
    const postedExams = JSON.parse(localStorage.getItem("postedExams")) || [];
    localStorage.setItem("postedExams", JSON.stringify([...postedExams, postedExam]));
  };

  const handleRemoveExam = (index) => {
    const updatedExamData = [...examData];
    updatedExamData.splice(index, 1);
    setExamData(updatedExamData);
    localStorage.setItem("examData", JSON.stringify(updatedExamData));
  
    // Remove the exam from the shared location
    const postedExams = JSON.parse(localStorage.getItem("postedExams")) || [];
    const filteredPostedExams = postedExams.filter((_, i) => i !== index);
    localStorage.setItem("postedExams", JSON.stringify(filteredPostedExams));
  };
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width:  400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow:  24,
    p:  4,
  };
  

  return (
    
    <Card>
        
      <Tabs
        value={value}
        onChange={handleChange}
        sx={{
          height: "auto",
          position: "fixed",
          top: 5,
          left: 0,
          right: 0,
          marginLeft:3,
          marginRight:3,
          border: "0.29px solid black",
          borderStyle:"dotted",
          borderRadius:3

        
        }}
        aria-label="tabs example"
      >
        <a href="/">
  <img src={Icon} alt="Logo" className="logo-image" style={{ maxWidth: '50px', maxHeight: '50px' }} />
</a>
        <Tab
          sx={{
            mx: 12,
            display: "flex",
            justifyContent: "center",
          }}
          label="Create Exam"
          onClick={handleCreateExamClick}
        />
        {/* Add other tabs as needed */}
        <Button onClick={handleOpenDetails}
          variant="contained"
          color="primary"
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            margin: 1, // Adjust margin as needed
            borderRadius: "15px",
            boxShadow: '0  4px  8px rgba(0,  0,  0,  0.2)'
          }}
        >
          Details
        </Button>
        <Modal
  open={open}
  onClose={handleCloseDetails}
  aria-labelledby="admin-details-modal"
  aria-describedby="admin-details-description"
>
  <Box sx={style}>
    <Typography id="admin-details-modal" variant="h6" component="h2">
      Admin Details
    </Typography>
    <Typography id="admin-details-description" sx={{ mt:  2 }}>
      Name: {adminDetails.name} <br />
      Email: {adminDetails.email}
    </Typography>
    <IconButton
    aria-label="close"
    onClick={handleCloseDetails}
    sx={{
      position: 'absolute',
      right:  8,
      top:  8,
      color: (theme) => theme.palette.grey[500],
    }}
  >
    <CloseIcon />
  </IconButton>
  </Box>
</Modal>
      </Tabs>

      <div style={{ position: "fixed", top: "calc(5rem + 10px)", left: 0, right: 0, overflowY: "auto", height: "calc(100% - 5rem - 10px)" }}>
        {examData.map((exam, index) => (
          <Card key={index} sx={{ padding: 2, marginTop: 2,marginLeft:4,marginRight:4 , position: "relative" }}>
            <Typography variant="h6" gutterBottom>
              {exam.examTitle}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Google Form Link: {exam.googleFormLink}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Exam Duration: {exam.examDuration}
            </Typography>
            <div style={{ marginLeft: "auto", display: "flex", flexDirection: "row", alignItems: "flex-start" }}>
              {exam.posted ? (
                <Button variant="contained" color="error" style={{ marginBottom: 8 }} onClick={() => handleRemoveExam(index)}>
                  Remove
                </Button>
              ) : (
                <Button variant="contained" color="success" style={{ marginBottom: 8 }} onClick={() => handlePostExam(index)}>
                  Post
                </Button>
              )}
            </div>
            
          </Card>
        ))}
      </div>

      {showCreateExamPopup && (
        <CreateExamPopup
          onSubmit={handleSubmitCreateExam}
          onClose={handleCloseCreateExamPopup}
        />
      )}
    </Card>
  );
};

export default AdminDashboard;
