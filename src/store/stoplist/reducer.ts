import { NavigateFunction } from "react-router-dom";
import { DISABLE_PRODUCT_SAGA, ENABLE_PRODUCT_SAGA, FETCH_AGGREGATORS_SUCCESS, GET_PRODUCT_STORES_SAGA, GET_PRODUCT_STORES_SUCCESS, GET_SECTION_LIST_ERROR, GET_SECTION_LIST_SUCCESS, GET_STOP_LIST_AGGREGATORS_SAGA, GET_STOP_LIST_SAGA, GET_STOP_LIST_SUCCESS, SEARCH_TEXT_CHANGE, SET_IS_FETCHING, SWITCH_STOP_LIST_PRODMODE, UPDATE_ALL_STOP_LISTS_SAGA, UPDATE_STOP_LISTS } from "./types/actionTypes";
import { IStopListState } from "./types/types";


const initialState: IStopListState = {

  stopLists: [],
  aggregators: [],
  productStores: [],
  active_aggregtor_name: null,
  isFetching: false,
  search_text: "",
  page: 1,
  page_count: 1,
  per_page: 10,
  active_section_name: null
};

const stopListReducer = (state = initialState, action: any): IStopListState => {
  switch (action.type) {
    case GET_SECTION_LIST_SUCCESS:
      return {
        ...state,
        active_section_name: action.payload.section_name
      };
    case GET_STOP_LIST_SUCCESS:
      return {
        ...state,
        stopLists: action.payload.data,
        active_section_name: action.payload.section_name,
        active_aggregtor_name: action.payload.menu_id,
        search_text: action.payload.search_text,
        page: action.payload.page,
        page_count: action.payload.page_count
      };
    case FETCH_AGGREGATORS_SUCCESS:
      return {
        ...state,
        aggregators: action.payload,
        active_aggregtor_name: action.payload[0].menu_id
      };
    case GET_SECTION_LIST_ERROR:
      return {
        ...state,
        stopLists: [],
        page: 1,
        page_count: 1,
      };
    case GET_PRODUCT_STORES_SUCCESS:
      return {
        ...state,
        productStores: action.payload.data,
        isFetching: false
      };
    case SEARCH_TEXT_CHANGE:
      return {
        ...state,
        search_text: action.payload
      };

    case SET_IS_FETCHING:
      return {
        ...state,
        isFetching: action.payload
      };
    default: return state;
  }
};
export default stopListReducer;

// FIXME: тут должен быть орган айди
export const fetchStopListAggregators = (): any => {
  return { type: GET_STOP_LIST_AGGREGATORS_SAGA };
};

export const fetchStopList = (section_name: string, page: number, menu_id: string, available?: boolean, search_text?: string,) => ({
  type: GET_STOP_LIST_SAGA,
  payload: { section_name, page, available, search_text, menu_id }
});

export const switchProdMode = (rest_id: string, product_id: string, is_available: boolean) => ({
  type: SWITCH_STOP_LIST_PRODMODE,
  payload: { rest_id, product_id, is_available }
});

export const updateStopLists = () => ({ type: UPDATE_STOP_LISTS });

export const updateAllStopLists = () => ({ type: UPDATE_ALL_STOP_LISTS_SAGA });

export const getProductStores = (product_id: string, is_available: boolean) => ({ type: GET_PRODUCT_STORES_SAGA, payload: { product_id, is_available } });

export const enableProduct = (product_id: string, payload: any[], navigate: NavigateFunction) => ({ type: ENABLE_PRODUCT_SAGA, payload: { product_id, payload, navigate } });

export const disableProduct = (product_id: string, payload: any[], navigate: NavigateFunction) => ({ type: DISABLE_PRODUCT_SAGA, payload: { product_id, payload, navigate } });

export const searchTextChange = (search_text: string) => ({ type: SEARCH_TEXT_CHANGE, payload: search_text });