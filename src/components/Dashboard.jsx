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
    <div style={{padding: '20px', maxWidth: '1200px', margin: '0 auto', backgroundColor: '#f8f9fa', minHeight: '100vh'}}>
      {/* Header */}
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', padding: '20px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'}}>
        <div>
          <h1 style={{margin: '0 0 5px 0', color: '#333', fontSize: '28px'}}>Welcome to Dashboard</h1>
          <p style={{margin: '0', color: '#666', fontSize: '16px'}}>Manage your users and system</p>
        </div>
        <button 
          onClick={handleLogout}
          style={{background: '#dc3545', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: '500', transition: 'background 0.2s'}}
          onMouseOver={(e) => e.target.style.background = '#c82333'}
          onMouseOut={(e) => e.target.style.background = '#dc3545'}
        >
          Logout
        </button>
      </div>
      
      {/* Users Section */}
      <div style={{backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'}}>
        <h2 style={{margin: '0 0 20px 0', color: '#333', fontSize: '24px'}}>All Users</h2>
        {loading ? (
          <p style={{textAlign: 'center', color: '#666', fontSize: '16px'}}>Loading users...</p>
        ) : users && users.length > 0 ? (
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px'}}>
            {users.map((user) => (
              <div key={user.id} style={{border: '1px solid #e9ecef', padding: '20px', borderRadius: '8px', backgroundColor: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', transition: 'transform 0.2s, boxShadow 0.2s'}} 
                   onMouseOver={(e) => {e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'}}
                   onMouseOut={(e) => {e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px'}}>
                  <h3 style={{margin: '0', color: '#333', fontSize: '18px'}}>{user.full_name}</h3>
                  <span style={{padding: '4px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', backgroundColor: user.is_active ? '#d4edda' : '#f8d7da', color: user.is_active ? '#155724' : '#721c24'}}>
                    {user.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div style={{lineHeight: '1.6'}}>
                  <p style={{margin: '8px 0', color: '#666', fontSize: '14px'}}><strong style={{color: '#333'}}>Email:</strong> {user.email}</p>
                  <p style={{margin: '8px 0', color: '#666', fontSize: '14px'}}><strong style={{color: '#333'}}>ID:</strong> {user.id}</p>
                  <p style={{margin: '8px 0', color: '#666', fontSize: '14px'}}><strong style={{color: '#333'}}>Role:</strong> 
                    <span style={{marginLeft: '5px', padding: '2px 6px', borderRadius: '4px', fontSize: '12px', backgroundColor: user.is_superuser ? '#fff3cd' : '#d1ecf1', color: user.is_superuser ? '#856404' : '#0c5460'}}>
                      {user.is_superuser ? 'Admin' : 'User'}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={{textAlign: 'center', color: '#666', fontSize: '16px'}}>No users to show</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;