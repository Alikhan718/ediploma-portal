import { MenuListActions } from "./actionCreators";
import { MenuListState } from "./types";
import { MenuListActionTypes } from "./types/actionTypes";

const initialState: MenuListState = {
  menuList: [],
  available_uploads: null,
  updatedPriceList: [],
  filter: {
    field: "delivery",
    search: ""
  },

  showUpdateModal: false,
  isFetching: false,
  page: 1,
  page_count: 1,

};


const menuListReducer = (state = initialState, action: MenuListActions): MenuListState => {
  switch (action.type) {
    case MenuListActionTypes.FETCH_MENU_LIST_SUCCESS:
      return {
        ...state,
        menuList: action.payload.data,
      };
    case MenuListActionTypes.FETCH_PUBLICATION_COUNT_SUCCESS:
      return {
        ...state,
        available_uploads: action.payload
      };
    case MenuListActionTypes.CLEAR_MENU_LIST:
      return {
        ...state,
        menuList: [],
        page: 1,
        page_count: 0
      };
    case MenuListActionTypes.CLOSE_PUBLICATION_COUNT_ALERT:
      return {
        ...state,
        available_uploads: state.available_uploads
          ? state.available_uploads
            ?.filter(item => (item.aggregator_name !== action.payload.aggregator_name && item.count !== action.payload.count))
          : null
      };
    case MenuListActionTypes.OPEN_UPLOAD_MODAL:
      return {
        ...state,
        showUpdateModal: true
      };
    case MenuListActionTypes.CLOSE_UPLOAD_MODAL:
      return {
        ...state,
        showUpdateModal: false
      };
    default: return state;
  }
};

export default menuListReducer;