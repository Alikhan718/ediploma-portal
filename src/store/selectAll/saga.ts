import { call, put, select, takeLatest } from "redux-saga/effects";
import { SelectAllActionTypes } from "./types/actionTypes";
import { setSnackbar } from "../generals/actionCreators";
import { getRequestError } from "@src/utils/getRequestError";
import { selectAllApi } from "@src/service/api";

export function* fetchProductLocationsRequest(action: any) {
  try {
    yield put({ type: SelectAllActionTypes.FETCH_SELECT_ALL_LOCATIONS });
    const menu_id = action.payload;
    const { data } = yield call(selectAllApi.getLocations, menu_id);
    yield put({ type: SelectAllActionTypes.FETCH_SELECT_ALL_LOCATIONS_SUCCESS, payload: data });

  } catch (e) {
    yield put({ type: SelectAllActionTypes.FETCH_SELECT_ALL_LOCATIONS_ERROR });
    yield put(setSnackbar({ status: "error", message: getRequestError(e), visible: true }));

  }
}


export function* selectAllSaga() {
  yield takeLatest(SelectAllActionTypes.FETCH_SELECT_ALL_LOCATIONS_SAGA, fetchProductLocationsRequest);
}