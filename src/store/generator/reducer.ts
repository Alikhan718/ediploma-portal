import {
    UPLOAD_DATA_PARSE,
} from "./types/types";

interface GeneratorInterface {
    archive_link: string,
    is_uploaded: boolean
}

const initialState: GeneratorInterface = {
    archive_link: "",
    is_uploaded: false,
};

const generatorReducer = (state = initialState, action: any) => {
    switch (action.type) {

        case UPLOAD_DATA_PARSE.success:
            return {
                ...state,
                isFetching: false,
                is_uploaded: true,
                archive_link: action.data,
            };
        default:
            return state; // Add this line to return the current state for unhandled actions
    }
};

export default generatorReducer;
