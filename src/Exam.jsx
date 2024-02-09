import React, { useState, useEffect, useRef } from 'react';
import Timer from "../src/timer/Timer.jsx";
import WebLiveCapture from '../src/weblivecapture/WebLiveCapture.jsx';
import '../src/css/Exam.css';
import { useLocation } from 'react-router-dom';

const Exam = () => {
    const location = useLocation(); // Use useLocation hook to get location object
    const params = new URLSearchParams(location.search);
    const examTitle = params.get("title");
    const duration = parseInt(params.get("duration")); // Parse duration as integer
    const formLink = params.get("url");
    const studentID = '1902112'; // Assuming this is a static value
    const studentEmail = 'tusharnankani3@gmail.com';

    const fullscreenRef = useRef(null);
    const overlayRef = useRef(null);
    const formBlurRef = useRef(null);
    const countdownRef = useRef(null);

    const [warningCnt, setWarningCnt] = useState(0);
    const [isDevToolsOpen, setIsDevToolsOpen] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(true);
    const [showMessage, setShowMessage] = useState('');
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
                setShowMessage('Your exam will terminate. Please close devtools.');
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
        const fullScreenCheckId = setInterval(() => check(), 10000);

        return () => clearInterval(fullScreenCheckId);
    }, [isFullScreen]);

    useEffect(() => {
        const captureCheckId = setInterval(() => captureCheck(), 20000);

        return () => clearInterval(captureCheckId);
    }, []);

    useEffect(() => {
        const visibilityChangeHandler = () => {
            if (document.hidden) {
                setWarningCnt((prevWarningCnt) => prevWarningCnt + 1);
                setShowMessage('Warning: You switched tabs. Please return to the exam.');
                disableForm();
            }
        };

        document.addEventListener('visibilitychange', visibilityChangeHandler);

        return () => {
            document.removeEventListener('visibilitychange', visibilityChangeHandler);
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
        const copyHandler = () => {
            setWarningCnt((prevWarningCnt) => prevWarningCnt + 1);
            setShowMessage('Copying content is not allowed during the exam.');
            disableForm();
        };

        document.addEventListener('copy', copyHandler);

        return () => {
            document.removeEventListener('copy', copyHandler);
        };
    }, []);

    useEffect(() => {
        // Disable Ctrl+Shift+I and Esc keys
        const keyDownHandler = (event) => {
            if ((event.ctrlKey && event.shiftKey && event.keyCode === 73) || (event.key === "Escape")) {
                event.preventDefault();
            }
        };

        document.addEventListener('keydown', keyDownHandler);

        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    }, []);

    useEffect(() => {
        // Effect to handle page close event
        const handlePageClose = (event) => {
            if (duration > 0) {
                event.preventDefault();
                event.returnValue = ''; // For some browsers
                // Redirect to new route
                window.location.href = '/exam-ended';
            }
        };

        window.addEventListener('beforeunload', handlePageClose);

        return () => {
            window.removeEventListener('beforeunload', handlePageClose);
        };
    }, [duration]);

    function captureCheck() {
        let btn = document.querySelector(
            '#root > div > div > div.left-column > div.image-capture > button'
        );
        btn?.click();
    }

    function check() {
        if (!window.screenTop && !window.screenY && isFullScreen) {
            setIsFullScreen(false);
        }

        if (!isFullScreen) {
            setWarningCnt((prevWarningCnt) => prevWarningCnt + 1);
            setShowMessage('Your exam will terminate. Please go to full-screen mode.');
            disableForm();
        } else {
            enableForm();
        }

        terminateExam();
    }

    function disableForm() {
        overlayRef.current?.classList.remove('hide');
        overlayRef.current?.classList.add('disable');
        formBlurRef.current?.classList.add('blur');
    }

    function enableForm() {
        overlayRef.current?.classList.add('hide');
        overlayRef.current?.classList.remove('disable');
        formBlurRef.current?.classList.remove('blur');
    }

    function terminateExam() {
        if (warningCnt > 5) {
            disableForm();
            overlayRef.current?.classList.add('terminate');
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
                    <div ref={overlayRef} id="overlay" className={`hide ${isFullScreen ? '' : 'disable'}`}>
                        <h2>Message: {showMessage}</h2>
                        <h2>Warnings: {warningCnt}</h2>
                        <h1>{timerExpired ? 'Exam Over' : 'Exam Ongoing'}</h1>
                        <h3>{timerExpired ? 'Time has expired. Please contact your organization/admin.' : ''}</h3>
                        {timerExpired && <button onClick={() => window.close()}>Close Exam</button>}
                    </div>

                    <div ref={formBlurRef} id="form-blur" className={`form ${isFullScreen ? '' : 'blur'}`}>
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
