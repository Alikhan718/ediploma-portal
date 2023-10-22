import {
    CANCEL_FILTER,
    GET_CHECK_IIN,
    GET_DIPLOMAS,
    GET_GRADUATE_DETAILS,
    GET_SEARCH
} from "./types/types";
export const fetchDiplomas = () => ({type: GET_DIPLOMAS.saga});
export const cancelFilters = () => ({type: CANCEL_FILTER.saga});
export const fetchCheckIIN = (payload: any) => ({type: GET_CHECK_IIN.saga, payload});
export const fetchSearch = (payload: any) => ({type: GET_SEARCH.saga, payload});
export const fetchGraduateDetails = (payload: any) => ({type: GET_GRADUATE_DETAILS.saga, payload});
