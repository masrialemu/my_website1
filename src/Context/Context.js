import axios from 'axios';
import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const token = userData ? userData.token : null;
  
  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('userData');
    setUser(null);
    window.location.reload();
  };

// Define the auto-logout time (in milliseconds)
const autoLogoutTime = 24 * 60 * 60 * 1000; // 24 hours


  useEffect(() => {
    const timerId = setTimeout(() => {
      // Call the logout function when the timer expires
      logout();
    }, autoLogoutTime);

    return () => {
      // Clear the timer when the component unmounts or when the user logs out manually
      clearTimeout(timerId);
    };
  }, [logout]);
  

 
  

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
