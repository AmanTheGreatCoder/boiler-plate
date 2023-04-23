import PropTypes from 'prop-types';
import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// project imports
import useAuth from 'hooks/useAuth';
import { DASHBOARD_PATH } from 'config';
import { AzhaiAuthContext } from 'contexts/AzhaiAuthContext';
import APIManager from 'utils/APImanager';

// ==============================|| GUEST GUARD ||============================== //
const apiManager = new APIManager();

/**
 * Guest guard for routes having no auth required
 * @param {PropTypes.node} children children element/node
 */

const GuestGuard = ({ children }) => {
    const { isLoggedIn } = useAuth();
    const { auth } = useContext(AzhaiAuthContext)
    const navigate = useNavigate();

    useEffect(async () => {
        if(localStorage.getItem('token')){
            const result = await apiManager.get('auth/profile')
            // console.log(localStorage.getItem('token'),result,'isauthenticated')
            if(!result.error){
                navigate('/dashboard/default', { replace: true });
            } else {
                localStorage.removeItem('token')
            }
        }


        // if (isLoggedIn) {
        //     navigate(DASHBOARD_PATH, { replace: true });
        // }
    }, [isLoggedIn, navigate]);

    return children;
};

GuestGuard.propTypes = {
    children: PropTypes.node
};

export default GuestGuard;
