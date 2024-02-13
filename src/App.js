import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RoleSelection from './RoleSelection';
import LoginRegister from './LoginRegister';
import AdminRegister from './AdminRegister';
import StudentRegister from './StudentRegister';
import { GlobalStateProvider } from './GlobalState';
import StudentLogin from './StudentLogin';
import TeacherLogin from './TeacherLogin';
import LoginHandler from './LoginHandler';
import AdminDashboard from './AdminDashboard';
import StudentDashboard from './StudentDashboard';
import Exam from './Exam';
import Landing from './landing/Landing'
import Instructions from './Instructions';
import RegisterHandler from './RegisterHandler';



const App = () => {
 return (
    <GlobalStateProvider>
        <Router>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/role-selection" element={<RoleSelection />} />
                <Route path="/login-register" element={<LoginRegister />} />

                <Route path="/register" element={<RegisterHandler />} />
                <Route path="/student-register" element={<StudentRegister />} />
                <Route path="/teacher-register" element={<AdminRegister />} />
                <Route path="/login" element={<LoginHandler />} />
                
                <Route path="/student-login" element={<StudentLogin />} />
                <Route path="/teacher-login" element={<TeacherLogin />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/student-dashboard" element={<StudentDashboard />} />
                <Route path="/instructions" element={<Instructions></Instructions>} />
                <Route path="/exam" element={<Exam />} />
                <Route path="/exam/:title/:duration/:url" element={<Exam />} /> {/* Dynamic route with parameters */}
            </Routes>
        </Router>
    </GlobalStateProvider>
 );
};

export default App;
