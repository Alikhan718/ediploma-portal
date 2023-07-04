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
  FETCH_AUTH_REGISTER_SUCCESS, FETCH_AUTH_VALIDATE_EMAIL_SAGA, FETCH_AUTH_VALIDATE_EMAIL_SUCCESS
} from "./types/actionTypes";
const initialState = {
  userRole: "Guest",
  otpSent: false,
  isLoading: false,
  redirectToLogin: false
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
      case FETCH_AUTH_LOGIN_SUCCESS:
        const token = action.payload.token;
        console.log("TOKEN: ", token);
        localStorage.setItem("token", token);
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
        isLoading: false
      };
      case FETCH_AUTH_REGISTER_SAGA:
      return {
        ...state,
        email: action.payload.email,
        password: action.payload.password,
        companyName: action.payload.companyName,
        isLoading: false
      };
      case FETCH_AUTH_REGISTER_SUCCESS:
      return {
        ...state,
        payload: action.payload,
        otpSent: true,
        isLoading: false
      };
    case FETCH_AUTH_VALIDATE_EMAIL_SUCCESS:
      return {
        ...state,
        otpSent: false,
        redirectToLogin: true,
        isLoading: false
      };
      case FETCH_AUTH_REGISTER_ERROR:
      return {
        ...state,
        payload: action.payload,
        isLoading: false
      };
    case FETCH_AUTH_ITEMS_ERROR:
      return {
        ...state,
        isLoading: false
      };
    default: return state;
  }
};