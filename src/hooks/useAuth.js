import { AzhaiAuthContext } from 'contexts/AuthContext';
import { useContext } from 'react';

const useAuth = () => {
  const { auth } = useContext(AzhaiAuthContext);

  return auth;
};

export default useAuth;
