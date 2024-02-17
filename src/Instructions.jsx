import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';

const StyledBox = styled(Box)(({ theme }) => ({
  maxWidth: 800,
  margin: 'auto',
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[3],
  backgroundColor: theme.palette.background.paper,
  textAlign: 'left',
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const StyledList = styled('ul')(({ theme }) => ({
  paddingLeft: theme.spacing(4),
  marginBottom: theme.spacing(4),
}));

const StyledListItem = styled('li')(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

const Instructions = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const examTitle = params.get("title");
  const examDuration = params.get("duration");
  const googleFormLink = params.get("url");

  const [isChecked, setIsChecked] = useState(false);
  const [isVideoPermissionGranted, setIsVideoPermissionGranted] = useState(false);
  const [isAudioPermissionGranted, setIsAudioPermissionGranted] = useState(false);

  useEffect(() => {
    // Check for video and audio permissions here
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(() => {
        setIsVideoPermissionGranted(true);
        setIsAudioPermissionGranted(true);
      })
      .catch((err) => {
        setIsVideoPermissionGranted(false);
        setIsAudioPermissionGranted(false);
      });
  }, []);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleStartExam = () => {
    const url = `/exam?title=${encodeURIComponent(examTitle)}&duration=${encodeURIComponent(examDuration)}&url=${encodeURIComponent(googleFormLink)}`;
    const windowFeatures = 'fullscreen=yes,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,left=0,top=0';
    const newWindow = window.open(url, '_blank', windowFeatures);

    if (newWindow) {
        newWindow.moveTo(0, 0);
        newWindow.resizeTo(window.screen.availWidth, window.screen.availHeight);
        newWindow.addEventListener('focus', disableMainWindow);
        newWindow.addEventListener('beforeunload', enableMainWindow);
        disableWindowOpen();
    }
  };

  const disableWindowOpen = () => {
    window.open = () => null;
  };

  const enableWindowOpen = () => {
    window.open = windowOpenBackup;
  };

  const windowOpenBackup = window.open;

  const disableMainWindow = () => {
      window.disabled = true;
  };

  const enableMainWindow = () => {
      window.disabled = false;
  };

  return (
    <StyledBox>
      <StyledTitle variant="h4">Instructions for the Exam</StyledTitle>
      <StyledList>
        <StyledListItem>Ensure that you are in a quiet and well-lit room for the duration of the exam.</StyledListItem>
        {/* Add more instructions here */}
        <StyledListItem>Ensure that you are in a quiet and well-lit room for the duration of the exam.</StyledListItem>
        <StyledListItem>Make sure your webcam is positioned to capture your face and surroundings clearly throughout the exam.</StyledListItem>
        <StyledListItem>Close all unnecessary applications, browser tabs, and windows on your computer before starting the exam.</StyledListItem>
        <StyledListItem>Keep your government-issued photo ID ready for identity verification.</StyledListItem>
        <StyledListItem>Do not use any unauthorized materials, such as notes, textbooks, or electronic devices, during the exam.</StyledListItem>
        <StyledListItem>Avoid talking, looking away from the screen, or making sudden movements that may be flagged as suspicious behavior.</StyledListItem>
        <StyledListItem>Do not attempt to communicate with anyone else or seek outside assistance during the exam.</StyledListItem>
        <StyledListItem>Follow all instructions provided by the proctor or exam supervisor throughout the duration of the exam.</StyledListItem>
        <StyledListItem>If you experience any technical difficulties or interruptions during the exam, notify the proctor immediately.</StyledListItem>
        <StyledListItem>Complete the exam within the allotted time and submit your answers as instructed by the exam guidelines.</StyledListItem>
    
      </StyledList>
      <Divider />
      <Checkbox
        id="acknowledgeCheckbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <label htmlFor="acknowledgeCheckbox">I acknowledge that I have read and understood the instructions.</label>
      <StyledButton
        onClick={handleStartExam}
        disabled={!isChecked || !isVideoPermissionGranted || !isAudioPermissionGranted}
        variant="contained"
        color="primary"
        fullWidth
      >
        Start Exam
      </StyledButton>
    </StyledBox>
  );
};

export default Instructions;
