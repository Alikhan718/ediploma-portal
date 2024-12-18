import {
    FETCH_CANCEL_FILTER_SAGA,
    FETCH_CHECK_IIN_SAGA,
    FETCH_DIPLOMAS_SAGA,
    FETCH_GRADUATES_DETAILS_SAGA,
    FETCH_SEARCH_SAGA
} from "./types/types";

export const fetchDiplomas = () => ({type: FETCH_DIPLOMAS_SAGA});
export const cancelFilters = () => ({type: FETCH_CANCEL_FILTER_SAGA});
export const fetchCheckIIN = (payload: any) => ({type: FETCH_CHECK_IIN_SAGA, payload});
export const fetchSearch = (payload: any) => ({type: FETCH_SEARCH_SAGA, payload});
export const fetchGraduateDetails = (payload: any) => ({type: FETCH_GRADUATES_DETAILS_SAGA, payload});
