import {
    CANCEL_FILTER,
    GET_CHECK_IIN,
    GET_DIPLOMAS,
    GET_GRADUATE_DETAILS,
    GET_SEARCH,
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
        case GET_DIPLOMAS.saga:
            return {
                ...state,
                isFetching: true,
                iinValidated: false
            };
        case GET_DIPLOMAS.success:
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
        case GET_CHECK_IIN.saga:
            return {
                ...state,
                name: action.payload.name,
                iin: action.payload.iin,
                iinValidated: false
            };
        case GET_CHECK_IIN.success:
            return {
                ...state,
                isFetching: false,
                iinValidated: true
            };
        case GET_CHECK_IIN.error:
            return {
                ...state,
                isFetching: false,
                iinValidated: false
            };
        case CANCEL_FILTER.saga:
            return {
                ...state,
                filtered_names: []
            };
        case GET_SEARCH.saga:
            return {
                ...state,
                iinValidated: false,
                text: action.payload.text,
                specialities: action.payload.specialities,
                region: action.payload.region,
                degree: action.payload.degree,
                year: action.payload.year,
                gpaL: action.payload.gpaL,
                gpaR: action.payload.gpaR,
            };
        case GET_GRADUATE_DETAILS.saga:
            return {
                ...state,
                name: action.payload.name,
            };
        case GET_GRADUATE_DETAILS.success:
            return {
                ...state,
                graduate_attributes: action.data
            };
        case GET_SEARCH.success:
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
