import {
    FETCH_CHECK_IIN_ERROR,
    FETCH_CHECK_IIN_SAGA, FETCH_CHECK_IIN_SUCCESS,
    FETCH_DIPLOMAS_SAGA,
    FETCH_DIPLOMAS_SUCCESS
} from "./types/types";

interface DiplomaInterface {
    diplomas_list: Array<any>,
    isFetching: boolean,
    iinValidated: boolean
}

const initialState: DiplomaInterface = {
    diplomas_list: [],
    isFetching: false,
    iinValidated: false
};

const diplomaReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case FETCH_DIPLOMAS_SAGA:
            console.log("FETCH_DIPLOMAS_SAGA");
            return {
                ...state,
                isFetching: true,
                iinValidated: false
            };
        case FETCH_DIPLOMAS_SUCCESS:
            return {
                ...state,
                diplomas_list: action.payload,
                isFetching: false,
            };
        case FETCH_CHECK_IIN_SAGA:
            return {
                ...state,
                name: action.payload.name,
                iin: action.payload.iin,
                iinValidated: false
            };
        case FETCH_CHECK_IIN_SUCCESS:
            return {
                ...state,
                isFetching: false,
                iinValidated: true
            };
        case FETCH_CHECK_IIN_ERROR:
            return {
                ...state,
                isFetching: false,
                iinValidated: false
            };
        default:
            return state; // Add this line to return the current state for unhandled actions
    }
};

export default diplomaReducer;
