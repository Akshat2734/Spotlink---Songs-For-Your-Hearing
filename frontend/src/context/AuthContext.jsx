// /context/AuthContext.js
"use client";

import React, { createContext, useState, useContext, useEffect } from 'react';

// A mock user for demonstration
const mockUser = {
  name: 'Alex Doe',
  avatarUrl: 'https://i.pravatar.cc/40',
};

// 1. Create the Context
const AuthContext = createContext(null);

// 2. Create the Provider Component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // On initial load, check localStorage for a logged-in session
  useEffect(() => {
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    if (storedLoginStatus === 'true') {
      setIsLoggedIn(true);
      // In a real app, you'd fetch user data here, but we'll use the mock
      setUser(mockUser); 
    }
  }, []);

  const login = () => {
    // In a real app, this would be after a successful API call
    setIsLoggedIn(true);
    setUser(mockUser);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('isLoggedIn');
  };

  // The value provided to consuming components
  const value = {
    isLoggedIn,
    user,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 3. Create a custom hook for easy consumption
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};