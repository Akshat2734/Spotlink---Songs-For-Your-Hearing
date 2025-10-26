"use client";

import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // To prevent UI flicker

  const login = () => {
    window.location.href = 'http://127.0.0.1:8080/login';
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8080/userprofile',{
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include' // This sends the session cookie to the backend
        });
        
        if (response.ok) {
          const userData = await response.json();
          setUser({
            name: userData.name,
            avatarUrl: userData.avatarUrl,
          });
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("No active user session found.", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const logout = async () => {
    try {
      await fetch('http://127.0.0.1:8080/logout', { credentials: 'include' });
    } catch (error) {
      console.error("Logout failed:", error);
    }
    setUser(null);
    setIsLoggedIn(false);
    window.location.href = '/';
  };

  const value = { isLoggedIn, user, login, logout, loading };

  // Don't render the app until we have checked for a user
  if (loading) {
    return null; // Or a loading spinner
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};