import {
    POST_APPLY, GET_APPLICATIONS, PUT_STATUS, POST_INVITE
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

export const fetchInvite = (payload: any) => ({
    type: POST_INVITE.saga, payload
});