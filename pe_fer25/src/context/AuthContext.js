import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async ({ usernameOrEmail, password }) => {
    setLoading(true);
    setError(null);

    try {
      // Get all users
      const users = await authAPI.login(usernameOrEmail, password);
      
      // Find user by username or email
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isEmailFormat = emailRe.test(usernameOrEmail);
      
      const foundUser = users.find((u) => {
        const matchesIdentifier = isEmailFormat 
          ? (u.email && u.email === usernameOrEmail)
          : (u.username === usernameOrEmail);
        return matchesIdentifier && u.password === password;
      });

      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem('user', JSON.stringify(foundUser));
        localStorage.setItem('token', foundUser.id);
        setLoading(false);
        return { success: true, user: foundUser };
      } else {
        setError('Invalid username/email or password!');
        setLoading(false);
        return { success: false };
      }
    } catch (err) {
      setError('Login failed. Please try again.');
      setLoading(false);
      return { success: false };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    clearError,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

