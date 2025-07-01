import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import SocialCallback from './components/SocialCallback';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/auth/google/callback" element={<SocialCallback provider="google" />} />
            <Route path="/auth/facebook/callback" element={<SocialCallback provider="facebook" />} />
            <Route path="/auth/github/callback" element={<SocialCallback provider="github" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
