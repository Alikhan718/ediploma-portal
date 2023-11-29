import {diplomasApi} from "@src/service/api";
import {getRequestError} from "@src/utils/getRequestError";
import {all, call, put, takeLatest} from "redux-saga/effects";
import {setSnackbar} from "../generals/actionCreators";
import {
    GET_CHECK_IIN,
    GET_DIPLOMAS,
    GET_GRADUATE_DETAILS,
    GET_SEARCH,
} from "./types/types";
import {handleResponseBase} from "@src/store/sagas";

export function* fetchDiplomasRequest(action: any = null) {
    try {
        console.log("DIPLOMAS:", action);
        let university_id = null;
        if (action && action.payload && action.payload.university_id) {
            university_id = action.payload.university_id;
        }
        console.log("DIPLOMAS2:", university_id);
        const {data} = yield call(diplomasApi.getDiplomas, {page: 1, per_page: 800, university_id: university_id});

        yield put({type: GET_DIPLOMAS.success, payload: data});


    } catch (e) {
        yield put(setSnackbar({visible: true, message: getRequestError(e), status: "error"}));
        yield put({type: GET_DIPLOMAS.error});
    }
}

export function* fetchCheckIINRequest(action: any) {
    yield call(handleResponseBase, {
        type: GET_CHECK_IIN,
        apiCall: diplomasApi.checkIIN,
        action:action,
        successMessage: "ИИН подтвержден",
        errorMessage: "Неправильно введен ИИН!",
    });
}

export function* fetchSearchRequest(action: any) {

    try {
        if (!action.payload
            && !action.payload.text
            && !action.payload.specialities
            && !action.payload.region
            && !action.payload.degree
            && !action.payload.year) {
            return;
        }
        const {data} = yield call(diplomasApi.search, action.payload);
        yield put({type: GET_DIPLOMAS.saga});
        let names = <any>[];
        data.forEach((person: any) => {
            names.push(person.fullnameeng);
        });

        yield put({type: GET_SEARCH.success, names});
        if (names.length === 0) {
            yield put(setSnackbar({visible: true, message: "Ничего не найдено", status: "info"}));
        } else {
            yield put(setSnackbar({visible: true, message: "Поиск выполнен!", status: "success"}));
        }


    } catch (e) {
        yield put(setSnackbar({visible: true, message: getRequestError(e), status: "error"}));
        yield put({type: GET_SEARCH.error});
    }
}

export function* fetchGraduateDetailsRequest(action: any) {
    yield call(handleResponseBase, {
        type: GET_GRADUATE_DETAILS,
        apiCall: diplomasApi.getGraduateDetails,
        action:action,
        ignoreError: true
    });
}


export function* diplomaSaga() {
    yield all([
        takeLatest(GET_DIPLOMAS.saga, fetchDiplomasRequest),
        takeLatest(GET_CHECK_IIN.saga, fetchCheckIINRequest),
        takeLatest(GET_SEARCH.saga, fetchSearchRequest),
        takeLatest(GET_GRADUATE_DETAILS.saga, fetchGraduateDetailsRequest),
    ]);
}
