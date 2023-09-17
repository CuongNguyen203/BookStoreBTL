import React from 'react';
import { Navigate} from 'react-router-dom';
import {IsLogged } from './JWTToken';

const PrivateRoute = ({Component}) => {
    return IsLogged() ? <Component /> : <Navigate to="/login" />
};

export default PrivateRoute;