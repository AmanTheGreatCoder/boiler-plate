import React, { createContext, useEffect, useState } from 'react';

export const AzhaiAuthContext = createContext();

export const AzhaiAuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  return (
    <AzhaiAuthContext.Provider value={{ auth, setAuth }}>{children}</AzhaiAuthContext.Provider>
  );
};
