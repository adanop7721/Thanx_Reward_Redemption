import { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import axios from 'axios';

import api from '../lib/api';

interface User {
  id: number;
  email: string;
  points_balance: number;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthAction {
  type: 'LOGIN' | 'LOGOUT' | 'SET_LOADING' | 'UPDATE_USER';
  payload?: any;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
};

const AuthContext = createContext<{
  state: AuthState;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, passwordConfirmation: string) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
} | null>(null);

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for existing token on mount
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('auth_token');
      
      if (token) {
        try {
          // Fetch current user data with the stored token
          const response = await api.get('/api/users/me');
          const userData = response.data.user;
          
          dispatch({ 
            type: 'LOGIN', 
            payload: { 
              user: userData, 
              token 
            } 
          });
        } catch (error) {
          // If token is invalid, remove it
          localStorage.removeItem('auth_token');
          console.error('Invalid token, removing:', error);
        }
      }
      dispatch({ type: 'SET_LOADING', payload: false });
    };
    
    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/api/auth/login', {
        email,
        password,
      });

      const { user, auth_token } = response.data;
      localStorage.setItem('auth_token', auth_token);
      dispatch({
        type: 'LOGIN',
        payload: { user, token: auth_token },
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error || 'Login failed');
      }
      throw new Error('Login failed');
    }
  };

  const signup = async (email: string, password: string, passwordConfirmation: string) => {
    try {
      const response = await api.post('/api/users/signup', {
        user: { 
          email, 
          password, 
          password_confirmation: passwordConfirmation 
        },
      });

      const { user, auth_token } = response.data;
      localStorage.setItem('auth_token', auth_token);
      dispatch({
        type: 'LOGIN',
        payload: { user, token: auth_token },
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.errors?.[0] || error.response.data.error || 'Signup failed';
        throw new Error(errorMessage);
      }
      throw new Error('Signup failed');
    }
  };

  const logout = async () => {
    // Call logout API if token exists
    if (state.token) {
      try {
        await api.post('/api/auth/logout');
      } catch (error) {
        // Ignore errors on logout - user should still be logged out locally
        console.warn('Logout API call failed:', error);
      }
    }

    localStorage.removeItem('auth_token');
    dispatch({ type: 'LOGOUT' });
  };

  const updateUser = (user: User) => {
    dispatch({ type: 'UPDATE_USER', payload: user });
  };

  return (
    <AuthContext.Provider value={{ state, login, signup, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
