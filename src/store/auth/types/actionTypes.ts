import {ActionType} from "@src/store/ActionType";

export const POST_AUTH_LOGIN = new ActionType("POST_AUTH_LOGIN");
export const POST_AUTH_WITH_DS = new ActionType("POST_AUTH_WITH_DS");
export const POST_AUTH_VALIDATE_EMAIL = new ActionType("POST_AUTH_VALIDATE_EMAIL");
export const POST_VALIDATE_EMAIL = new ActionType("FETCH_VALIDATE_EMAIL");
export const POST_AUTH_REGISTER = new ActionType("POST_AUTH_REGISTER");
export const POST_RESET_PASSWORD = new ActionType("POST_RESET_PASSWORD");
export const GET_OTP = new ActionType("GET_OTP");
export const GET_PROFILE_DATA = new ActionType("GET_PROFILE_DATA");
export const POST_UPDATE_PROFILE_DATA = new ActionType("POST_UPDATE_PROFILE_DATA");
export const AUTH_LOGOUT = new ActionType("AUTH_LOGOUT");
export const POST_SAVE_XML = new ActionType("POST_SAVE_XML");
export const GET_DIPLOMA_METADATA_CID = new ActionType("GET_DIPLOMA_METADATA_CID");
export const POST_GENERATE_SMART_CONTRACT = new ActionType("POST_GENERATE_SMART_CONTRACT");
export const POST_UPLOAD_FILE = new ActionType("POST_UPLOAD_FILE");
export const GET_UNIVERSITY_LIST = new ActionType("GET_UNIVERSITY_LIST");
export const PUT_VISIBILITY = new ActionType("PUT_VISIBILITY");
export const GET_EMPLOYERS_LIST = new ActionType("GET_EMPLOYERS_LIST");