import {call, put, takeLatest} from "redux-saga/effects";
import {
    POST_AUTH_LOGIN,
    AUTH_LOGOUT,
    POST_AUTH_REGISTER,
    POST_AUTH_VALIDATE_EMAIL,
    GET_OTP,
    POST_RESET_PASSWORD,
    POST_VALIDATE_EMAIL,
    POST_AUTH_WITH_DS, POST_SAVE_XML
} from "./types/actionTypes";
import {setSnackbar} from "@src/store/generals/actionCreators";
import {authApi} from "@src/service/api";
import {getRequestError} from "@src/utils/getRequestError";
import {handleResponseBase} from "@src/store/sagas";

export function* fetchAuthLogout() {
    yield put({type: AUTH_LOGOUT.success});
}

export function* fetchAuthLogin(action: any) {
    try {
        const {data} = yield call(authApi.login, action.payload);
        yield put({type: POST_AUTH_LOGIN.success, payload: data});
        yield put(setSnackbar({visible: true, message: "Добро пожаловать", status: "success"}));
    } catch (e: any) {
        yield put({type: POST_AUTH_REGISTER.error});
        yield put(setSnackbar({visible: true, message: getRequestError(e), status: "error"}));
    }
}

export function* fetchSaveXml(action: any) {
    yield call(handleResponseBase, {
            type: POST_SAVE_XML,
            apiCall: authApi.saveXml,
            action,
            successMessage: "Успешно",
        }
    );
}

export function* fetchAuthRegister(action: any) {
    try {
        const {data} = yield call(authApi.register, action.payload);
        if (data.message && data.message.includes("success")) {
            yield put({type: POST_AUTH_REGISTER.success});
        }
        // yield put(setSnackbar({visible: true, message: "Успешно зарегистрирован!", status: "success"}));
    } catch (e: any) {
        yield put({type: POST_AUTH_REGISTER.error});
        yield put(setSnackbar({visible: true, message: getRequestError(e), status: "error"}));
    }
}

export function* fetchAuthWithDS(action: any) {
    try {
        const {data} = yield call(authApi.authDS, action.payload);
        yield put({type: POST_AUTH_LOGIN.success, payload: data});
        yield put(setSnackbar({visible: true, message: "Добро пожаловать", status: "success"}));
    } catch (e: any) {
        yield put({type: POST_AUTH_REGISTER.error});
        yield put(setSnackbar({visible: true, message: getRequestError(e), status: "error"}));
    }
}

export function* fetchAuthValidateEmail(action: any) {
    try {
        const {data} = yield call(authApi.validateEmail, action.payload);
        yield put({type: POST_AUTH_VALIDATE_EMAIL.saga});
        yield put(setSnackbar({visible: true, message: "Валидация пройдена!", status: "success"}));
    } catch (e) {
        yield put({type: POST_AUTH_VALIDATE_EMAIL.error});

        yield put(setSnackbar({visible: true, message: getRequestError(e), status: "error"}));
    }
}

export function* fetchValidateEmail(action: any) {
    try {
        const {data} = yield call(authApi.validateEmail, action.payload);
        yield put({type: POST_VALIDATE_EMAIL.success});
        yield put(setSnackbar({visible: true, message: "Валидация пройдена!", status: "success"}));
    } catch (e) {
        yield put({type: POST_VALIDATE_EMAIL.error});

        yield put(setSnackbar({visible: true, message: getRequestError(e), status: "error"}));
    }
}

export function* fetchResetPassword(action: any) {
    try {
        const {data} = yield call(authApi.resetPassword, action.payload);
        if (data && data.includes("success")) {
            yield put({type: POST_RESET_PASSWORD.success});
            yield put(setSnackbar({visible: true, message: "Пароль обновлен!", status: "success"}));
        }
    } catch (e) {
        yield put({type: POST_RESET_PASSWORD.error});
        yield put(setSnackbar({visible: true, message: getRequestError(e), status: "error"}));
    }
}

export function* fetchGetOtp(action: any) {
    try {
        const {data} = yield call(authApi.getOtp, action.payload);
        yield put({type: GET_OTP.success});
        yield put(setSnackbar({visible: true, message: "Код отправлен!", status: "success"}));
    } catch (e) {
        yield put({type: GET_OTP.error});
        yield put(setSnackbar({visible: true, message: getRequestError(e), status: "error"}));
    }
}

export function* authSagas() {
    yield takeLatest(POST_AUTH_LOGIN.saga, fetchAuthLogin);
    yield takeLatest(POST_AUTH_REGISTER.saga, fetchAuthRegister);
    yield takeLatest(POST_AUTH_WITH_DS.saga, fetchAuthWithDS);
    yield takeLatest(AUTH_LOGOUT.saga, fetchAuthLogout);
    yield takeLatest(POST_AUTH_VALIDATE_EMAIL.saga, fetchAuthValidateEmail);
    yield takeLatest(POST_VALIDATE_EMAIL.saga, fetchValidateEmail);
    yield takeLatest(POST_RESET_PASSWORD.saga, fetchResetPassword);
    yield takeLatest(GET_OTP.saga, fetchGetOtp);
    yield takeLatest(POST_SAVE_XML.saga, fetchSaveXml);
}