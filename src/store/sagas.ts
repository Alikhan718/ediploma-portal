import {all, call, put} from "redux-saga/effects";
import {authSagas} from "./auth/saga";
import {diplomaSaga} from "./diplomas/saga";
import {generatorSaga} from "@src/store/generator/saga";
import {TypeInterface} from "./ActionType";
import {setSnackbar} from "@src/store/generals/actionCreators";
import {getRequestError} from "@src/utils/getRequestError";

// Define an interface for the handleResponseBase function

interface handleInterface {
    type: TypeInterface;
    apiCall: any;
    action?: any | null;
    errorMessage?: string | null;
    successMessage?: string | null;
    optionalSuccessFunction?: any | null;
    optionalErrorFunction?: any | null;
}

// Generator function to handle API responses
export function* handleResponseBase(
    {
        type,
        apiCall,
        action,
        errorMessage = null,
        successMessage = null,
        optionalSuccessFunction = () => {},
        optionalErrorFunction = () => {},
    }: handleInterface) {
    try {
        // Make an API call and get the response data
        let {data} = yield call(apiCall, action.payload);
        // Check if the data is present
        if (data) {
            // Call an optional success function
            optionalSuccessFunction(data);
            // Dispatch a success action with the data
            yield put({type: type.success, data});
            // Display a success snackbar message if provided
            if (successMessage) {
                yield put(setSnackbar({visible: true, message: successMessage, status: "success"}));
            }
        } else {
            // Handle the case where the data is not present
            if (errorMessage) {
                // Call an optional error function
                optionalErrorFunction();
                // Display an error snackbar message if provided
                yield put(setSnackbar({visible: true, message: errorMessage, status: "error"}));
            }
        }
    } catch (e) {
        // Handle exceptions, display an error snackbar, and dispatch an error action
        yield put(setSnackbar({visible: true, message: getRequestError(e), status: "error"}));
        yield put({type: type.error});
    }
}

export default function* rootSaga() {
    yield all([
        authSagas(),
        diplomaSaga(),
        generatorSaga(),
    ]);
};
