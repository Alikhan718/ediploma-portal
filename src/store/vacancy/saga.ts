import {vacancyApi} from "@src/service/api";
import {getRequestError} from "@src/utils/getRequestError";
import {all, call, put, take, takeLatest} from "redux-saga/effects";
import {setSnackbar} from "../generals/actionCreators";
import {
    POST_APPLY, GET_APPLICATIONS
} from "./types/actionTypes";
import {handleResponseBase} from "@src/store/sagas";

export function* fetchApplyRequest(action: any) {
    try {
        console.log(action.payload);
        const {data} = yield call(vacancyApi.postApply, action.payload);
        yield put({type: POST_APPLY.success, payload: data});
    } catch (e) {
        yield put(setSnackbar({visible: true, message: getRequestError(e), status: "error"}));
        yield put({type: POST_APPLY.error});
    }
}

export function* fetchApplicationsRequest(action: any) {
    try {
        const {data} = yield call(vacancyApi.getApplications);
        yield put({type: GET_APPLICATIONS.success, payload: data});
    } catch (e) {
        yield put(setSnackbar({visible: true, message: getRequestError(e), status: "error"}));
        yield put({type: GET_APPLICATIONS.error});
    }
};

export function* vacancySaga() {
    yield all([
        takeLatest(POST_APPLY.saga, fetchApplyRequest),
        takeLatest(GET_APPLICATIONS.saga, fetchApplicationsRequest),
    ]);
};