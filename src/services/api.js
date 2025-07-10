const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apiRequest = async (endpoint, options = {}) => {
  
  const url = `${API_BASE_URL}${endpoint}`;

  console.log(options)
  const config = {
    // headers: {
    //   'Content-Type': 'application/json',
    //   // ...options.headers,
    // }, 
    ...options,
  };
  // console.log(config)
  const response = await fetch(url, config);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  // console.log(response.json())
  const res =response.json();
  // console.log("res======================",res)
  return res
};



const apiRequestJsonBody = async (endpoint, options = {}) => {
  
  const url = `${API_BASE_URL}${endpoint}`;
  console.log(url)
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };
  console.log(url,config)
  const response = await fetch(url, config);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  // console.log(response.json())
  return response.json();
};

const makeAuthorizedRequest = async (endpoint,options={}) => {
  const token = localStorage.getItem('authToken');
  
  const url =`${API_BASE_URL}${endpoint}`
  console.log("in api js url= ",url)
  const config={
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    ...options
  }
  const response = await fetch(url,config );
  
  return response.json();
};

const googleOAuthRequest = async (code) => {
  const url = `${API_BASE_URL}/api/v1/users/register_google`;
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code }),
  };
  
  const response = await fetch(url, config);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};

export { apiRequest, makeAuthorizedRequest, apiRequestJsonBody, googleOAuthRequest };