import { SelectAllState } from "./types";
import { SelectAllActionTypes } from "./types/actionTypes";

const initialState: SelectAllState = {
  oldProduct: {},
  newProduct: {},
  locations: [],
  isLoading: true,
};

export const selectAllReducer = (state = initialState, action: any): SelectAllState => {
  switch (action.type) {
    case SelectAllActionTypes.FETCH_SELECT_ALL_LOCATIONS:
      return {
        ...state,
        isLoading: true
      };
    case SelectAllActionTypes.FETCH_SELECT_ALL_LOCATIONS_ERROR:
      return {
        ...state,
        locations: [],
        isLoading: false,
      };
    case SelectAllActionTypes.FETCH_SELECT_ALL_LOCATIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        locations: action.payload
      };
    case SelectAllActionTypes.SET_NEW_PRODUCT:
      return {
        ...state,
        newProduct: action.payload
      };
    case SelectAllActionTypes.SET_OLD_PRODUCT:
      return {
        ...state,
        oldProduct: action.payload
      };
    default: return state;
  }
};