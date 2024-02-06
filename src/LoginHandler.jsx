import { useLocation } from 'react-router-dom';
import StudentLogin from './StudentLogin';
import TeacherLogin from './TeacherLogin';

const LoginHandler = () => {
 const location = useLocation();
 const urlParams = new URLSearchParams(location.search);
 const role = urlParams.get('role');

 switch (role) {
    case 'student':
      return <StudentLogin />;
    case 'teacher':
      return <TeacherLogin />;
    default:
      return null;
 }
};


export default LoginHandler;

