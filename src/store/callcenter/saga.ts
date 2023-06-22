import { callCenterApi } from "@src/service/api";
import { getRequestError } from "@src/utils/getRequestError";
import { call, put, select, takeLatest } from "redux-saga/effects";
import { setGlobalLoader, setSnackbar } from "../generals/actionCreators";
import { LoadingStatus } from "../generals/types";
import { fetchCallCenterOrdersSuccess } from "./actionCreators";
import { CALL_CENTER_ORDER_STATUS } from "./types";
import { FETCH_CALL_CENTER_LOCATIONS_SAGA, FETCH_CALL_CENTER_LOCATIONS_SUCCESS, FETCH_CALL_CENTER_ORDERS_SAGA, FETCH_CALL_CENTER_ORDERS_SUCCESS, POST_ORDER_TO_LOCATION_SAGA, PUT_CALL_CENTER_ORDER_SAGA, PUT_CALL_CENTER_ORDER_SUCCESS } from "./types/actionTypes";

export function* fetchCallCenterOrdersRequest() {
  try {
    yield put(setGlobalLoader(LoadingStatus.LOADING));
    const { data } = yield call(callCenterApi.getOrders);
    // yield put(fetchCallCenterLocations());

    yield put(fetchCallCenterOrdersSuccess(data.orders, data.callcenter_id));
    yield put(setGlobalLoader(LoadingStatus.SUCCESS));
  } catch (e) {
    yield put(setSnackbar({ visible: true, message: getRequestError(e), status: "error" }));
    yield put(setGlobalLoader(LoadingStatus.ERROR));
  }
}
export function* fetchCallCenterLocationsRequest() {
  try {
    yield put(setGlobalLoader(LoadingStatus.LOADING));
    const { data } = yield call(callCenterApi.getLocations);
    yield put({ type: FETCH_CALL_CENTER_LOCATIONS_SUCCESS, payload: data });
    yield put(setGlobalLoader(LoadingStatus.SUCCESS));
  } catch (e) {
    yield put(setGlobalLoader(LoadingStatus.ERROR));
    yield put(setSnackbar({ visible: true, message: getRequestError(e), status: "error" }));
  }
}
export function* putCallCenterOrderRequest(action: any) {
  try {
    const { order_id, status } = action.payload;
    // const {new_orders,in_proccess_orders} = yield select(store => store.callCenter);
    const { data } = yield call(callCenterApi.putOrders, order_id, { status });
    yield put({ type: PUT_CALL_CENTER_ORDER_SUCCESS, payload: data });
    // status got it 
  } catch (e) {
    yield put(setSnackbar({ visible: true, message: getRequestError(e), status: "error" }));

  }
}
export function* postOrderToLocationRequest(action: any) {
  try {
    const { data } = yield call(callCenterApi.postOrders, action.payload);

  } catch (e) {
    yield put(setSnackbar({ visible: true, message: getRequestError(e), status: "error" }));
  }
}

export function* callCenterSagas() {
  yield takeLatest(FETCH_CALL_CENTER_ORDERS_SAGA, fetchCallCenterOrdersRequest);
  yield takeLatest(FETCH_CALL_CENTER_LOCATIONS_SAGA, fetchCallCenterLocationsRequest);
  yield takeLatest(PUT_CALL_CENTER_ORDER_SAGA, putCallCenterOrderRequest);
  yield takeLatest(POST_ORDER_TO_LOCATION_SAGA, postOrderToLocationRequest);
} 
