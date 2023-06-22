import {
  FETCH_ATTRIBUTES_AND_PRODUCTS_PROCESS,
  FETCH_ATTRIBUTES_AND_PRODUCTS_ERROR,
  FETCH_ATTRIBUTES_AND_PRODUCTS_SUCCESS,
  CLEAR_ATTRIBUTE_STATE,
  FETCH_EXIST_ATTRIBUTE_GROUP_SUCCESS,
  FETCH_ATTRIBUTES_DETAIL_SUCCESS,
  FETCH_ATTRIBUTES_GROUP_PRODUCTS_PROCESS,
  FETCH_ATTRIBUTES_GROUP_PRODUCTS_SUCCESS,
  FETCH_ATTRIBUTES_GROUP_PRODUCTS_ERROR, UPDATE_ATTRIBUTE_GROUP_PROCESS, UPDATE_ATTRIBUTE_GROUP_ERROR
} from "./types/types";

interface AttributeInterface {
  attribute_list: Array<any>,
  product_list: Array<any>,
  attribute_group: any,
  attribute_group_list: Array<any>,
  attribute_products: { [index: string]: any },
  isFetching: boolean
}

const initialState: AttributeInterface = {
  attribute_list: [],
  product_list: [],
  attribute_group: {},
  attribute_group_list: [],
  attribute_products: {},
  isFetching: false
};

const attributeReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_ATTRIBUTES_AND_PRODUCTS_PROCESS:
      return { ...state, isFetching: true };
    case FETCH_ATTRIBUTES_AND_PRODUCTS_ERROR:
      return { ...state, attribute_list: [], product_list: [], isFetching: false };
    case FETCH_ATTRIBUTES_AND_PRODUCTS_SUCCESS:
      return {
        ...state,
        attribute_list: action.payload.attributes,
        product_list: action.payload.products,
        attribute_group: action.payload,
        isFetching: false
      };
    case FETCH_ATTRIBUTES_DETAIL_SUCCESS:
      return {
        ...state,
        attribute_list: action.payload.pos_product_attributes,
        product_list: action.payload.pos_products,
        attribute_group: action.payload,
        isFetching: false
      };
    case FETCH_EXIST_ATTRIBUTE_GROUP_SUCCESS:
      return {
        ...state,
        attribute_group_list: action.payload,
        isFetching: false
      };
    case CLEAR_ATTRIBUTE_STATE:
      return {
        ...state,
        attribute_group: {}
      };
    case FETCH_ATTRIBUTES_GROUP_PRODUCTS_SUCCESS:

      return {
        ...state,
        attribute_products: { ...state.attribute_products, [action.payload.id]: action.payload.products },
        isFetching: false
      };
    case UPDATE_ATTRIBUTE_GROUP_PROCESS:
      return { ...state, isFetching: true };
    case UPDATE_ATTRIBUTE_GROUP_ERROR:
      return { ...state, attribute_list: [], product_list: [], isFetching: false };
    default: return state;
  }
};
export default attributeReducer;
