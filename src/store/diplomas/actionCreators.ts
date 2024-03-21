import {
    CANCEL_FILTER,
    GET_CHECK_IIN,
    GET_DIPLOMAS,
    GET_GRADUATE_DETAILS,
    GET_SEARCH,
    POST_TOOGLE_FAVORITE_DIPLOMAS,
    GET_FAVORITE_DIPLOMAS, GET_DIPLOMA_TRANSCRIPT,
} from "./types/types";
export const fetchDiplomas = (payload: any = null) => ({type: GET_DIPLOMAS.saga, payload});
export const cancelFilters = () => ({type: CANCEL_FILTER.saga});
export const fetchCheckIIN = (payload: any) => ({type: GET_CHECK_IIN.saga, payload});
export const fetchSearch = (payload: any) => ({type: GET_SEARCH.saga, payload});
export const fetchGraduateDetails = (payload: any) => ({type: GET_GRADUATE_DETAILS.saga, payload});
export const fetchToogleFavoriteDiplomas = (payload: any) => ({type: POST_TOOGLE_FAVORITE_DIPLOMAS.saga, payload});
export const fetchFavoriteDiplomas = (payload: any = null) => ({type: GET_FAVORITE_DIPLOMAS.saga});
export const fetchDiplomaTranscript = (payload: any = null) => ({type: GET_DIPLOMA_TRANSCRIPT.saga, payload});
