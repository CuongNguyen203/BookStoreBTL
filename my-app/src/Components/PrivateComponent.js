import {IsLogged } from './JWTToken';

const PrivateComponent = ({Component}) => {
    return IsLogged() ? <Component /> : null;
};

export default PrivateComponent;