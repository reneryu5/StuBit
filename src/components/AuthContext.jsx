/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user_login'));
    if (loggedInUser) {
      setUser(loggedInUser[0]);
    }
  }, []);

  const login = (user) => {
    setUser(user);
    localStorage.setItem('user_login', JSON.stringify([user]));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user_login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
