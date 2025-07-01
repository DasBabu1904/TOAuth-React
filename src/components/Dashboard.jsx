import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <h1>Welcome to Dashboard</h1>
      <p>You have successfully logged in!</p>
      <button onClick={handleLogout} className="auth-button">Logout</button>
    </div>
  );
};

export default Dashboard;