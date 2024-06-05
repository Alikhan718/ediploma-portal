import {vacancyApi} from "@src/service/api";
import {getRequestError} from "@src/utils/getRequestError";
import {all, call, put, take, takeLatest} from "redux-saga/effects";
import {setSnackbar} from "../generals/actionCreators";
import {
    POST_APPLY, GET_APPLICATIONS, PUT_STATUS, POST_INVITE
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

export function* fetchStatusRequest(action: any) {
    try {
        const {data} = yield call(vacancyApi.putStatus, action.payload);
        yield put({type: PUT_STATUS.success, payload: data});
    } catch (e) {
        yield put(setSnackbar({visible: true, message: getRequestError(e), status: "error"}));
        yield put({type: PUT_STATUS.error});
    }
};

export function* fetchInviteRequest(action: any) {
    try {
        console.log('entered the request fetch');
        const {data} = yield call(vacancyApi.postInvite, action.payload);
        yield put({type: POST_INVITE.success, payload: data});
    } catch (e) {
        yield put(setSnackbar({visible: true, message: getRequestError(e), status: 'error'}));
        yield put({type: POST_INVITE.error});
    }
}

export function* vacancySaga() {
    yield all([
        takeLatest(POST_APPLY.saga, fetchApplyRequest),
        takeLatest(GET_APPLICATIONS.saga, fetchApplicationsRequest),
        takeLatest(PUT_STATUS.saga, fetchStatusRequest),
        takeLatest(POST_INVITE.saga, fetchInviteRequest),
    ]);
};

