import PropTypes from 'prop-types';
import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from 'hooks/useAuth';
import { AzhaiAuthContext } from 'contexts/AuthContext';
import APIManager from 'utils/APImanager';

const apiManager = new APIManager();

/**
 * Guest guard for routes having no auth required
 * @param {PropTypes.node} children children element/node
 */

const GuestGuard = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const { auth } = useContext(AzhaiAuthContext);
  const navigate = useNavigate();

  useEffect(async () => {
    if (localStorage.getItem('token')) {
      const result = await apiManager.get('auth/profile');
      //
      if (!result.error) {
        navigate('/dashboard', { replace: true });
      } else {
        localStorage.removeItem('token');
      }
    }
  }, [isLoggedIn, navigate]);

  return children;
};

GuestGuard.propTypes = {
  children: PropTypes.node
};

export default GuestGuard;
