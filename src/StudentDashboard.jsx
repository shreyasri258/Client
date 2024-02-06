import React, { useState } from "react";
import Card from "@mui/material/Card";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CreateExamPopup from "./components/CreateExamPopup";
import { Link } from "react-router-dom";

const StudentDashboard = () => {
  const [value, setValue] = useState(0);
  const [showCreateExamPopup, setShowCreateExamPopup] = useState(false);
  const [examData, setExamData] = useState([
    {
      googleFormLink: 'https://docs.google.com/forms/d/example-form-1',
      examTitle: 'Mathematics Quiz',
      examDuration: '60 minutes',
    },
    {
      googleFormLink: 'https://docs.google.com/forms/d/example-form-2',
      examTitle: 'Science Test',
      examDuration: '45 minutes',
    },
    // Add more initial exam data as needed
  ]);

  const handleCreateExamClick = () => {
    setShowCreateExamPopup(true);
  };

  const handleCloseCreateExamPopup = () => {
    setShowCreateExamPopup(false);
  };

  const handleSubmitCreateExam = (newExam) => {
    setExamData([...examData, newExam]);
    handleCloseCreateExamPopup();
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleDeleteExam = (index) => {
    const updatedExamData = [...examData];
    updatedExamData.splice(index, 1);
    setExamData(updatedExamData);
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
              <Link to={{ pathname: "/exam", state: exam }} style={{ textDecoration: "none" }}>
                <Button variant="contained" color="primary" style={{ marginBottom: 8 }}>
                  Start Test
                </Button>
              </Link>
              <Button variant="contained" color="error" style={{ marginBottom: 8, marginLeft: 8 }} onClick={() => handleDeleteExam(index)}>
                Delete
              </Button>
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

export default StudentDashboard;
