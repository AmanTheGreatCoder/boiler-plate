import { useContext } from 'react';

// auth provider
// import AuthContext from 'contexts/FirebaseContext';
import { AzhaiAuthContext } from 'contexts/AzhaiAuthContext';
// import AuthContext from 'contexts/Auth0Context';
// import AuthContext from 'contexts/JWTContext';
// import AuthContext from 'contexts/AWSCognitoContext';

// ==============================|| AUTH HOOKS ||============================== //

const useAuth = () => {
    const { auth } = useContext(AzhaiAuthContext);

    // if (!isAuthenticated) throw new Error('context must be use inside provider');

    return auth;
};

export default useAuth;
