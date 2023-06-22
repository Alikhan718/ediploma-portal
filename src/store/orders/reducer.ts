// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrdersActionTypes } from "./types/actionTypes";
import { OrdersState } from "./types";
import { OrdersActions } from "./actionCreators";

const initialState: OrdersState = {
  orders: [],
  only_active: false,
  field: null,
  direction: null,
  page: 1,
  per_page: 10,
  page_count: 0,
  total_count: 0
};


const ordersReducer = (state = initialState, action: OrdersActions): OrdersState => {
  switch (action.type) {

    case OrdersActionTypes.FETCH_ORDERS_SUCCESS:
      console.log(action.payload.metadata);
      return {
        ...state,
        orders: action.payload.data,
        page: action.payload.metadata.page,
        page_count: action.payload.metadata.page_count,
        per_page: action.payload.metadata.per_page,
        total_count: action.payload.metadata.total_count,
        field: action.payload.field,
        direction: action.payload.direction
      };
    case OrdersActionTypes.FETCH_ORDERS_ERROR:
      return {
        ...state,
        orders: [],
        page: 1,
        per_page: 10,
        page_count: 0,
        total_count: 0
      };
    default: return state;
  }
};
export default ordersReducer;


