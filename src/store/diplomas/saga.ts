import {diplomasApi} from "@src/service/api";
import {getRequestError} from "@src/utils/getRequestError";
import {all, call, put, takeLatest} from "redux-saga/effects";
import {setSnackbar} from "../generals/actionCreators";
import {
    FETCH_CHECK_IIN_SAGA,
    FETCH_CHECK_IIN_SUCCESS,
    FETCH_DIPLOMAS_ERROR,
    FETCH_DIPLOMAS_SAGA,
    FETCH_DIPLOMAS_SUCCESS,
    FETCH_SEARCH_ERROR,
    FETCH_SEARCH_SAGA,
    FETCH_SEARCH_SUCCESS,
    UPDATE_ATTRIBUTE_GROUP_ERROR
} from "./types/types";

export function* fetchContractRequest() {
    try {
        const {data} = yield call(diplomasApi.getContracts);
        let newData: { [index: string]: any }[] = [];

        data.forEach((entry: any) => {
            let dict: { [index: string]: any } = {};

            Object.entries(entry).forEach((e: any) => {
                const [k, v] = e;
                if (k !== "attributes") {
                    const key = String(k);
                    dict[key] = v;
                } else {
                    entry.attributes.forEach((attr: any) => {
                        dict[attr.name] = attr.value;
                    });
                }
            });

            newData.push(dict);
        });
            yield put({type: FETCH_DIPLOMAS_SUCCESS, payload: newData});


    } catch (e) {
        yield put(setSnackbar({visible: true, message: getRequestError(e), status: "error"}));
        yield put({type: UPDATE_ATTRIBUTE_GROUP_ERROR});
    }
}

export function* fetchCheckIINRequest(action: any) {
    try {
        const {data} = yield call(diplomasApi.checkIIN, action.payload);
        if (data) {
            yield put({type: FETCH_CHECK_IIN_SUCCESS, data});
            yield put(setSnackbar({visible: true, message: "ИИН подтвержден", status: "success"}));
        } else {
            yield put(setSnackbar({visible: true, message: "Неправильно введен ИИН!", status: "error"}));
        }

    } catch (e) {
        yield put(setSnackbar({visible: true, message: getRequestError(e), status: "error"}));
        yield put({type: FETCH_DIPLOMAS_ERROR});
    }
}

export function* fetchSearchRequest(action: any) {
    try {
        const {data} = yield call(diplomasApi.search, action.payload);
        yield put({type: FETCH_DIPLOMAS_SAGA});
        let names = <any>[];
        data.forEach((person: any) => {
            names.push(person.fullnameeng);
        });

        yield put({type: FETCH_SEARCH_SUCCESS, names});
        if (names.length === 0) {
            yield put(setSnackbar({visible: true, message: "Ничего не найдено", status: "info"}));
        } else {
            yield put(setSnackbar({visible: true, message: "Поиск выполнен!", status: "success"}));
        }


    } catch (e) {
        yield put(setSnackbar({visible: true, message: getRequestError(e), status: "error"}));
        yield put({type: FETCH_SEARCH_ERROR});
    }
}


export function* diplomaSaga() {
    yield all([
        takeLatest(FETCH_DIPLOMAS_SAGA, fetchContractRequest),
        takeLatest(FETCH_CHECK_IIN_SAGA, fetchCheckIINRequest),
        takeLatest(FETCH_SEARCH_SAGA, fetchSearchRequest),
    ]);
}
