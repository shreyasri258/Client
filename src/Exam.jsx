import React, { useState, useEffect, useRef , useContext, useCallback } from 'react';
import Timer from "../src/timer/Timer.jsx";
import WebLiveCapture from '../src/weblivecapture/WebLiveCapture.jsx';
import '../src/css/Exam.css';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert as Swal
import { StudentContext } from "./contextCalls/studentContext/StudentContext"; // Import StudentContext
import TimerComponent from './TimerComp.jsx';
import LeftColumn from './LeftCol.jsx';
import EmbeddedForm from './FormComp.jsx';

const Exam = () => {
    const { user } = useContext(StudentContext);

    const location = useLocation(); // Use useLocation hook to get location object
    const params = new URLSearchParams(location.search);
    const examTitle = params.get("title");
    const duration = parseInt(params.get("duration")); // Parse duration as integer
    const formLink = params.get("url");
    console.log('exam params -> ', examTitle, duration)
    const studentName = user.user.user.name; // Assuming this is a static value
    const studentEmail = user.user.user.email;

    const fullscreenRef = useRef(null);
    const countdownRef = useRef(null);

    const [warningCnt, setWarningCnt] = useState(0);
    const [isDevToolsOpen, setIsDevToolsOpen] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [timerExpired, setTimerExpired] = useState(false); // State to track timer expiration
    const [fullscreenAlertShown, setFullscreenAlertShown] = useState(false); // State to track if fullscreen alert has been shown

    const handleFullscreen = useCallback(() => {
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
    }, []);

    const terminateExam = useCallback(() => {
        if (warningCnt >= 3) {
            disableForm();
            Swal.fire({
                icon: 'error',
                title: 'Exam Terminated',
                text: 'Your exam has been terminated due to multiple warnings.',
                showCancelButton: false,
                confirmButtonText: 'Go back to dashboard'
            }).then(() => {
                // Redirect or navigate to the dashboard
                // Example redirect:
                window.close() // Adjust the URL as needed
            });
        }
    }, [warningCnt]);

    useEffect(() => {
        const fullscreenChangeHandler = () => {
            setIsFullScreen(!!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement));
            if (!document.fullscreenElement && isFullScreen) {
                setWarningCnt((warningCnt) => warningCnt + 1);
                Swal.fire({
                    title: 'Go back to Fullscreen',
                    text: `You are not in fullscreen mode.  go back to Full Screen mode Warning count: ${warningCnt}`,
                    icon: 'info',
                    showCancelButton: false,
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                }).then((result) => {
                    if (result.isConfirmed) {
                        handleFullscreen();
                    }
                });
            }
            terminateExam()
        };
    
        document.addEventListener('fullscreenchange', fullscreenChangeHandler);
        document.addEventListener('webkitfullscreenchange', fullscreenChangeHandler);
        document.addEventListener('mozfullscreenchange', fullscreenChangeHandler);
        document.addEventListener('MSFullscreenChange', fullscreenChangeHandler);
    
        return () => {
            document.removeEventListener('fullscreenchange', fullscreenChangeHandler);
            document.removeEventListener('webkitfullscreenchange', fullscreenChangeHandler);
            document.removeEventListener('mozfullscreenchange', fullscreenChangeHandler);
            document.removeEventListener('MSFullscreenChange', fullscreenChangeHandler);
        };
    }, [isFullScreen, handleFullscreen, warningCnt,terminateExam]);

    useEffect(() => {
        if (!isFullScreen && !fullscreenAlertShown) {
            Swal.fire({
                title: 'Enter Fullscreen',
                text: `You have to enter fullscreen mode`,
                icon: 'info',
                showCancelButton: false,
                confirmButtonText: 'Make FullScreen',
                
                customClass: {
                    popup: 'my-popup-class',
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    handleFullscreen();
                    setFullscreenAlertShown(true);
                }
            });
        }
    }, [isFullScreen, fullscreenAlertShown, handleFullscreen]);

  

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
                setWarningCnt((warningCnt) => warningCnt + 1);
                setIsDevToolsOpen(true);
            }

            if (!isDevToolsOpen) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Warning',
                    text: `Your exam will terminate. Please close devtools.Warning count: ${warningCnt}`
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
    }, [isDevToolsOpen,warningCnt,terminateExam]);

    


    useEffect(() => {
        const keyDownHandler = (event) => {
            if ((event.ctrlKey && event.shiftKey && event.key === 'I') || (event.key === 'F12')) {
                event.preventDefault();
                setWarningCnt((warningCnt) => warningCnt + 1);
                Swal.fire({
                    icon: 'warning',
                    title: 'Warning',
                    text: `Opening developer tools is not allowed during the exam.Warning count: ${warningCnt}`
                });
                disableForm();
                terminateExam();
            }
        };

        document.addEventListener('keydown', keyDownHandler);

        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    }, [warningCnt]);

    
    

    useEffect(() => {
        const copyHandler = (event) => {
            event.preventDefault();
            setWarningCnt((warningCnt) => warningCnt + 1);
            Swal.fire({
                icon: 'warning',
                title: 'Warning',
                text: `Copying content is not allowed during the exam.Warning count: ${warningCnt}`
            });
            disableForm();
            terminateExam(); // Ensure that terminateExam is called
        };

        document.addEventListener('copy', copyHandler);

        return () => {
            document.removeEventListener('copy', copyHandler);
        };
    }, [warningCnt,terminateExam]);

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
                setWarningCnt((warningCnt) => warningCnt + 1);
                Swal.fire({
                    icon: 'warning',
                    title: 'Warning',
                    text: `You switched tabs. Please return to the exam.Warning count: ${warningCnt}`,
                    showCancelButton: true,
                    confirmButtonText: 'Return to Fullscreen',
                    cancelButtonText: 'Cancel'
                }).then((result) => {
                    if (result.isConfirmed) {
                        handleFullscreen();
                    }
                });
            }
            terminateExam(); // Ensure that terminateExam is called
        };

        document.addEventListener('visibilitychange', visibilityChangeHandler);

        return () => {
            document.removeEventListener('visibilitychange', visibilityChangeHandler);
        };
    }, [warningCnt,terminateExam]);
    function disableForm() {
        // Implement disable form logic here
    }

    function enableForm() {
        // Implement enable form logic here
    }

    
    
    

    // TO EMBED
    let embeddedFormLink = formLink + '?embedded=true';

    return (
        <div className="exam-wrapper">
             <div className="exam-wrapper">
            <button className='fullscreen-button' onClick={handleFullscreen}>Make Fullscreen</button>
            <div ref={fullscreenRef}></div>
            <div className="exam-container">
                <LeftColumn studentName={studentName} studentEmail={studentEmail} />
                <EmbeddedForm embeddedFormLink={embeddedFormLink} examTitle={examTitle} />
                <TimerComponent duration={duration} setTimerExpired={setTimerExpired} />
            </div>
        </div>
        </div>
    );
};

export default Exam;
