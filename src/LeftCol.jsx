import React from 'react';
import WebLiveCapture from '../src/weblivecapture/WebLiveCapture.jsx';

const LeftColumn = ({ studentName, studentEmail }) => (
    <div className="left-column">
        <div className="image-capture">
            <WebLiveCapture />
        </div>
        <div className="exam-details">
            <h3 className="title-heading">Student Details</h3>
            <div className="details">
                <h4 className="student-id">Student Name: {studentName}</h4>
                <h4 className="student-email">Student Email: {studentEmail}</h4>
            </div>
        </div>
    </div>
);

export default LeftColumn;
