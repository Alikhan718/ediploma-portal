import {all} from "redux-saga/effects";
import {authSagas} from "./auth/saga";
import { diplomaSaga } from "./diplomas/saga";

export default function* rootSaga() {
    yield all([
        authSagas(),
        diplomaSaga(),
    ]);
};
