import { MenuState } from "./types";
import {
  CLEAR_MENU_PRODUCT,
  FETCH_DEFAULT_ATTRIBUTE_LIST_SUCCESS,
  FETCH_MENU_ITEM_SUCCESS,
  FETCH_MENU_PRODUCTS_SUCCESS,
  FETCH_MENU_PRODUCT_SUCCESS,
  FETCH_MENU_SECTION_ERROR,
  FETCH_MENU_SECTION_SUCCESS,
  MATCH_MENU_SUCCESS,
  SET_BTN_SUBMIT_IN_PROGRESS_STATUS,
  SET_CREATE_PRODUCT_ALERT_MODAL,
  SET_LOADING_STATUS,
  FETCH_MENU_PRODUCTS_SAGA,
  ADD_NEW_COLLECTION_SUCCESS,
  ADD_NEW_CATEGORY_SUCCESS,
  HANDLE_COLLECTION_SUCCESS,
  FETCH_MENU_COLLECTIONS_SUCCESS,
  CLEAR_MENU_COLLECTIONS_SECTIONS_PRODUCTS,

} from "./types/actionTypes";

const initialState: MenuState = {

  menuItem: {},
  products: [],


  sections: [],
  collections: [],

  active_section_name: "",
  active_collection_name: "",

  menuProduct: {},
  productSection: [],
  pos_products_matching: [],
  pos_products: [],
  pos_attributes: [],
  alertModal: false,

  locations: [],

  search_name: "",

  field: "price",
  sort_order: 1,
  section_id: "",
  attribute_groups: [],
  default_attributes: [],
  default_attribute_list: [],
  loading: false,
  btnSubmitInProgress: false,



  page: 1,
  page_count: 1,

};


const menuReducer = (state = initialState, action: any): MenuState => {
  switch (action.type) {
    case FETCH_MENU_ITEM_SUCCESS:
      return {
        ...state,
        menuItem: action.payload
      };
    case FETCH_MENU_SECTION_SUCCESS:
      return {
        ...state,
        sections: action.payload,
      };
    case FETCH_MENU_COLLECTIONS_SUCCESS:
      return {
        ...state,
        collections: action.payload,
        active_collection_name: action.payload[0].id,
        sections: action.payload[0].sections,
        active_section_name: action.payload[0].sections[0].id
      };

    case HANDLE_COLLECTION_SUCCESS:
      return {
        ...state,
        sections: action.payload.sections,
        active_collection_name: action.payload.active_collection_name,
        active_section_name: action.payload.active_section_name
      };

    case FETCH_MENU_SECTION_ERROR:
      return {
        ...state,
        productSection: [],
        products: []
      };
    case FETCH_MENU_PRODUCTS_SAGA:
      return {
        ...state,
        search_name: action.payload.search_name,
      };
    case FETCH_MENU_PRODUCTS_SUCCESS:

      return {
        ...state,
        products: action.payload.aggregator,
        pos_products_matching: action.payload.pos,
        active_section_name: action.payload.section_name,
        page: action.payload.pagination.page,
        page_count: action.payload.pagination.page_count,
        section_id: action.payload.section_name,
        sort_order: action.payload.sort_order ?? 1,
        field: action.payload.field ?? "price"
      };
    case CLEAR_MENU_COLLECTIONS_SECTIONS_PRODUCTS:
      return {
        ...state,
        products: [],
        sections: [],
        collections: [],
        active_collection_name: "",
        active_section_name: "",
        page: 1,
        page_count: 1
      };

    case FETCH_MENU_PRODUCT_SUCCESS:
      return {
        ...state,
        menuProduct: action.payload.product,
        productSection: action.payload.sections,
        pos_products: action.payload.pos_products,
        locations: action.payload.locations,
        attribute_groups: action.payload.attribute_groups,
        default_attributes: action.payload.default_attributes,
        pos_attributes: action.payload.pos_attributes
      };
    case CLEAR_MENU_PRODUCT:
      return {
        ...state,
        menuProduct: {},
        productSection: [],
        pos_products: [],
        attribute_groups: [],
        default_attributes: []
      };
    case MATCH_MENU_SUCCESS:
      return {
        ...state,
        products: state.products.map((el: any) => {
          if (el.id === action.payload) {
            return { ...el, sync: true, id: action.pos_product_id };
          }
          return el;
        })
      };
    case FETCH_DEFAULT_ATTRIBUTE_LIST_SUCCESS:
      return {
        ...state,
        default_attribute_list: action.payload
      };
    case SET_BTN_SUBMIT_IN_PROGRESS_STATUS:
      return {
        ...state,
        btnSubmitInProgress: action.payload
      };
    case SET_LOADING_STATUS:
      return {
        ...state,
        loading: Boolean(action.payload)
      };
    case SET_CREATE_PRODUCT_ALERT_MODAL:
      return {
        ...state,
        alertModal: Boolean(action.payload)
      };
    case ADD_NEW_COLLECTION_SUCCESS:
      return {
        ...state,
        sections: [...state.sections, { LastID: "", collection: "", description: null, name: "New Collection", id: action.payload.section_id, is_deleted: false, section_order: 0, image_url: "", sections: [] }]
      };
    default: return state;
  }
};

export default menuReducer;
