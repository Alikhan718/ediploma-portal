import {call, put, takeLatest} from "redux-saga/effects";
import {
    POST_AUTH_LOGIN,
    AUTH_LOGOUT,
    POST_AUTH_REGISTER,
    POST_AUTH_VALIDATE_EMAIL,
    GET_OTP,
    POST_RESET_PASSWORD,
    POST_VALIDATE_EMAIL,
    POST_AUTH_WITH_DS,
    POST_SAVE_XML,
    GET_DIPLOMA_METADATA_CID,
    POST_GENERATE_SMART_CONTRACT,
    GET_PROFILE_DATA,
    POST_UPDATE_PROFILE_DATA
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
        yield put({type: POST_AUTH_VALIDATE_EMAIL.success});
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

export function* fetchMetadataCid(action: any) {
    try {
        const {data} = yield call(authApi.getMetadataCid, action.payload);
        yield put({type: GET_DIPLOMA_METADATA_CID.success, payload: data});
        yield put(setSnackbar({visible: true, message: "Все файлы загружены!", status: "success"}));
        yield call(fetchGenerateSmartContract,
            {payload: {CID: data, symbol: "KB23", name: "Test KBTU"}}
        );

    } catch (e) {
        yield put({type: GET_DIPLOMA_METADATA_CID.error});
        yield put(setSnackbar({visible: true, message: getRequestError(e), status: "error"}));
    }
}

export function* fetchProfileData(action: any) {
    try {
        const {data} = yield call(authApi.getProfile);
        yield put({type: GET_PROFILE_DATA.success, payload: data});

    } catch (e) {
        yield put({type: GET_PROFILE_DATA.error});
        yield put(setSnackbar({visible: true, message: getRequestError(e), status: "error"}));
    }
}
export function* updateProfileData(action: any) {
    try {
        console.log("Payload", action);
        const {data} = yield call(authApi.updateProfile, action.payload);
        console.log("updateProfile", data);
        yield put({type: POST_UPDATE_PROFILE_DATA.success, payload: data});
        yield put(setSnackbar({visible: true, message: "Данные обновлены!", status: "success"}));
    } catch (e) {
        yield put({type: POST_UPDATE_PROFILE_DATA.error});
        yield put(setSnackbar({visible: true, message: getRequestError(e), status: "error"}));
    }
}

export function* fetchGenerateSmartContract(action: any) {
    try {
        const {data} = yield call(authApi.generateSmartContract, action.payload);
        yield put({type: POST_GENERATE_SMART_CONTRACT.success, payload: data});
        yield put(setSnackbar({visible: true, message: "Успешно создали смарт контракт!", status: "success"}));
    } catch (e) {
        yield put({type: POST_GENERATE_SMART_CONTRACT.error});
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
    yield takeLatest(GET_PROFILE_DATA.saga, fetchProfileData);
    yield takeLatest(POST_UPDATE_PROFILE_DATA.saga, updateProfileData);
    yield takeLatest(GET_OTP.saga, fetchGetOtp);
    yield takeLatest(POST_SAVE_XML.saga, fetchSaveXml);
    yield takeLatest(GET_DIPLOMA_METADATA_CID.saga, fetchMetadataCid);
    yield takeLatest(POST_GENERATE_SMART_CONTRACT.saga, fetchGenerateSmartContract);
}