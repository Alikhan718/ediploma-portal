import {
  FETCH_AUTH_ITEMS,
  FETCH_AUTH_ITEMS_ERROR,
  FETCH_AUTH_ITEMS_SUCCESS,
  FETCH_AUTH_LOGIN_ERROR, FETCH_AUTH_LOGIN_SAGA,
  FETCH_AUTH_LOGIN_SUCCESS, FETCH_AUTH_REGISTER_ERROR, FETCH_AUTH_REGISTER_SAGA, FETCH_AUTH_REGISTER_SUCCESS
} from "./types/actionTypes";

const initialState = {
  userRole: "Guest",
  isLoading: false
};

export const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
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
        isLoading: false
      };
      case FETCH_AUTH_LOGIN_SUCCESS:
        console.log(action);
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