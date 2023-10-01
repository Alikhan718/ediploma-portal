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
        yield put({type: GET_DIPLOMAS.success, payload: newData});


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
    });
}


export function* diplomaSaga() {
    yield all([
        takeLatest(GET_DIPLOMAS.saga, fetchContractRequest),
        takeLatest(GET_CHECK_IIN.saga, fetchCheckIINRequest),
        takeLatest(GET_SEARCH.saga, fetchSearchRequest),
        takeLatest(GET_GRADUATE_DETAILS.saga, fetchGraduateDetailsRequest),
    ]);
}
