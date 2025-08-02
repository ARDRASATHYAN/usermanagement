import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import VerifyEmail from './components/VerifyEmail';
import EditProfile from './pages/Edit';
import ForgotPassword from './pages/ForgotPassword';
import Login from './pages/Login';
import RegisterForm from './pages/RegisterForm';
import ResetPassword from './pages/ResetPassword';
import Userlist from './pages/Userlist';

// const ProtectedRoute = ({ children }) => {
//   const token = localStorage.getItem('accessToken');

//   if (!token) {
//     return <Navigate to="/" replace />;
//   }

//   return children;
// };

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/verify/:token" element={<VerifyEmail />} />
          <Route path="/dashboard" element={<Userlist />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/edit" element={<EditProfile />} />
          <Route path="/edit/:id" element={<EditProfile />} />
          {/* Add other routes */}
        </Routes>
      </Router>


    </>
  )
}

export default App
