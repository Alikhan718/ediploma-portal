import {
    GET_GRADUATES_AMOUNT,
} from "./types/actionTypes";

export const fetchGraduatesAmount = () => ({
    type: GET_GRADUATES_AMOUNT.saga,
});