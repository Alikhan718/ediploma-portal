import {
    UPLOAD_DATA_PARSE,
} from "./types/types";

export const uploadDataParse = (payload: any) => ({type: UPLOAD_DATA_PARSE.saga, payload});
