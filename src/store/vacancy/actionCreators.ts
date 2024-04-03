import {
    POST_APPLY, GET_APPLICATIONS
} from "./types/actionTypes";

export const fetchApply = (payload: any) => ({
    type: POST_APPLY.saga, payload
});

export const fetchApplications = () => ({
    type: GET_APPLICATIONS.saga, payload: null
});