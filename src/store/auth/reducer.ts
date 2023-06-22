import { FETCH_AUTH_ITEMS, FETCH_AUTH_ITEMS_ERROR, FETCH_AUTH_ITEMS_SUCCESS } from "./types/actionTypes";

const initialState = {
  userRole: "Callcenter",
  isLoading: true
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
    case FETCH_AUTH_ITEMS_ERROR:
      return {
        ...state,
        isLoading: false
      };
    default: return state;
  }
};