import { useState, useEffect } from 'react';
import apiClient from '../lib/apiClient';
import { jwtDecode } from 'jwt-decode';

export const useAuth = () => {
  const [user, setUser] = useState<unknown>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decodedToken = jwtDecode(token); // Decode the token
        setUser(decodedToken); 
      } catch (error) {
        console.error('Invalid token:', error);
        setUser(null); // If token decoding fails, set user as null
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await apiClient.post('/login', { email, password });
      localStorage.setItem('authToken', response.data.token); // Save token in localStorage
      const decodedToken = jwtDecode(response.data.token); // Decode token and get user data
      setUser(decodedToken); // Set user data from decoded token
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const signup = async (email: string, password: string) => {
    try {
      const response = await apiClient.post('/register', { email, password });
      localStorage.setItem('authToken', response.data.token); // Save token in localStorage
      const decodedToken = jwtDecode(response.data.token); // Decode token and get user data
      setUser(decodedToken); // Set user data from decoded token
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  return { user, login, signup, logout, loading };
};
