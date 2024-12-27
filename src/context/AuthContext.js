import React, { createContext, useContext, useState } from 'react';

// Creating a Context to manage authentication state
const AuthContext = createContext();

// The AuthProvider component wraps the parts of the app that need access to the authentication state
export const AuthProvider = ({ children }) => {
  // useState is used to manage the authentication state (whether the user is logged in or not)
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // login function to set the authentication state to true (user logged in)
  const login = () => setIsAuthenticated(true);
  
  // logout function to set the authentication state to false (user logged out)
  const logout = () => setIsAuthenticated(false);

  return (
    // The AuthContext.Provider is used to make the authentication state and functions available to children components
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// useAuth is a custom hook to access the AuthContext value (authentication state and methods) inside any component
export const useAuth = () => {
  // useContext is used to access the current context value (in this case, the authentication state)
  return useContext(AuthContext);
};