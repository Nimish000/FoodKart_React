import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState({
    _id: '',
    name: '',
    email: '',
    url: '',
    role: '',
    mobile: '',
    address: '',
    token: '', // Assuming token is added after login
  });

  const updateUser = (userData) => {
    setUserDetails((prev) => ({ ...prev, ...userData }));
  };

  const clearUser = () => {
    setUserDetails({
      _id: '',
      name: '',
      email: '',
      url: '',
      role: '',
      mobile: '',
      address: '',
      token: '',
    });
  };

  return (
    <UserContext.Provider value={{ userDetails, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};
