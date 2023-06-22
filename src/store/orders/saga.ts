import { call, put, takeLatest } from 'redux-saga/effects';

import { ordersApi } from '@src/service/api';
import { getRequestError } from '@src/utils/getRequestError';
import { setGlobalLoader, setSnackbar } from '../generals/actionCreators';
import { LoadingStatus } from '../generals/types';
import { fetchOrdersInterface, fetchOrdersSuccess } from './actionCreators';
import { OrdersActionTypes } from './types/actionTypes';

export function* fetchOrdersRequest(action: fetchOrdersInterface): any {
  console.log(action.payload);
  
  let query = `&only_active=${action.payload.only_active === null ? false : action.payload.only_active}`;
  try {
    yield put(setGlobalLoader(LoadingStatus.LOADING));
    // sorting
    if (action.payload.field) {
      query += `&sort_by=${action.payload.field}&sort_order=${action.payload.direction}`;
    } // SEARCH
    if (action.payload.q) {
      query += `&q=${action.payload.q}`;
    }
    if (action.payload.delivery_service) {
      query += `&delivery_service=${action.payload.delivery_service}`;
    }
    if (action.payload.status) {
      query += `&status=${action.payload.status}`;
    }
    if (action.payload.date_from) {
      query += `&date_from=${action.payload.date_from}`;
    }
    if (action.payload.date_to) {
      query += `&date_to=${action.payload.date_to}`;
    }

    const currLocation = localStorage.getItem("currLocation");
    const { data } = yield call(ordersApi.getOrders, action.payload.page, query, currLocation || '');

    const obj = { ...data, ...action.payload };
    yield put(fetchOrdersSuccess(obj));

    yield put(setGlobalLoader(LoadingStatus.SUCCESS));
  } catch (e: any) {

    yield put(setSnackbar({ visible: true, status: "error", message: getRequestError(e) }));
    yield put(setGlobalLoader(LoadingStatus.ERROR));
  }
}

export function* ordersSaga() {
  yield takeLatest(OrdersActionTypes.FETCH_ORDERS_SAGA, fetchOrdersRequest);
}