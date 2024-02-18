import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import '../src/css/userDashboard.css'; // Import the stylesheet

const UserDashboard = () => {
  const [value, setValue] = useState(0);
  const [examData, setExamData] = useState([]);

  useEffect(() => {
    const storedPostedExams = JSON.parse(localStorage.getItem("postedExams")) || [];
    setExamData(storedPostedExams);
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleStartExam = (exam) => {
    window.location.href = `/instructions?title=${encodeURIComponent(exam.examTitle)}&duration=${encodeURIComponent(exam.examDuration)}&url=${encodeURIComponent(exam.googleFormLink)}`;
    //window.Location.href = `/systemcheck?title=${encodeURIComponent(exam.examTitle)}`
  };

  return (
    <Card>
      <Tabs
        value={value}
        onChange={handleChange}
        className="dashboard-tabs" // Apply className from the stylesheet
        aria-label="tabs example"
      >
        <Tab
          className="dashboard-tab"
          label="Available Exams"
        />
        <Tab
          className="dashboard-tab"
          label="Results"
        />
      </Tabs>

      <div className="dashboard-content">
        {examData.map((exam, index) => (
          <Card key={index} className="exam-card">
            <Typography variant="h6" gutterBottom>
              {exam.examTitle}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Exam Duration: {`${exam.examDuration} minutes`}
            </Typography>
            <div className="button-container">
              <Button variant="contained" color="primary" className="start-button" onClick={() => handleStartExam(exam)}>
                Start Test
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
};

export default UserDashboard;
