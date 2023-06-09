import { AzhaiAuthContext } from 'contexts/AuthContext';
import PropTypes from 'prop-types';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// project imports
import APIManager from 'utils/APImanager';

// ==============================|| AUTH GUARD ||============================== //

const apiManager = new APIManager();

/**
 * Authentication guard for routes
 * @param {PropTypes.node} children children element/node
 */
const AuthGuard = ({ children }) => {
  const { setAuth } = useContext(AzhaiAuthContext);
  const navigate = useNavigate();

  useEffect(async () => {
    if (localStorage.getItem('token')) {
      const result = await apiManager.get('auth/profile');

      if (result.error) {
        navigate('login', { replace: true });
        localStorage.removeItem('token');
      } else {
        setAuth(result.data);
      }
    } else {
      navigate('login', { replace: true });
    }
  }, []);

  return children;
};

AuthGuard.propTypes = {
  children: PropTypes.node
};

export default AuthGuard;
