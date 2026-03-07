export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_CLEAR = "REGISTER_CLEAR";
export const LOGOUT = "LOGOUT";

export const registerRequest = (payload: any) => ({
    type: REGISTER_REQUEST,
    payload
});

export const loginRequest = (payload: any) => ({
    type: LOGIN_REQUEST,
    payload,
});

export const logout = () => ({
    type: LOGOUT
});