import { CALL_CENTER_ORDER_STATUS, ICallCenterOrder } from "./types";
import { FETCH_CALL_CENTER_LOCATIONS_SAGA, FETCH_CALL_CENTER_ORDERS_SAGA, FETCH_CALL_CENTER_ORDERS_SUCCESS, POST_ORDER_TO_LOCATION_SAGA, PUT_CALL_CENTER_ORDER_SAGA } from "./types/actionTypes";

export const fetchCallCenterOrders = () => ({
  type: FETCH_CALL_CENTER_ORDERS_SAGA,
});
export const fetchCallCenterOrdersSuccess = (orders: ICallCenterOrder[], callcenter_id: string) => {
  const new_orders = [];
  const in_proccess_orders = [];

  for (let i = 0; i < orders.length; i++) {
    if (orders[i].status === CALL_CENTER_ORDER_STATUS.NEW) {
      new_orders.push(orders[i]);
    } else {
      in_proccess_orders.push(orders[i]);
    }
  }
  return {
    type: FETCH_CALL_CENTER_ORDERS_SUCCESS,
    payload: { new_orders, in_proccess_orders, callcenter_id }
  };

};
export const fetchCallCenterLocations = () => ({
  type: FETCH_CALL_CENTER_LOCATIONS_SAGA
});

export const putCallCenterOrders = (payload: any) => ({
  type: PUT_CALL_CENTER_ORDER_SAGA,
  payload
});
export const postOrderToLocation = (payload: any) => ({
  type: POST_ORDER_TO_LOCATION_SAGA,
  payload
});