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
      console.log('Checking authentication...');
      const token = localStorage.getItem('auth_token');
      const refreshToken = localStorage.getItem('refresh_token');
      const userData = localStorage.getItem('user');
      
      if (!token && !refreshToken) {
        console.log('No tokens found, user is not authenticated');
        dispatch({ type: AUTH_ACTIONS.SET_USER, payload: null });
        return;
      }
      
      try {
        // If we have user data stored, use it immediately to prevent a flash of unauthenticated content
        if (userData) {
          console.log('Found user data in localStorage, using it temporarily');
          dispatch({
            type: AUTH_ACTIONS.SET_USER,
            payload: JSON.parse(userData)
          });
        }
        
        // Verify token by fetching current user from API
        console.log('Fetching current user to verify token...');
        const currentUser = await AuthService.getUser();
        console.log('Current user data:', currentUser);
        
        // Update user data
        localStorage.setItem('user', JSON.stringify(currentUser));
        dispatch({
          type: AUTH_ACTIONS.SET_USER,
          payload: currentUser
        });
        console.log('Authentication verified successfully');
      } catch (error) {
        console.error('Error verifying token:', error);
        
        // Try to refresh the token if we have a refresh token
        if (refreshToken) {
          console.log('Attempting to refresh token...');
          try {
            const response = await AuthService.refreshToken(refreshToken);
            console.log('Refresh token response:', response);
            
            // Check if the response has the expected structure
            if (response && response.tokens) {
              console.log('Token refresh successful, saving new tokens');
              // Store new tokens
              localStorage.setItem('auth_token', response.tokens.accessToken);
              localStorage.setItem('refresh_token', response.tokens.refreshToken);
              
              if (response.user) {
                localStorage.setItem('user', JSON.stringify(response.user));
                dispatch({
                  type: AUTH_ACTIONS.SET_USER,
                  payload: response.user
                });
              } else {
                // If user data isn't included in the refresh response, fetch it
                console.log('Fetching user data after token refresh');
                const userData = await AuthService.getUser();
                localStorage.setItem('user', JSON.stringify(userData));
                dispatch({
                  type: AUTH_ACTIONS.SET_USER,
                  payload: userData
                });
              }
              return;
            } else {
              console.error('Refresh token response is missing expected data');
            }
          } catch (refreshError) {
            console.error('Error refreshing token:', refreshError);
          }
        }
        
        // If refreshing failed or there's no refresh token, clear localStorage
        console.log('Authentication failed, logging out');
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
 // Login function
const login = async (credentials) => {
  dispatch({ type: AUTH_ACTIONS.LOGIN_REQUEST });
  
  try {
    const response = await AuthService.login(credentials);
    console.log('Login response:', response);
    
    // Check the actual structure of the response
    if (!response) {
      throw new Error('No response received from login request');
    }
    
    // Determine the correct structure based on the response
    const accessToken = response.data?.tokens?.accessToken;
    const refreshToken = response.data?.tokens?.refreshToken;
    const user = response.data?.user;
    
    if (!accessToken || !refreshToken) {
      console.error('Missing tokens in the response', response);
      throw new Error('Authentication failed: Invalid response format');
    }
    
    if (!user) {
      console.error('Missing user data in the response', response);
      throw new Error('Authentication failed: User data not found');
    }
    
    // Store token and user data in localStorage
    localStorage.setItem('auth_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
    localStorage.setItem('user', JSON.stringify(user));
    
    dispatch({
      type: AUTH_ACTIONS.LOGIN_SUCCESS,
      payload: user
    });
    
    // Sync local cart with API after login
    await syncCartWithApi();
    
    return { success: true };
  } catch (error) {
    console.error('Login error details:', error);
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
      console.log('Register response:', response);
      
      // Store token and user data in localStorage
      localStorage.setItem('auth_token', response.data.tokens.accessToken);
      localStorage.setItem('refresh_token', response.data.tokens.refreshToken);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      dispatch({
        type: AUTH_ACTIONS.LOGIN_SUCCESS,
        payload: response.user
      });
      
      // Sync local cart with API after registration
      await syncCartWithApi();
      
      return { success: true };
    } catch (error) {
      console.error('Registration error details:', error);
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