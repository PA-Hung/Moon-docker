import { FETCH_USER_LOGIN_SUCCESS, USER_LOGOUT_SUCCESS } from '../action/authType';

export const reduxLogin = (data) => {
    return {
        type: FETCH_USER_LOGIN_SUCCESS,
        payload: data
    };
};

export const reduxLogout = () => {
    return {
        type: USER_LOGOUT_SUCCESS,
    };
};

