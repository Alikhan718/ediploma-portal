import { CALL_CENTER_ORDER_STATUS, ICallCenter } from "./types";
import { FETCH_CALL_CENTER_LOCATIONS_SUCCESS, FETCH_CALL_CENTER_ORDERS_SUCCESS, PUT_CALL_CENTER_ORDER_SUCCESS } from "./types/actionTypes";

const initalState: ICallCenter = {
  callcenter_id: "",
  new_orders: [],
  in_proccess_orders: [],
  locations: [],
};
export const callCenterReducer = (state = initalState, action: any): ICallCenter => {
  switch (action.type) {
    case FETCH_CALL_CENTER_ORDERS_SUCCESS:
      return {
        ...state,
        new_orders: action.payload.new_orders,
        in_proccess_orders: action.payload.in_proccess_orders,
        callcenter_id: action.payload.callcenter_id
      };
    case FETCH_CALL_CENTER_LOCATIONS_SUCCESS:
      return {
        ...state,
        locations: action.payload.locations
      };
    case PUT_CALL_CENTER_ORDER_SUCCESS:
      return {
        ...state,
        new_orders: action.payload.status === CALL_CENTER_ORDER_STATUS.NEW
          ? [...state.new_orders, action.payload]
          : state.new_orders.filter(el => el.id !== action.payload.id),

        in_proccess_orders: action.payload.status === CALL_CENTER_ORDER_STATUS.PROCESSING
          ? [...state.in_proccess_orders, action.payload]
          : state.in_proccess_orders.filter(el => el.id !== action.payload.id)
      };
    default: return state;
  }
};