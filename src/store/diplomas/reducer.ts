import {
    FETCH_CHECK_IIN_ERROR,
    FETCH_CHECK_IIN_SAGA, FETCH_CHECK_IIN_SUCCESS,
    FETCH_DIPLOMAS_SAGA,
    FETCH_DIPLOMAS_SUCCESS, FETCH_SEARCH_SAGA, FETCH_SEARCH_SUCCESS
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
    // const [filterAttributes, setFilterAttributes] = useState({
    //     text: "",
    //     specialities: "",
    //     region: "",
    //     year: "",
    //     gpaL: "",
    //     gpaR: "",
    // });
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
        case FETCH_SEARCH_SAGA:
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
        case FETCH_SEARCH_SUCCESS:
            let names = action.payload;
            let search_diploma_list = state.diplomas_list.filter((diploma) => names.includes(diploma.name));
            return {
                ...state,
                iinValidated: false,
                diplomas_list: search_diploma_list
            };
        default:
            return state; // Add this line to return the current state for unhandled actions
    }
};

export default diplomaReducer;
