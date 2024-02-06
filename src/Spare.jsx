import * as React from "react";
import  { useState } from "react";
import Card from "@mui/material/Card";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";
// import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
// import Box from "@mui/material/Box";
// import IconButton from "@mui/material/IconButton";
// import CloseIcon from "@mui/icons-material/Close";
// import TextField from "@mui/material/TextField";
// import FormControl from "@mui/material/FormControl";
// import InputLabel from "@mui/material/InputLabel";
import CreateExamPopup from "./components/CreateExamPopup";


const AdminDashboard = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [value, setValue] = React.useState(0);
  const [examTitle, setExamTitle] = React.useState("");
  const [googleFormLink, setGoogleFormLink] = React.useState("");
  const [examDuration, setExamDuration] = React.useState("");
  const [focused, setFocused] = React.useState(false);
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
    {
      googleFormLink: 'https://docs.google.com/forms/d/example-form-3',
      examTitle: 'Literature Exam',
      examDuration: '90 minutes',
    },
    {
      googleFormLink: 'https://docs.google.com/forms/d/example-form-4',
      examTitle: 'History Quiz',
      examDuration: '30 minutes',
    },
    {
      googleFormLink: 'https://docs.google.com/forms/d/example-form-5',
      examTitle: 'Computer Science Test',
      examDuration: '75 minutes',
    },
  ]);
  const handleCreateExamClick = () => {
    setShowCreateExamPopup(true);
  };

  const handleCloseCreateExamPopup = () => {
    setShowCreateExamPopup(false);
  };

  const handleSubmitCreateExam = (e) => {
    e.preventDefault();
    // Add logic to handle form submission here
    handleCloseCreateExamPopup();
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { examTitle, googleFormLink, examDuration };
    const response = await fetch("/api/tests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      console.error("Failed to create test");
      return;
    }
    const result = await response.json();
    console.log("Test created successfully", result);
    setExamData([...examData, data]);
    handleClose();
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
          label="Results"
          value={1}
          // Add your onClick event or other logic for this tab
        />
        <Tab
          sx={{
            mx: 12,
            display: "flex",
            justifyContent: "center",
          }}
          label="Exam History"
          value={2}
          // Add your onClick event or other logic for this tab
        />
        <Tab
          sx={{
            mx: 12,
            display: "flex",
            justifyContent: "center",
          }}
          label="Log Out"
          value={3}
          // Add your onClick event or other logic for this tab
        />
      </Tabs>
      

       {/* Mapping over examData to display each object in a card */}
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
          <div style={{ marginLeft: "auto", display: "flex", flexDirection: "row" }}>
          <Button variant="contained" color="primary" style={{ marginBottom: 8 }}>
            Start Test
          </Button>
          <Button variant="contained" color="error" style={{ marginBottom: 8 }}>
            End Test
          </Button>
          </div>
        </Card>
      ))}
</div>
{showCreateExamPopup && (
        <CreateExamPopup
          onSubmit={handleSubmitCreateExam}
          onClose={handleCloseCreateExamPopup}
          examTitle={examTitle}
          setExamTitle={setExamTitle}
          googleFormLink={googleFormLink}
          setGoogleFormLink={setGoogleFormLink}
          examDuration={examDuration}
          setExamDuration={setExamDuration}
        />
      )}
      
    </Card>
  );
};

export default AdminDashboard;
