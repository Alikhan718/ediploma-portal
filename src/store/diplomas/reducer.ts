import {
    FETCH_CHECK_IIN_ERROR,
    FETCH_CHECK_IIN_SAGA,
    FETCH_CHECK_IIN_SUCCESS,
    FETCH_DIPLOMAS_SAGA,
    FETCH_DIPLOMAS_SUCCESS,
    FETCH_GRADUATES_DETAILS_SAGA,
    FETCH_GRADUATES_DETAILS_SUCCESS,
    FETCH_SEARCH_SAGA,
    FETCH_SEARCH_SUCCESS
} from "./types/types";

interface DiplomaInterface {
    diplomas_list: Array<any>,
    isFetching: boolean,
    iinValidated: boolean,
    text: string,
    specialities: string,
    region: string,
    year: number,
    gpaL: number,
    gpaR: number,
    filtered_names: string[],
    graduate_attributes: any[],
}

const initialState: DiplomaInterface = {
    diplomas_list: [0],
    isFetching: false,
    iinValidated: false,
    text: "",
    specialities: "",
    region: "",
    year: 0,
    gpaL: 0,
    gpaR: 0,
    filtered_names: [],
    graduate_attributes: [],
};

const diplomaReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case FETCH_DIPLOMAS_SAGA:
            return {
                ...state,
                isFetching: true,
                iinValidated: false
            };
        case FETCH_DIPLOMAS_SUCCESS:
            let temp_diploma_list = [];
            if (state.filtered_names.length) {
                temp_diploma_list = action.payload.filter((diploma: any) => state.filtered_names.includes(diploma.name));
            } else {
                temp_diploma_list = action.payload;
            }
            return {
                ...state,
                diplomas_list: temp_diploma_list,
                filtered_names: state.filtered_names,
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
        case FETCH_SEARCH_SAGA:
            console.log("REDUCER DATA", action.payload);
            return {
                ...state,
                iinValidated: false,
                text: action.payload.text,
                specialities: action.payload.specialities,
                region: action.payload.region,
                year: action.payload.year,
                gpaL: action.payload.gpaL,
                gpaR: action.payload.gpaR,
            };
        case FETCH_GRADUATES_DETAILS_SAGA:
            return {
                ...state,
                name: action.payload.name,
            };
        case FETCH_GRADUATES_DETAILS_SUCCESS:
            return {
                ...state,
                graduate_attributes: action.data
            };
        case FETCH_SEARCH_SUCCESS:
            return {
                ...state,
                iinValidated: false,
                filtered_names: action.names,
            };
        default:
            return state; // Add this line to return the current state for unhandled actions
    }
};

export default diplomaReducer;
