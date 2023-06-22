import {
  CLEAR_MATCH_MENU_ITEMS,
  GET_MATCH_MENU_PRODUCTS_SAGA, GET_MATCH_MENU_PRODUCTS_SUCCESS, GET_MATCH_MENU_SECTIONS_SAGA, GET_MATCH_MENU_SECTIONS_SUCCESS,
  IS_MATCHED_ALL_SAGA, PARSE_MENU_ERROR, PARSE_MENU_FETCH, PARSE_MENU_SAGA, PARSE_MENU_SUCCESS, UPLOAD_MENU_SAGA, UPLOAD_MENU_SUCCESS
} from "./types/actionTypes";
import { ICreateMenuState } from "./types/types";

const initalState: ICreateMenuState = {
  menus: [],
  loading: false,
  menuID: null,
  activeSectionName: "",

  sections: [],
  aggregator: [],
  pos: [],

  page: 1,
  page_count: 1
};

const createMenuReducer = (state = initalState, action: any): ICreateMenuState => {
  switch (action.type) {
    case PARSE_MENU_FETCH:
      return {
        ...state,
        menus: [],
        loading: true
      };
    case PARSE_MENU_SUCCESS:
      return {
        ...state,
        menus: action.payload,
        loading: false
      };
    case PARSE_MENU_ERROR:
      return {
        ...state,
        menus: [],
        loading: false
      };
    case UPLOAD_MENU_SUCCESS:
      return {
        ...state,
        menuID: action.payload
      };
    case GET_MATCH_MENU_SECTIONS_SUCCESS:
      return {
        ...state,
        sections: action.payload,
        activeSectionName: action.payload[0].id
      };
    case GET_MATCH_MENU_PRODUCTS_SUCCESS:
      return {
        ...state,
        activeSectionName: action.payload.section_name,
        pos: action.payload.pos,
        aggregator: action.payload.aggregator,
        page: action.payload.pagination.page,
        page_count: action.payload.pagination.page_count
      };
    // case MATCH_MENU_SUCCESS:
    //   return {
    //     ...state,
    //     aggregator: state.aggregator.map(el => {
    //       if (el.id === action.payload) {
    //         return { ...el, sync: true };
    //       }
    //       return el;
    //     })
    //   };
    case CLEAR_MATCH_MENU_ITEMS:
      return {
        ...state,
        sections: [],
        aggregator: [],
        pos: [],
        activeSectionName: "",
        page: 1,
        page_count: 1
      };
    default: return state;
  }
};

// 1 PAGE
export const parseMenu = (payload: any) => ({
  type: PARSE_MENU_SAGA,
  payload
});
export const uploadMenu = (payload: any) => ({
  type: UPLOAD_MENU_SAGA,
  payload
});
// 2 PAGE
export const getMatchMenuSections = (menu_id: string) => ({
  type: GET_MATCH_MENU_SECTIONS_SAGA,
  payload: menu_id
});
export const getMatchMenuProducts = (payload: any) => ({
  type: GET_MATCH_MENU_PRODUCTS_SAGA,
  payload
});
export const isMatchedAll = (payload: any) => ({
  type: IS_MATCHED_ALL_SAGA,
  payload
});
export const clearMatchMenuItems = () => ({
  type: CLEAR_MATCH_MENU_ITEMS
});
export const parseMenuSuccess = (data: any) => ({
  type: PARSE_MENU_SUCCESS,
  payload: data
});


export default createMenuReducer;