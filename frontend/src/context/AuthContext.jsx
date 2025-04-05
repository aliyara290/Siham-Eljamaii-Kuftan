// src/context/AuthContext.jsx
import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { AuthService } from '../services/api';

// Create context
export const AuthContext = createContext();

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true, // Start with loading true to prevent flash of unauthenticated content
  error: null
};

// Actions
export const AUTH_ACTIONS = {
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT: 'LOGOUT',
  SET_USER: 'SET_USER',
  CLEAR_ERROR: 'CLEAR_ERROR'
};

// Reducer function
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
      
    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
        error: null
      };
      
    case AUTH_ACTIONS.LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload
      };
      
    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null
      };
      
    case AUTH_ACTIONS.SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        loading: false
      };
      
    case AUTH_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
      
    default:
      return state;
  }
};

// Provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  
  // Memoize syncCartWithApi to avoid recreating this function on every render
  const syncCartWithApi = useCallback(async () => {
    // Implementation goes here, if needed
    // This is a stub - replace with your actual implementation
  }, []);
  
  // Check for token and user data in localStorage on initial render
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('auth_token');
      const refreshToken = localStorage.getItem('refresh_token');
      const userData = localStorage.getItem('user');
      
      if (!token && !refreshToken) {
        dispatch({ type: AUTH_ACTIONS.SET_USER, payload: null });
        return;
      }
      
      try {
        if (userData) {
          // If we have user data stored, use it immediately
          dispatch({
            type: AUTH_ACTIONS.SET_USER,
            payload: JSON.parse(userData)
          });
        }
        
        // Verify token by fetching current user from API
        const currentUser = await AuthService.getUser();
        
        // Update user data
        localStorage.setItem('user', JSON.stringify(currentUser));
        dispatch({
          type: AUTH_ACTIONS.SET_USER,
          payload: currentUser
        });
      } catch (error) {
        console.error('Error verifying token:', error);
        
        // Try to refresh the token if we have a refresh token
        if (refreshToken) {
          try {
            const response = await AuthService.refreshToken(refreshToken);
            
            if (response && response.data) {
              // Store new tokens
              localStorage.setItem('auth_token', response.data.tokens.accessToken);
              localStorage.setItem('refresh_token', response.data.tokens.refreshToken);
              localStorage.setItem('user', JSON.stringify(response.data.user));
              
              dispatch({
                type: AUTH_ACTIONS.SET_USER,
                payload: response.data.user
              });
              return;
            }
          } catch (refreshError) {
            console.error('Error refreshing token:', refreshError);
          }
        }
        
        // If refreshing failed or there's no refresh token, clear localStorage
        localStorage.removeItem('auth_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        
        dispatch({
          type: AUTH_ACTIONS.LOGOUT
        });
      }
    };
    
    checkAuth();
  }, []); // Empty dependency array - run only once on component mount
  
  // Clear error function (memoized to prevent recreation on every render)
  const clearError = useCallback(() => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
  }, []);
  
  // Login function
  const login = async (credentials) => {
    dispatch({ type: AUTH_ACTIONS.LOGIN_REQUEST });
    
    try {
      const response = await AuthService.login(credentials);
      
      // Store token and user data in localStorage
      localStorage.setItem('auth_token', response.data.tokens.accessToken);
      localStorage.setItem('refresh_token', response.data.tokens.refreshToken);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      dispatch({
        type: AUTH_ACTIONS.LOGIN_SUCCESS,
        payload: response.data.user
      });
      
      // Sync local cart with API after login
      await syncCartWithApi();
      
      return { success: true };
    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.LOGIN_FAILURE,
        payload: error.message || 'Login failed. Please check your credentials.'
      });
      
      return { success: false, error };
    }
  };
  
  // Register function
  const register = async (userData) => {
    dispatch({ type: AUTH_ACTIONS.LOGIN_REQUEST });
    
    try {
      const response = await AuthService.register(userData);
      
      // Store token and user data in localStorage
      localStorage.setItem('auth_token', response.data.tokens.accessToken);
      localStorage.setItem('refresh_token', response.data.tokens.refreshToken);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      dispatch({
        type: AUTH_ACTIONS.LOGIN_SUCCESS,
        payload: response.data.user
      });
      
      // Sync local cart with API after registration
      await syncCartWithApi();
      
      return { success: true };
    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.LOGIN_FAILURE,
        payload: error.message || 'Registration failed. Please try again.'
      });
      
      return { success: false, error };
    }
  };
  
  // Logout function
  const logout = async () => {
    try {
      if (state.isAuthenticated) {
        await AuthService.logout();
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear localStorage and state regardless of API response
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
      
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
      
      return { success: true };
    }
  };
  
  // Create a memoized context value to prevent unnecessary re-renders
  const contextValue = {
    ...state,
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

// Custom hook for using the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};