import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CreateExamPopup from "./components/CreateExamPopup";
import { Link } from "react-router-dom";
import Icon from '../src/images/Icon.png'

const AdminDashboard = () => {
  const [value, setValue] = useState(0);
  const [showCreateExamPopup, setShowCreateExamPopup] = useState(false);
  const [examData, setExamData] = useState([]);

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
          borderBottom: "0.2px solid black",
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
      </Tabs>

      <div style={{ position: "fixed", top: "calc(5rem + 10px)", left: 0, right: 0, overflowY: "auto", height: "calc(100% - 5rem - 10px)" }}>
        {examData.map((exam, index) => (
          <Card key={index} sx={{ padding: 2, marginTop: 2 , position: "relative" }}>
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
