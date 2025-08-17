"use client";

import React, { createContext, useState, useContext, useEffect } from 'react';

// REMOVE the mockUser. We will fetch real data instead.
// const mockUser = { ... };

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // This function will run when the application first loads
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // This is the "bridge": a GET request to your backend's endpoint
        const response = await fetch('http://127.0.0.1:8080/userprofile');
        
        if (response.ok) {
          const userData = await response.json();
          // The backend sends { user_id, user_email, user_imageUrl }
          // We map it to what the Navbar component expects: { name, avatarUrl }
          setUser({
            name: userData.user_id,
            avatarUrl: userData.user_imageUrl,
          });
          setIsLoggedIn(true);
        } else {
          // If the request fails, it means the user is not logged in
          setIsLoggedIn(false);
          setUser(null);
        }
      } catch (error) {
        console.error("Could not fetch user data:", error);
        setIsLoggedIn(false);
        setUser(null);
      }
    };

    fetchUserData();
  }, []); // The empty array means this effect runs once on component mount

  const login = () => {
    // This part remains the same: it redirects to your backend login
    window.location.href = 'http://127.0.0.1:8080/login';
  };

  const logout = async () => {
   try {
      // 1. THIS IS THE FIX: Call the backend to destroy the session
      await fetch('http://127.0.0.1:8080/logout');
    } catch (error) {
      console.error("Error logging out from server:", error);
    }
    
    // 2. Update the frontend state as before
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('isLoggedIn');

    // 3. (Optional but recommended) Redirect to the homepage
    window.location.href = '/';
  }
  
  const value = {
    isLoggedIn,
    user,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};