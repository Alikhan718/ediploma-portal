import {RootState} from "../store";

export const selectDiplomaList = (state: RootState) => state.diploma.diplomas_list;
