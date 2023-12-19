import {
    GET_GRADUATES_AMOUNT,
} from "./types/actionTypes";

const initialState = {
    graduates: {},
};

export const analyticsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_GRADUATES_AMOUNT.success:
            return {
                ...state,
                graduates: action.payload,
            };
        default:
            return state;
    }
}