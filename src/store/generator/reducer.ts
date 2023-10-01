import {
    UPLOAD_DATA_PARSE,
} from "./types/types";

interface GeneratorInterface {
    archive_link: string,
}

const initialState: GeneratorInterface = {
    archive_link: "",
};

const generatorReducer = (state = initialState, action: any) => {
    switch (action.type) {

        case UPLOAD_DATA_PARSE.success:
            return {
                ...state,
                isFetching: false,
                archive_link: action.data,
            };
        default:
            return state; // Add this line to return the current state for unhandled actions
    }
};

export default generatorReducer;
