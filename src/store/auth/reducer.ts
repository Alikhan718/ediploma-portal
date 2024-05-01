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
    GET_EMPLOYERS_LIST,
    GET_EMPLOYERS_SEARCH,
    CANCEL_EMPLOYERS_FILTER,
    GET_EMPLOYER_DETAILS,
    GET_GENERATE_RESUME,
} from "./types/actionTypes";

interface AuthInterface {
    userRole: string,
    otpSent: boolean,
    isLoading: boolean,
    avatarIsLoading: boolean,
    resume_loading: boolean,
    signed: boolean,
    ipfsLink: string,
    smartContractLink: string,
    redirectToLogin: boolean,
    forgotStep: number,
    registrationStep: number,
    userState: any,
    image_link: string | null,
    universitiesList: any[],
    visibility: any,
    employersList: any[],
    field: string,
    filtered_names: string[],
    text: string,
    employerDetails: any,
};

const initialState: AuthInterface = {
    userRole: localStorage.getItem("userRole") ?? "Guest",
    otpSent: false,
    isLoading: false,
    avatarIsLoading: false,
    resume_loading: true,
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
    employersList: [],
    field: "",
    filtered_names: [],
    text: "",
    employerDetails: {},
};

export const authReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case POST_UPLOAD_FILE.saga:
            return {
                ...state,
                avatarIsLoading: true,
                image_link: null,
            };
        case POST_UPLOAD_FILE.success:
            return {
                ...state,
                avatarIsLoading: false,
                image_link: action.data,
            };
        case POST_UPLOAD_FILE.error:
            return {
                ...state,
                avatarIsLoading: false,
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
                ipfsLink: action.payload.cid,
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
        case GET_EMPLOYERS_LIST.saga:
            return {
                ...state,
            };
        case GET_EMPLOYERS_LIST.success:
            let temp_employers = [];
            if (state.filtered_names.length) {
                temp_employers = action.payload.filter((employer: any) => state.filtered_names.includes(employer.name));
            } else {
                temp_employers = action.payload;
            }
            return {
                ...state,
                employersList: temp_employers,
                filtered_names: state.filtered_names,
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
        case GET_EMPLOYERS_SEARCH.saga:
            return {
                ...state,
                text: action.payload ? action.payload.text : '',
                field: action.payload ? action.payload.field: '',
            };
        case GET_EMPLOYERS_SEARCH.success:
            return {
                ...state,
                filtered_names: action.names,
            };
        case CANCEL_EMPLOYERS_FILTER.saga:
            return {
                ...state,
                filtered_names: []
            };
        case GET_GENERATE_RESUME.saga:
            return {
                ...state,
                resume_loading: true,
            };
        case GET_GENERATE_RESUME.success:
            return {
                ...state,
                resume_loading: false,
            };
        case GET_EMPLOYER_DETAILS.saga:
            return {
                ...state,
                name: action.payload.name,
            };
        case GET_EMPLOYER_DETAILS.success:
            return {
                ...state,
                employerDetails: action.data,
            };
        default:
            return state;
    }
};