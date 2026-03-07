import { LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT, REGISTER_CLEAR, REGISTER_SUCCESS } from "./auth.actions";

const initialState = {
    user: null,
    token: typeof window !== "undefined"
        ? localStorage.getItem("token")
        : null,
    loading: false,
    register: false,
    error: null,
};

export default function authReducer(state = initialState, action: any) {

    switch (action.type) {

        case LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
            };

        case REGISTER_SUCCESS:
            return {
                ...state,
                register: true,
            };

        case REGISTER_CLEAR:
            return {
                ...state,
                register: false,
            };

        case LOGIN_FAILURE:
            return {
                ...state,
                error: action.payload,
            };


        case LOGOUT:
            return initialState;

        default:
            return state;
    }

}