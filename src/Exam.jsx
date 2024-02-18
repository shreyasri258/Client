import React, { useState, useEffect, useRef } from 'react';
import Timer from "../src/timer/Timer.jsx";
import WebLiveCapture from '../src/weblivecapture/WebLiveCapture.jsx';
import '../src/css/Exam.css';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert as Swal

const Exam = () => {
    const location = useLocation(); // Use useLocation hook to get location object
    const params = new URLSearchParams(location.search);
    const examTitle = params.get("title");
    const duration = parseInt(params.get("duration")); // Parse duration as integer
    const formLink = params.get("url");
    const studentID = '1902112'; // Assuming this is a static value
    const studentEmail = 'tusharnankani3@gmail.com';

    const fullscreenRef = useRef(null);
    const countdownRef = useRef(null);

    const [warningCnt, setWarningCnt] = useState(0);
    const [isDevToolsOpen, setIsDevToolsOpen] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(true);
    const [timerExpired, setTimerExpired] = useState(false); // State to track timer expiration

    const handleFullscreen = () => {
        if (fullscreenRef.current) {
            const element = document.documentElement;

            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen();
            } else if (element.msRequestFullscreen) {
                element.msRequestFullscreen();
            }
        }
    };

    useEffect(() => {
        // Start the countdown timer when the component mounts
        countdownRef.current = setTimeout(() => {
            setTimerExpired(true);
            window.close(); // Close the window when the timer expires
        }, duration * 60 * 1000); // Convert duration to milliseconds

        // Cleanup function to clear the timeout when the component unmounts
        return () => clearTimeout(countdownRef.current);
    }, [duration]);

    useEffect(() => {
        const devToolsChangeHandler = (event) => {
            if (event.detail.isOpen) {
                setWarningCnt((prevWarningCnt) => prevWarningCnt + 1);
                setIsDevToolsOpen(true);
            }

            if (!isDevToolsOpen) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Warning',
                    text: 'Your exam will terminate. Please close devtools.'
                });
                disableForm();
            } else {
                enableForm();
            }

            terminateExam();
        };

        window.addEventListener('devtoolschange', devToolsChangeHandler);

        return () => {
            window.removeEventListener('devtoolschange', devToolsChangeHandler);
        };
    }, [isDevToolsOpen]);

    useEffect(() => {
        const keyDownHandler = (event) => {
            if ((event.ctrlKey && event.shiftKey && event.key === 'I') || (event.key === 'F12')) {
                event.preventDefault();
                setWarningCnt((prevWarningCnt) => prevWarningCnt + 1);
                Swal.fire({
                    icon: 'warning',
                    title: 'Warning',
                    text: 'Opening developer tools is not allowed during the exam.'
                });
                disableForm();
            }
        };

        document.addEventListener('keydown', keyDownHandler);

        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    }, []);

    useEffect(() => {
        const copyHandler = (event) => {
            event.preventDefault();
            setWarningCnt((prevWarningCnt) => prevWarningCnt + 1);
            Swal.fire({
                icon: 'warning',
                title: 'Warning',
                text: 'Copying content is not allowed during the exam.'
            });
            disableForm();
        };

        document.addEventListener('copy', copyHandler);

        return () => {
            document.removeEventListener('copy', copyHandler);
        };
    }, []);

    useEffect(() => {
        const contextMenuHandler = (event) => {
            event.preventDefault();
        };

        document.addEventListener('contextmenu', contextMenuHandler);

        return () => {
            document.removeEventListener('contextmenu', contextMenuHandler);
        };
    }, []);

    useEffect(() => {
        const visibilityChangeHandler = () => {
            if (document.hidden) {
                setWarningCnt((prevWarningCnt) => prevWarningCnt + 1);
                Swal.fire({
                    icon: 'warning',
                    title: 'Warning',
                    text: 'You switched tabs. Please return to the exam.'
                });
                disableForm();
            }
        };

        document.addEventListener('visibilitychange', visibilityChangeHandler);

        return () => {
            document.removeEventListener('visibilitychange', visibilityChangeHandler);
        };
    }, []);

    function disableForm() {
        // Implement disable form logic here
    }

    function enableForm() {
        // Implement enable form logic here
    }

    function terminateExam() {
        if (warningCnt > 5) {
            disableForm();
            Swal.fire({
                icon: 'error',
                title: 'Exam Terminated',
                text: 'Your exam has been terminated due to multiple warnings.'
            }).then(() => {
                setTimeout(() => window.close(), 3000); // Close the window after 3 seconds
            });
        }
    }

    // TO EMBED
    let embeddedFormLink = formLink + '?embedded=true';

    return (
        <div className="exam-wrapper">
            <button className='fullscreen-button' onClick={handleFullscreen}>Make Fullscreen</button>
            <div ref={fullscreenRef}></div>
            <div className="exam-container">

                <div className="left-column">
                    <div className="image-capture">
                        <WebLiveCapture />
                    </div>
                    <div className="exam-details">
                        <h3 className="title-heading">Student Details</h3>
                        <div className="details">
                            <h4 className="student-id">Student ID: {studentID}</h4>
                            <h4 className="student-email">Student Email: {studentEmail}</h4>
                        </div>
                    </div>
                </div>

                <div className="embedded-form">
                    <div id="form-blur" className="form">
                        <h2 className="title-heading">{examTitle}</h2> {/* Render exam title here */}
                        <iframe title={examTitle} className="form-link" src={embeddedFormLink}>
                            Form
                        </iframe>
                        <div className="responsive-message">
                            <h1>Please join via a Laptop/PC for the best performance</h1>
                        </div>
                    </div>
                </div>

                <div className="timer">
                    <Timer initialMinute={duration} />
                </div>
            </div>
        </div>
    );
};

export default Exam;
