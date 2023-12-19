import {call, put, takeLatest} from "redux-saga/effects";
import {
    GET_GRADUATES_AMOUNT,
} from "./types/actionTypes";
import {setSnackbar} from "@src/store/generals/actionCreators";
import {analyticsApi} from "@src/service/api";
import {getRequestError} from "@src/utils/getRequestError";
import {handleResponseBase} from "@src/store/sagas";

export function* fetchGraduatesAmount(action: any) {
    try {
        const {data} = yield call(analyticsApi.getGraduatesAmount);
        yield put({type: GET_GRADUATES_AMOUNT.success, payload: data});
    } catch (e) {
        yield put({type: GET_GRADUATES_AMOUNT.error});
        yield put(setSnackbar({visible: true, message: getRequestError(e), status: "error"}));
    }
}

export function* analyticsSaga() {
    yield takeLatest(GET_GRADUATES_AMOUNT.saga, fetchGraduatesAmount);
}