import PropTypes from 'prop-types';
import { useEffect } from 'react';

const AuthGuard = ({ children }) => {
  const authorize = async () => {
    // if (localStorage.getItem('token')) {
    //   const result = await apiManager.get('auth/profile');
    //   if (result.error) {
    //     navigate('login', { replace: true });
    //     localStorage.removeItem('token');
    //   } else {
    //     dispatch(setAuth(result.data));
    //   }
    // } else {
    //   navigate('login', { replace: true });
    // }
  };

  useEffect(() => {
    authorize();
  }, []);

  return children;
};

AuthGuard.propTypes = {
  children: PropTypes.node
};

export default AuthGuard;
