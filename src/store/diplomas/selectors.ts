import {RootState} from "../store";

export const selectDiplomaList = (state: RootState) => state.diploma.diplomas_list;
export const selectIINValidated = (state: RootState) => state.diploma.iinValidated;
