import {
    POST_AUTH_LOGIN,
    POST_AUTH_REGISTER,
    POST_AUTH_VALIDATE_EMAIL,
    POST_AUTH_WITH_DS,
    GET_OTP,
    POST_RESET_PASSWORD,
    POST_VALIDATE_EMAIL,
    AUTH_LOGOUT,
    POST_SAVE_XML,
    GET_DIPLOMA_METADATA_CID,
    POST_GENERATE_SMART_CONTRACT,
    GET_PROFILE_DATA, POST_UPDATE_PROFILE_DATA, POST_UPLOAD_FILE,
    GET_UNIVERSITY_LIST,
    PUT_VISIBILITY,
} from "./types/actionTypes";

const initialState = {
    userRole: localStorage.getItem("userRole") ?? "Guest",
    otpSent: false,
    isLoading: false,
    signed: false,
    ipfsLink: "",
    smartContractLink: "",
    redirectToLogin: false,
    forgotStep: 1, // [1 - send code, 2 - confirm code, 3 - change pass]
    registrationStep: 1, // [1 - send code, 2 - email validated, 3 - registered]
    userState: {},
    image_link: null,
    universitiesList: [],
    visibility: null,
};
export const authReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case POST_UPLOAD_FILE.saga:
            return {
                ...state,
                image_link: null,
            };
        case POST_UPLOAD_FILE.success:
            return {
                ...state,
                image_link: action.data,
            };
        case AUTH_LOGOUT.success:
            localStorage.clear();
            return {
                ...state,
                userRole: "Guest"
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

        case GET_PROFILE_DATA.success:

            return {
                ...state,
                userState: action.payload,
                isLoading: false
            };

        case POST_UPDATE_PROFILE_DATA.success:

            return {
                ...state,
                userState: action.payload,
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
        case POST_SAVE_XML.saga:
            return {
                ...state,
                xml: action.payload,
            };
        case POST_SAVE_XML.success:
            return {
                ...state,
                signed: true,
            };
        case POST_SAVE_XML.error:
            return {
                ...state,
                signed: false,
            };
        case GET_DIPLOMA_METADATA_CID.saga:
            return {
                ...state,
                university_id: action.payload.university_id,
            };
        case GET_DIPLOMA_METADATA_CID.success:
            return {
                ...state,
                ipfsLink: action.payload,
            };
        case POST_GENERATE_SMART_CONTRACT.saga:

            return {
                ...state,
                CID: action.payload.CID,
                symbol: action.payload.symbol,
                name: action.payload.name,
            };
        case POST_GENERATE_SMART_CONTRACT.success:

            return {
                ...state,
                smartContractLink: action.payload
            };
        case GET_UNIVERSITY_LIST.saga:
            return {
                ...state,
            };
        case GET_UNIVERSITY_LIST.success:
            return {
                ...state,
                universitiesList: action.payload
            };
        case PUT_VISIBILITY.saga:
            return {
                ...state,
                visibility: action.payload.visibility,
            };
        case PUT_VISIBILITY.success:
            return {
                ...state,
                visibility: action.payload.visibility,
            };
        default:
            return state;
    }
};