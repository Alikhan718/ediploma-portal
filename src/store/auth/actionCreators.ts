import {
    POST_AUTH_REGISTER,
    GET_OTP,
    POST_RESET_PASSWORD,
    POST_AUTH_LOGIN,
    POST_AUTH_VALIDATE_EMAIL,
    POST_AUTH_WITH_DS,
    POST_VALIDATE_EMAIL
} from "./types/actionTypes";

export const fetchLoginRequest = (payload: any) => ({
    type: POST_AUTH_LOGIN.saga,
    payload
});

export const fetchAuthDSRequest = (payload: any) => ({
    type: POST_AUTH_WITH_DS.saga,
    payload
});

export const fetchRegisterRequest = (payload: any) => ({
    type: POST_AUTH_REGISTER.saga,
    payload
});
export const fetchAuthValidateEmailRequest = (payload: any) => ({
    type: POST_AUTH_VALIDATE_EMAIL.saga,
    payload
});
export const fetchValidateEmailRequest = (payload: any) => ({
    type: POST_VALIDATE_EMAIL.saga,
    payload
});
export const fetchResetPasswordRequest = (payload: any) => ({
    type: POST_RESET_PASSWORD.saga,
    payload
});
export const fetchGetOtpRequest = (payload: any) => ({
    type: GET_OTP.saga,
    payload
});