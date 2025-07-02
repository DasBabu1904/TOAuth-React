import { apiRequest,apiRequestJsonBody } from './api';

export const authService = {
  // Email/Password Authentication
  login: async (credentials) => {
    // console.log(credentials.email)
    const formData = new FormData();
    formData.append('username', credentials.email);  // Note: use 'username', not 'email'
    formData.append('password', credentials.password);
    console.log(formData.get('password'))
    // login logics 
    return apiRequest('/api/v1/login/access-token', {
      method: 'POST',
      body: formData,
    });
  },

  register: async (userData) => {
    return apiRequestJsonBody('/api/v1/users/open', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // logout: async () => {
  //   return apiRequest('/auth/logout', {
  //     method: 'POST',
  //   });
  // },

  // Social Authentication
  googleAuth: () => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const redirectUri = `${window.location.origin}/auth/google/callback`;
    const scope = 'openid email profile';
    
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
    window.location.href = authUrl;
  },

  facebookAuth: () => {
    const appId = import.meta.env.VITE_FACEBOOK_APP_ID;
    const redirectUri = `${window.location.origin}/auth/facebook/callback`;
    
    const authUrl = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${appId}&redirect_uri=${redirectUri}&response_type=code&scope=email`;
    window.location.href = authUrl;
  },

  githubAuth: () => {
    const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
    const redirectUri = `${window.location.origin}/auth/github/callback`;
    
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user:email`;
    window.location.href = authUrl;
  },

  // Token management
  getToken: () => localStorage.getItem('authToken'),
  
  setToken: (token) => localStorage.setItem('authToken', token),
  
  removeToken: () => localStorage.removeItem('authToken'),
};