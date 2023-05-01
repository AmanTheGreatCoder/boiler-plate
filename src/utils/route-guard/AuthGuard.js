import { AzhaiAuthContext } from 'contexts/AzhaiAuthContext';
import PropTypes from 'prop-types';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// project imports
import APIManager from 'utils/APImanager'

// ==============================|| AUTH GUARD ||============================== //

const apiManager = new APIManager();

/**
 * Authentication guard for routes
 * @param {PropTypes.node} children children element/node
 */
const AuthGuard = ({ children }) => {
    const { setAuth } = useContext(AzhaiAuthContext);
    const navigate = useNavigate();

    // const getUser = async () => {
    //     const res = await apiManager.get('auth/profile')
    //     return res;
    // }

    useEffect(async () => {
        if(localStorage.getItem('token')){
            const result = await apiManager.get('auth/profile')
            console.log(localStorage.getItem('token'),result,'isauthenticated')
            if(result.error){
                navigate('login', { replace: true });
                localStorage.removeItem('token')
            } else {
                setAuth(result.data)
            }
        } else {
            navigate('login', { replace: true });
        }

    }, [navigate]);

    return children;
};

AuthGuard.propTypes = {
    children: PropTypes.node
};

export default AuthGuard;
