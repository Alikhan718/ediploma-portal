import {
    POST_AUTH_LOGIN,
    POST_AUTH_REGISTER,
    POST_AUTH_VALIDATE_EMAIL,
    POST_AUTH_WITH_DS,
    GET_OTP,
    POST_RESET_PASSWORD,
    POST_VALIDATE_EMAIL, AUTH_LOGOUT
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
        case AUTH_LOGOUT.success:
            localStorage.clear();
            return {
                ...state,
                userRole: ""
            };
        case POST_AUTH_LOGIN.saga:
            return {
                ...state,
                email: action.payload.email,
                password: action.payload.password,
                isLoading: false,
                otpSent: false
            };
        case POST_AUTH_WITH_DS.saga:
            return {
                ...state,
                data: action.payload,
            };
        case POST_AUTH_WITH_DS.success:
            const token = action.payload.token;
            localStorage.setItem("token", token);
            localStorage.setItem("userRole", action.payload.role);

            return {
                ...state,
                payload: action.payload,
                userRole: action.payload.role,
                isLoading: false
            };

        case POST_AUTH_LOGIN.success:
            const token2 = action.payload.token;
            localStorage.setItem("token", token2);
            localStorage.setItem("userRole", action.payload.role);

            return {
                ...state,
                payload: action.payload,
                userRole: action.payload.role,
                isLoading: false
            };
        case POST_AUTH_LOGIN.error:
            return {
                ...state,
                payload: action.payload,
                isLoading: false,
                otpSent: false,
                registrationStep: 1,
            };
        case POST_AUTH_REGISTER.saga:
            return {
                ...state,
                email: action.payload.email,
                password: action.payload.password,
                repassword: action.payload.repassword,
                name: action.payload.name,
                registrationStep: 1,
                isLoading: false
            };
        case POST_AUTH_REGISTER.success:
            return {
                ...state,
                payload: action.payload,
                otpSent: false,
                isLoading: false,
                registrationStep: 3
            };
        case POST_RESET_PASSWORD.saga:
            return {
                ...state,
                email: action.payload.email,
                code: action.payload.code,
                password: action.payload.password,
                repass: action.payload.repass,
            };
        case POST_RESET_PASSWORD.success:
            return {
                ...state,
                redirectToLogin: true,
            };
        case GET_OTP.saga:
            return {
                ...state,
                email: action.payload.email,
            };

        case GET_OTP.success:
            return {
                ...state,
                otpSent: true,
                forgotStep: 2,
            };
        case GET_OTP.error:
            return {
                ...state,
                otpSent: false,
            };
        case POST_AUTH_VALIDATE_EMAIL.saga:
            return {
                ...state,
                email: action.payload.email,
                code: action.payload.code,
            };
        case POST_AUTH_VALIDATE_EMAIL.success:
            return {
                ...state,
                otpSent: true,
                isLoading: false,
                registrationStep: 2,
            };
        case POST_AUTH_VALIDATE_EMAIL.error:
            return {
                ...state,
                otpSent: true,
                isLoading: false,
                registrationStep: 1,
            };
        case POST_VALIDATE_EMAIL.saga:
            return {
                ...state,
                email: action.payload.email,
                code: action.payload.code,
            };
        case POST_VALIDATE_EMAIL.success:
            return {
                ...state,
                otpSent: true,
                isLoading: false,
                forgotStep: 3,
            };
        case POST_AUTH_REGISTER.error:
            return {
                ...state,
                payload: action.payload,
                isLoading: false,
                otpSent: false,
                registrationStep: 1
            };
        default:
            return state;
    }
};