import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CreateExamPopup from "./components/CreateExamPopup";
import { Link } from "react-router-dom";

const openFullScreenExam = (state) => {
  const url = new URL(window.location.origin + '/exam');
  url.searchParams.set('title', state.examTitle);
  url.searchParams.set('duration', state.examDuration);
  url.searchParams.set('url', state.googleFormLink);

  const windowFeatures = 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,width=screen.availWidth,height=screen.availHeight,left=0,top=0';
  window.open(url.toString(), '_blank', windowFeatures);
};



const StudentDashboard = () => {
  const [value, setValue] = useState(0);
  const [showCreateExamPopup, setShowCreateExamPopup] = useState(false);
  const [examData, setExamData] = useState(() => {
    
    try {
      
      const storedData = JSON.parse(localStorage.getItem("examData"));
      return Array.isArray(storedData) ? storedData : [];
    } catch (error) {
      console.error("Error parsing exam data from localStorage:", error);
      return [];
    }
  });
  
  // Add more initial exam data as needed

  useEffect(() => {
    localStorage.setItem("examData", JSON.stringify(examData));
  }, [examData]);

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
       <Tab
          sx={{
            mx: 12,
            display: "flex",
            justifyContent: "center",
          }}
          label="History"
        />
        <Tab
          sx={{
            mx: 12,
            display: "flex",
            justifyContent: "center",
          }}
          label="Results"
        />
      </Tabs>

      <div style={{ position: "fixed", top: "calc(5rem + 10px)", left: 0, right: 0, overflowY: "auto", height: "calc(100% - 5rem - 10px)" }}>
        {examData.map((exam, index) => (
          <Card key={index} sx={{ padding: 2, marginTop: 2 , position: "relative" }}>
            <Typography variant="h6" gutterBottom>
              {exam.examTitle}
            </Typography>
            
            <Typography variant="body1" gutterBottom>
              Exam Duration: {`${exam.examDuration} minutes`}
            </Typography>
            <div style={{ marginLeft: "auto", display: "flex", flexDirection: "row", alignItems: "flex-start" }}>
              <Link >
              <Button variant="contained" color="primary" style={{ marginBottom: 8 }} onClick={() => openFullScreenExam(exam)}>
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
