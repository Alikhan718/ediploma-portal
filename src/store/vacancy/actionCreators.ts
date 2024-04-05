import {
    POST_APPLY, GET_APPLICATIONS, PUT_STATUS
} from "./types/actionTypes";

export const fetchApply = (payload: any) => ({
    type: POST_APPLY.saga, payload
});

export const fetchApplications = () => ({
    type: GET_APPLICATIONS.saga, payload: null
});

export const fetchStatus = (payload: any) => ({
    type: PUT_STATUS.saga, payload
});