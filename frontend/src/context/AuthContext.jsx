// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the auth context
export const AuthContext = createContext();

// Base API URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      setLoading(true);
      
      const token = localStorage.getItem('auth_token');
      
      if (!token) {
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
        return;
      }
      
      const response = await axios.get(`${API_URL}/v1/user`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.data && response.data.data) {
        setUser(response.data.data);
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('auth_token');
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (err) {
      console.error('Auth check failed:', err);
      localStorage.removeItem('auth_token');
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.post(`${API_URL}/v1/auth/login`, credentials);
      
      if (response.data && response.data.data && response.data.data.tokens && response.data.data.user) {
        localStorage.setItem('auth_token', response.data.data.tokens.accessToken);
        
        setUser(response.data.data.user);
        setIsAuthenticated(true);
        
        return { success: true };
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.post(`${API_URL}/v1/auth/register`, userData);
      
      if (response.data && response.data.data && response.data.data.tokens && response.data.data.user) {
        localStorage.setItem('auth_token', response.data.data.tokens.accessToken);
        
        setUser(response.data.data.user);
        setIsAuthenticated(true);
        
        return { success: true };
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      console.error('Registration error:', err);
      
      if (err.response && err.response.data && err.response.data.errors) {
        return { 
          success: false, 
          error: { 
            message: 'Validation failed',
            errors: err.response.data.errors 
          } 
        };
      }
      
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      
      if (isAuthenticated) {
        const token = localStorage.getItem('auth_token');
        
        if (token) {
          await axios.post(`${API_URL}/v1/auth/logout`, {}, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
        }
      }
      
      localStorage.removeItem('auth_token');
      setUser(null);
      setIsAuthenticated(false);
      
      return { success: true };
    } catch (err) {
      console.error('Logout error:', err);
      localStorage.removeItem('auth_token');
      setUser(null);
      setIsAuthenticated(false);
      
      return { success: true };
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  const contextValue = {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout,
    clearError
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};