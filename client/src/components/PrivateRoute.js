import React from 'react';
import { Navigate } from 'react-router-dom';
import handleSession from '../helpers/session'


const PrivateRoute = ({children}) => {

    const { auth } = handleSession();
    
    // const { auth, userLS, tokenLS} = handleSession();
    // const { user, setUser, token, setToken } = children.props;
    // if (auth) {
    //     setUser(userLS);
    //     setToken(tokenLS);
    // }

    return (

        auth ? children : <Navigate to="/" />
    );
};

export default PrivateRoute;