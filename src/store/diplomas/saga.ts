import {diplomasApi} from "@src/service/api";
import {getRequestError} from "@src/utils/getRequestError";
import {call, put, takeLatest} from "redux-saga/effects";
import {setSnackbar} from "../generals/actionCreators";
import {
    UPDATE_ATTRIBUTE_GROUP_ERROR,
    FETCH_DIPLOMAS_SAGA,
    FETCH_DIPLOMAS_SUCCESS
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


export function* diplomaSaga() {
    yield takeLatest(FETCH_DIPLOMAS_SAGA, fetchContractRequest);
}
