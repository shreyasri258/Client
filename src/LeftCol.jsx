import React from 'react';
import WebLiveCapture from '../src/weblivecapture/WebLiveCapture.jsx';

const LeftColumn = ({ studentName, studentEmail }) => (
    <div className="left-column">
        <div className="image-capture">
            <WebLiveCapture />
        </div>
       
        
    </div>
);

export default LeftColumn;
