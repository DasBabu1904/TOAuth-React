import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { makeAuthorizedRequest } from '../services/api';

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const response = await makeAuthorizedRequest('/api/v1/users/', {
        method: 'GET'
      });
      console.log("dashboard call= ",response)
      setUsers(response);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <h1>Welcome to Dashboard</h1>
      <p>You have successfully logged in!</p>
      
      <div className="users-section">
        <h2>All Users</h2>
        {/* {loading ? (
          <p>Loading users...</p>
        ) : (
         users? <ul>
            {users?.map((user, index) => (
              <li key={user.id || index}>
                {user.username || user.email || user.name}
              </li>
            ))}
          </ul>
          :
          <h1>No users to Show</h1>
        )} */}
        <h1>User will appear soon</h1>
      </div>
      
      <button onClick={handleLogout} className="auth-button">Logout</button>
    </div>
  );
};

export default Dashboard;