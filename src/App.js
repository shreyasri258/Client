import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RoleSelection from "./GeneralFiles/RoleSelection";
import LoginRegister from "./GeneralFiles/LoginRegister";
import AdminRegister from "./Admin/AdminRegister";
import StudentRegister from "./User/StudentRegister";
import { GlobalStateProvider } from "./GlobalState";
import StudentLogin from "./User/StudentLogin";
import TeacherLogin from "./Admin/TeacherLogin";
import LoginHandler from "./GeneralFiles/LoginHandler";
import AdminDashboard from "./Admin/AdminDashboard";
import StudentDashboard from "./User/StudentDashboard";
import Exam from "./ExamChecks/Exam";
import Landing from "./landing/Landing";
import Instructions from "./User/Instructions";
import RegisterHandler from "./GeneralFiles/RegisterHandler";

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
          <Route path="/instructions" element={<Instructions />} />
          <Route path="/exam" element={<Exam />} />
          <Route path="/exam/:title/:duration/:url" element={<Exam />} />
          {/* Dynamic route with parameters */}
        </Routes>
      </Router>
    </GlobalStateProvider>
  );
};

export default App;
