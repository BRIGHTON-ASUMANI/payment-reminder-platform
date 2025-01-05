import { useState, useEffect } from 'react';
import apiClient from '../lib/apiClient';

export const useAuth = () => {
  const [user, setUser] = useState<unknown>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      apiClient
        .get('/user') // This endpoint returns the user details
        .then((response) => {
          setUser(response.data);
          setLoading(false);
        })
        .catch(() => {
          setUser(null);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await apiClient.post('/login', { email, password });
      localStorage.setItem('authToken', response.data.token); // Save token in localStorage
      setUser(response.data.user); // Set user data
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const signup = async (email: string, password: string) => {
    try {
      // Only send `email` and `password` during signup
      const response = await apiClient.post('/signup', { email, password });
      localStorage.setItem('authToken', response.data.token); // Save token in localStorage
      setUser(response.data.user); // Set user data
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
