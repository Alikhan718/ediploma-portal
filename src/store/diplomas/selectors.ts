import {RootState} from "../store";

export const selectDiplomaList = (state: RootState) => state.diploma.diplomas_list;
export const selectIINValidated = (state: RootState) => state.diploma.iinValidated;
export const selectGraduateAttributes = (state: RootState) => state.diploma.graduate_attributes;
export const selectSearchText = (state: RootState) => state.diploma.text;
export const selectToogleFavoriteDiplomas = (state: RootState) => state.diploma.favoriteDiplomas;
export const selectFavoriteDiplomas = (state: RootState) => state.diploma.favoriteDiplomas;

