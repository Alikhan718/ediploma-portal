import { Action } from "redux";
import { fetchOrdersReqBodyType, Order, OrdersSuccessPayload } from "./types";
import { OrdersActionTypes } from "./types/actionTypes";


// ACTION INTERFACE 

export interface fetchOrdersInterface extends Action<OrdersActionTypes> {
  type: OrdersActionTypes.FETCH_ORDERS_SAGA,
  payload: fetchOrdersReqBodyType
}

export interface fetchOrdersSuccessInterface extends Action<OrdersActionTypes> {
  type: OrdersActionTypes.FETCH_ORDERS_SUCCESS,
  payload: OrdersSuccessPayload
}

export interface fetchOrdersErrorInterface extends Action<OrdersActionTypes> {
  type: OrdersActionTypes.FETCH_ORDERS_ERROR
}


//  ACTION CREATORS 

export const fetchOrders = ({ page = 1, field = null, direction = null, q = null, only_active = false, delivery_service = null, status = null, date_from = null, date_to = null }: fetchOrdersReqBodyType): fetchOrdersInterface => {

  return {
    type: OrdersActionTypes.FETCH_ORDERS_SAGA,
    payload: {
      page, field, direction, q, only_active, delivery_service, status, date_from, date_to
    }
  };
};

export const fetchOrdersSuccess = (payload: OrdersSuccessPayload): fetchOrdersSuccessInterface => ({
  type: OrdersActionTypes.FETCH_ORDERS_SUCCESS,
  payload
});

export const fetchOrdersError = (): fetchOrdersErrorInterface => ({
  type: OrdersActionTypes.FETCH_ORDERS_ERROR
});

// ORDERS ALL ACTIONS 

export type OrdersActions = fetchOrdersInterface | fetchOrdersSuccessInterface | fetchOrdersErrorInterface;