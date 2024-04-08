import {call, put, take, takeLatest} from "redux-saga/effects";
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
    POST_UPDATE_PROFILE_DATA,
    POST_UPLOAD_FILE,
    GET_UNIVERSITY_LIST,
    PUT_VISIBILITY,
    GET_EMPLOYERS_LIST,
    GET_EMPLOYERS_SEARCH,
    GET_EMPLOYER_DETAILS,
    GET_GENERATE_RESUME,
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
            {payload: {CID: data.cid, symbol: data.symbol, name: data.name, university_id: data.university_id}}
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
        const {data} = yield call(authApi.updateProfile, action.payload);
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

export function* uploadFileRequest(action: any) {
    yield call(handleResponseBase, {
        type: POST_UPLOAD_FILE,
        apiCall: authApi.uploadFile,
        action,
    });
}

export function* fetchUniversitiesList() {
    try {
        const {data} = yield call(authApi.getUniversitiesList);
        yield put({type: GET_UNIVERSITY_LIST.success, payload: data});
    } catch (e) {
        yield put({type: GET_UNIVERSITY_LIST.error});
        yield put(setSnackbar({visible: true, message: getRequestError(e), status: "error"}));
    }
}

export function* fetchEmployersList() {
    try {
        const {data} = yield call(authApi.getEmployersList);
        yield put({type: GET_EMPLOYERS_LIST.success, payload: data});
    } catch (e) {
        yield put({type: GET_EMPLOYERS_LIST.error});
        yield put(setSnackbar({visible: true, message: getRequestError(e), status: "error"}));
    }
}

export function* fetchVisibility(action: any) {
    try {
        const {data} = yield call(authApi.putVisibility, action.payload);
        yield put({type: PUT_VISIBILITY.success, payload: data});
    } catch (error) {
        yield put(setSnackbar({visible: true, message: getRequestError(error), status: "error"}));
    }
}

export function* fetchEmployersSearchRequest(action: any) {
    try {
        if (!action.payload
            && !action.payload.text
            && !action.payload.field) {
            return;
        }

        const {data} = yield call(authApi.getEmployersSearch, action.payload);

        yield put({type: GET_EMPLOYERS_LIST.saga});
        let names = <any>[];
        data.forEach((person: any) => {
            names.push(person.name);
        });

        yield put({type: GET_EMPLOYERS_SEARCH.success, names});
        if (names.length === 0) {
            yield put(setSnackbar({visible: true, message: "Ничего не найдено", status: "info"}));
        } else {
            yield put(setSnackbar({visible: true, message: "Поиск выполнен!", status: "success"}));
        }
    } catch (error) {
        yield put(setSnackbar({visible: true, message: getRequestError(error), status: "error"}));
        yield put({type: GET_EMPLOYERS_SEARCH.error});
    }
}

export function* fetchGraduateDetailsRequest(action: any) {
    yield call(handleResponseBase, {
        type: GET_EMPLOYER_DETAILS,
        apiCall: authApi.getEmployerDetails,
        action: action,
        ignoreError: true
    });
};

export function* fetchGenerateResumeRequest() {
    try {
        let {data} = yield call(authApi.getResumeGenerate);
        console.log(data && data.includes("uploads"));
        if (data && data.includes("uploads")) {
            yield put({type: GET_GENERATE_RESUME.success});
            yield put(setSnackbar({visible: true, message: "Успешно", status: "success"}));
            //
            const {data2} = yield call(authApi.updateProfile, {
                "attributes": {
                    "resume_link": data
                }
            });

            yield put({type: POST_UPDATE_PROFILE_DATA.success, payload: data2});
            yield put(setSnackbar({visible: true, message: "Данные обновлены!", status: "success"}));
        }


    } catch (error) {
        yield put(setSnackbar({visible: true, message: getRequestError(error), status: "error"}));
        yield put({type: GET_GENERATE_RESUME.error});
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
    yield takeLatest(POST_UPLOAD_FILE.saga, uploadFileRequest);
    yield takeLatest(GET_UNIVERSITY_LIST.saga, fetchUniversitiesList);
    yield takeLatest(GET_EMPLOYERS_LIST.saga, fetchEmployersList);
    yield takeLatest(PUT_VISIBILITY.saga, fetchVisibility);
    yield takeLatest(GET_EMPLOYERS_SEARCH.saga, fetchEmployersSearchRequest);
    yield takeLatest(GET_GENERATE_RESUME.saga, fetchGenerateResumeRequest);
    yield takeLatest(GET_EMPLOYER_DETAILS.saga, fetchGraduateDetailsRequest);
}