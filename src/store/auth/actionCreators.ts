import {
    POST_AUTH_REGISTER,
    GET_OTP,
    POST_RESET_PASSWORD,
    POST_AUTH_LOGIN,
    POST_AUTH_VALIDATE_EMAIL,
    POST_AUTH_WITH_DS,
    POST_VALIDATE_EMAIL,
    POST_SAVE_XML,
    GET_DIPLOMA_METADATA_CID,
    AUTH_LOGOUT,
    GET_PROFILE_DATA,
    POST_UPDATE_PROFILE_DATA,
    POST_UPLOAD_FILE,
    GET_UNIVERSITY_LIST,
    PUT_VISIBILITY,
    GET_EMPLOYERS_LIST,
    GET_EMPLOYERS_SEARCH,
    CANCEL_EMPLOYERS_FILTER, GET_GENERATE_RESUME,
} from "./types/actionTypes";

export const fetchLoginRequest = (payload: any) => ({
    type: POST_AUTH_LOGIN.saga,
    payload
});

export const fetchLogoutAction = () => ({
    type: AUTH_LOGOUT.saga
});

export const fetchAuthDSRequest = (payload: any) => ({
    type: POST_AUTH_WITH_DS.saga,
    payload
});

export const fetchSaveXmlRequest = (payload: any) => ({
    type: POST_SAVE_XML.saga,
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

export const fetchGetDiplomaCid = (payload: any) => ({
    type: GET_DIPLOMA_METADATA_CID.saga,
    payload
});

export const fetchUserProfile = () => ({
    type: GET_PROFILE_DATA.saga
});

export const fetchGenerateResume = () => ({
    type: GET_GENERATE_RESUME.saga
});

export const fetchUpdateUserProfile = (payload: any) => ({
    type: POST_UPDATE_PROFILE_DATA.saga,
    payload
});

export const fetchPostGenerateSmartContract = (payload: any) => ({
    type: GET_DIPLOMA_METADATA_CID.saga,
    payload
});

export const fetchUploadFile = (payload: any) => ({
    type: POST_UPLOAD_FILE.saga,
    payload
});

export const fetchUniversitiesList = () => ({
    type: GET_UNIVERSITY_LIST.saga,
});

export const fetchVisibility = (payload: any) => ({
    type: PUT_VISIBILITY.saga,
    payload
});

export const fetchEmployersList = (payload:any = null) => ({
    type: GET_EMPLOYERS_LIST.saga,
    payload
});

export const fetchEmployersSearch = (payload: any) => ({type: GET_EMPLOYERS_SEARCH.saga, payload});

export const cancelEmployerFilters = () => ({
    type: CANCEL_EMPLOYERS_FILTER.saga
});