import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const EditExamPopup = ({ exam, onClose, onSubmit }) => {
  const [editedExam, setEditedExam] = useState(exam);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedExam((prevExam) => ({
      ...prevExam,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    onSubmit(editedExam);
    onClose();
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Edit Exam Details</DialogTitle>
      <DialogContent>
        <TextField
          name="examTitle"
          label="Exam Title"
          value={editedExam.examTitle}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="googleFormLink"
          label="Google Form Link"
          value={editedExam.googleFormLink}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="examDuration"
          label="Exam Duration"
          value={editedExam.examDuration}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>Save Changes</Button>
      </DialogContent>
    </Dialog>
  );
};

export default EditExamPopup;
