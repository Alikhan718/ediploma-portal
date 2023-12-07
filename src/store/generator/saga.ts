// Import necessary modules and types
import {generatorApi} from "@src/service/api";
import {all, call, takeLatest} from "redux-saga/effects";
import {UPLOAD_DATA_PARSE} from "./types/types";
import {handleResponseBase} from "@src/store/sagas";


// Generator function to handle the uploadDataParseRequest action
export function* uploadDataParseRequest(action: any) {
    console.log(action.payload);
    // Call the handleResponseBase function with specific parameters
    yield call(handleResponseBase, {
        type: UPLOAD_DATA_PARSE,
        apiCall: generatorApi.parseDataFromFile,
        action,
    });
}

// Root generator function that runs all sagas
export function* generatorSaga() {
    yield all([
        takeLatest(UPLOAD_DATA_PARSE.saga, uploadDataParseRequest),
    ]);
}
