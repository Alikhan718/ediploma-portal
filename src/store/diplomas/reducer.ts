import {
    FETCH_DIPLOMAS_SAGA,
    FETCH_DIPLOMAS_SUCCESS
} from "./types/types";

interface DiplomaInterface {
    diplomas_list: Array<any>,
    isFetching: boolean,
}

const initialState: DiplomaInterface = {
    diplomas_list: [],
    isFetching: false
};

const diplomaReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case FETCH_DIPLOMAS_SAGA:
            return {
                ...state,
                isFetching: true
            };
        case FETCH_DIPLOMAS_SUCCESS:
            return {
                ...state,
                diplomas_list: action.payload,
                isFetching: false
            };
        default:
            return state; // Add this line to return the current state for unhandled actions
    }
};

export default diplomaReducer;
