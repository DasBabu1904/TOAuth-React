import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = authService.getToken();
      console.log('Initializing auth, token found:', !!token);
      
      if (token) {
        try {
          const savedUser = localStorage.getItem('user');
          console.log('Saved user found:', !!savedUser);
          
          if (savedUser) {
            setUser(JSON.parse(savedUser));
          }
          setIsAuthenticated(true);
          console.log('Auth state restored successfully');
        } catch (error) {
          console.log('Error restoring auth state:', error);
          authService.removeToken();
          localStorage.removeItem('user');
        }
      } else {
        console.log('No token found, user not authenticated');
      }
      setLoading(false);
    };
    
    initializeAuth();
  }, []);

  const login = async (credentials) => {
    try {
      // console.log('Login credentials: auth context', credentials); // Debug log: g
      const response = await authService.login(credentials);
      // console.log('Login response: auth context', response); // Debug log
      
      // Handle different possible response structures
      const token = response.access_token || response.token;
      console.log('Token extracted:', !!token);
      
      if (token) {
        authService.setToken(token);
        const userData = response.user || { email: credentials.email };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        setIsAuthenticated(true);
        console.log('Login successful, token and user saved');
      } else {
        throw new Error('No token received from server');
      }
      return response;
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      authService.setToken(response.token);
      setUser(response.user);
      setIsAuthenticated(true);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      authService.removeToken();
      localStorage.removeItem('user');
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    register,
    logout,
    googleAuth: authService.googleAuth,
    facebookAuth: authService.facebookAuth,
    githubAuth: authService.githubAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};