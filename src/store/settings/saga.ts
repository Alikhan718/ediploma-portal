import { settingsApi } from "@src/service/api";

import { put, call, takeLatest, select } from "redux-saga/effects";
import { setGlobalLoader, setSnackbar } from "../generals/actionCreators";
import { LoadingStatus } from "../generals/types";
import { FETCH_PICKUP_TIME, FETCH_PICKUP_TIME_SUCCESS, UPDATE_PICKUP_TIME } from "@src/store/settings/types/actionTypes";
import { fetchTime } from "@src/store/settings/reducer";

export function* fetchPickupTimeRequest(action: any): any {
	try {
		yield put(setGlobalLoader(LoadingStatus.LOADING));
		const rest_id = action.payload;
		const { data } = yield call(settingsApi.getPickupTime, rest_id);
		yield put({ type: FETCH_PICKUP_TIME_SUCCESS, payload: { data: data.time } });
		yield put(setGlobalLoader(LoadingStatus.SUCCESS));
	} catch (e: any) {
		yield put(setGlobalLoader(LoadingStatus.ERROR));
	}
}

export function* updatePickupTimeRequest(action: any): any {
	try {
		yield put(setGlobalLoader(LoadingStatus.LOADING));

		yield call(settingsApi.updatePickupTime, action.payload.resti_id, action.payload.time);

		yield put(fetchTime(action.payload.resti_id));

		yield put(setGlobalLoader(LoadingStatus.SUCCESS));
	} catch (e: any) {
		yield put(setGlobalLoader(LoadingStatus.ERROR));
	}
}

export function* settingsSaga() {
	yield takeLatest(FETCH_PICKUP_TIME, fetchPickupTimeRequest);
	yield takeLatest(UPDATE_PICKUP_TIME, updatePickupTimeRequest);
}
