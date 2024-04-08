import {
    POST_APPLY, GET_APPLICATIONS, PUT_STATUS
} from "./types/actionTypes";

interface Applications {
    applications: any[],
    isFetching?: boolean,
}

const initialState: Applications = {
    applications: [],
    isFetching: false,
};

const applicationsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case POST_APPLY.saga:
            return {
                ...state,
            };
        case GET_APPLICATIONS.saga:
            console.log(action.payload);
            return {
                ...state,
                ifFetching: true,
            };
        case GET_APPLICATIONS.success:
            return {
                ...state,
                applications: action.payload,
                isFetching: false,
            };
        case GET_APPLICATIONS.error:
            return {
                ...state,
                isFetching: false,
            };
        case PUT_STATUS.saga:
            return {
                ...state,
            };
        default:
            return state;
    }
};

export default applicationsReducer;