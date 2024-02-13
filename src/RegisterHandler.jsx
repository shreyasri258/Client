import { useLocation } from 'react-router-dom';
import AdminRegister from './AdminRegister';
import UserRegister from './UserRegister';

const RegisterHandler = () => {
 const location = useLocation();
 const urlParams = new URLSearchParams(location.search);
 const role = urlParams.get('role');

 switch (role) {
    case 'student':
      return <UserRegister />;
    case 'teacher':
      return <AdminRegister />;
    default:
      return null;
 }
};


export default RegisterHandler;

