import {
    FETCH_AUTH_ITEMS,
    FETCH_AUTH_ITEMS_ERROR,
    FETCH_AUTH_ITEMS_SUCCESS,
    FETCH_AUTH_LOGIN_ERROR,
    FETCH_AUTH_LOGIN_SAGA,
    FETCH_AUTH_LOGIN_SUCCESS,
    FETCH_AUTH_LOGOUT,
    FETCH_AUTH_REGISTER_ERROR,
    FETCH_AUTH_REGISTER_SAGA,
    FETCH_AUTH_REGISTER_SUCCESS, FETCH_AUTH_VALIDATE_EMAIL_ERROR,
    FETCH_AUTH_VALIDATE_EMAIL_SAGA,
    FETCH_AUTH_VALIDATE_EMAIL_SUCCESS, FETCH_AUTH_WITH_DS_SAGA, FETCH_AUTH_WITH_DS_SUCCESS, FETCH_GET_OTP_ERROR,
    FETCH_GET_OTP_SAGA,
    FETCH_GET_OTP_SUCCESS,
    FETCH_RESET_PASSWORD_SAGA,
    FETCH_RESET_PASSWORD_SUCCESS,
    FETCH_VALIDATE_EMAIL_SAGA,
    FETCH_VALIDATE_EMAIL_SUCCESS
} from "./types/actionTypes";

const initialState = {
    userRole: "Guest",
    otpSent: false,
    isLoading: false,
    redirectToLogin: false,
    forgotStep: 1, // [1 - send code, 2 - confirm code, 3 - change pass]
    registrationStep: 1, // [1 - send code, 2 - email validated, 3 - registered]
};
export const authReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case FETCH_AUTH_LOGOUT:
            localStorage.clear();
            return {
                ...state,
                userRole: ""
            };
        case FETCH_AUTH_ITEMS:
            return {
                ...state,
                isLoading: true
            };
        case FETCH_AUTH_ITEMS_SUCCESS:
            return {
                ...state,
                userRole: action.payload,
                isLoading: false
            };
        case FETCH_AUTH_LOGIN_SAGA:
            return {
                ...state,
                email: action.payload.email,
                password: action.payload.password,
                isLoading: false,
                otpSent: false
            };
        case FETCH_AUTH_WITH_DS_SAGA:
            console.log(action.payload);
            return {
                ...state,
                data: action.payload,
            };
        case FETCH_AUTH_WITH_DS_SUCCESS:
            const token = action.payload.token;
            localStorage.setItem("token", token);
            localStorage.setItem("userRole", action.payload.role);

            return {
                ...state,
                payload: action.payload,
                userRole: action.payload.role,
                isLoading: false
            };

        case FETCH_AUTH_LOGIN_SUCCESS:
            const token2 = action.payload.token;
            localStorage.setItem("token", token2);
            localStorage.setItem("userRole", action.payload.role);

            return {
                ...state,
                payload: action.payload,
                userRole: action.payload.role,
                isLoading: false
            };
        case FETCH_AUTH_LOGIN_ERROR:
            return {
                ...state,
                payload: action.payload,
                isLoading: false,
                otpSent: false,
                registrationStep: 1,
            };
        case FETCH_AUTH_REGISTER_SAGA:
            return {
                ...state,
                email: action.payload.email,
                password: action.payload.password,
                repassword: action.payload.repassword,
                name: action.payload.name,
                registrationStep: 1,
                isLoading: false
            };
        case FETCH_AUTH_REGISTER_SUCCESS:
            return {
                ...state,
                payload: action.payload,
                otpSent: false,
                isLoading: false,
                registrationStep: 3
            };
        case FETCH_RESET_PASSWORD_SAGA:
            return {
                ...state,
                email: action.payload.email,
                code: action.payload.code,
                password: action.payload.password,
                repass: action.payload.repass,
            };
        case FETCH_RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                redirectToLogin: true,
            };
        case FETCH_GET_OTP_SAGA:
            return {
                ...state,
                email: action.payload.email,
            };

        case FETCH_GET_OTP_SUCCESS:
            return {
                ...state,
                otpSent: true,
                forgotStep: 2,
            };
        case FETCH_GET_OTP_ERROR:
            return {
                ...state,
                otpSent: false,
            };
        case FETCH_AUTH_VALIDATE_EMAIL_SAGA:
            return {
                ...state,
                email: action.payload.email,
                code: action.payload.code,
            };
        case FETCH_AUTH_VALIDATE_EMAIL_SUCCESS:
            return {
                ...state,
                otpSent: true,
                isLoading: false,
                registrationStep: 2,
            };
        case FETCH_AUTH_VALIDATE_EMAIL_ERROR:
            return {
                ...state,
                otpSent: true,
                isLoading: false,
                registrationStep: 1,
            };
        case FETCH_VALIDATE_EMAIL_SAGA:
            return {
                ...state,
                email: action.payload.email,
                code: action.payload.code,
            };
        case FETCH_VALIDATE_EMAIL_SUCCESS:
            return {
                ...state,
                otpSent: true,
                isLoading: false,
                forgotStep: 3,
            };
        case FETCH_AUTH_REGISTER_ERROR:
            return {
                ...state,
                payload: action.payload,
                isLoading: false,
                otpSent: false,
                registrationStep: 1
            };
        case FETCH_AUTH_ITEMS_ERROR:
            return {
                ...state,
                isLoading: false
            };
        default:
            return state;
    }
};