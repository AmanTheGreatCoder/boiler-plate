import React, { createContext, useState } from 'react';

export const PhoneNumberContext = createContext();

export const PhoneNumberProvider = ({ children }) => {
  const [detail, setDetail] = useState({
    phoneNumber: null,
    countryCode: null
  });

  return (
    <PhoneNumberContext.Provider value={{ detail, setDetail }}>
      {children}
    </PhoneNumberContext.Provider>
  );
};
