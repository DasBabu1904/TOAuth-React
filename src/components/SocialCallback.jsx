import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {apiRequest} from '../services/api';

const SocialCallback = ({ provider }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code');
      const error = searchParams.get('error');

      if (error) {
        alert('Authentication failed');
        navigate('/login');
        return;
      }

      if (code) {
        try {
          // Send code to backend for token exchange and user creation
          const response = await apiRequest(`/auth/${provider}/callback`, {
            method: 'POST',
            body: JSON.stringify({ code }),
          });

          // Backend returns JWT token and user data
          localStorage.setItem('authToken', response.token);
          await login(response);
          navigate('/dashboard');
        } catch (error) {
          alert('Authentication failed: ' + error.message);
          navigate('/login');
        }
      }
    };

    handleCallback();
  }, [searchParams, navigate, login, provider]);

  return <div>Processing authentication...</div>;
};

export default SocialCallback;