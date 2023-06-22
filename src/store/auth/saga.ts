import {Auth} from "aws-amplify";
import {call, put, takeLatest} from "redux-saga/effects";
import {fetchAllLocation} from "../locations/reducer";
import {
    FETCH_AUTH_ITEMS,
    FETCH_AUTH_ITEMS_ERROR,
    FETCH_AUTH_ITEMS_SUCCESS,
    FETCH_AUTH_LOGIN_SAGA, FETCH_AUTH_LOGIN_SUCCESS, FETCH_AUTH_REGISTER_SAGA, FETCH_AUTH_REGISTER_SUCCESS
} from "./types/actionTypes";
import {setGlobalLoader, setSnackbar} from "@src/store/generals/actionCreators";
import {LoadingStatus} from "@src/store/generals/types";
import {authApi} from "@src/service/api";
import {getRequestError} from "@src/utils/getRequestError";


export function* fetchAuthItemsRequest(action: any) {
    try {
        yield put({type: FETCH_AUTH_ITEMS});
        // @ts-ignore
        const data = yield Auth.currentAuthenticatedUser();

        const userRole = data.signInUserSession.accessToken.payload["cognito:groups"];
        const token = data.signInUserSession.idToken.jwtToken;
        const refreshToken = data.signInUserSession.refreshToken.token;


        localStorage.setItem("userRole", JSON.stringify(userRole || ''));
        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refreshToken);

        if (!userRole.includes("Callcenter")) {
            yield put(fetchAllLocation());
        }
        yield put({type: FETCH_AUTH_ITEMS_SUCCESS, payload: userRole});

    } catch (e) {
        yield put({type: FETCH_AUTH_ITEMS_ERROR});
    }
}

export function* fetchAuthLogin(action: any) {
    try {
        const {data} = yield call(authApi.login, action.payload);
        const token = data.token;
        console.log("TOKEN: ", token);
        localStorage.setItem("token", token);
        localStorage.setItem("userRole", data.role);
        yield put({type: FETCH_AUTH_LOGIN_SUCCESS});

    } catch (e) {
        yield put({type: FETCH_AUTH_ITEMS_ERROR});
        yield put(setSnackbar({ visible: true, message: getRequestError(e), status: "error" }));
    }
}
export function* fetchAuthRegister(action: any) {
    try {
        const {data} = yield call(authApi.register, action.payload);
        yield put({type: FETCH_AUTH_REGISTER_SUCCESS});

    } catch (e) {
        yield put({type: FETCH_AUTH_ITEMS_ERROR});
        yield put(setSnackbar({ visible: true, message: getRequestError(e), status: "error" }));
    }
}

export function* authSagas() {
    yield takeLatest(FETCH_AUTH_LOGIN_SAGA, fetchAuthLogin);
    yield takeLatest(FETCH_AUTH_REGISTER_SAGA, fetchAuthRegister);
}