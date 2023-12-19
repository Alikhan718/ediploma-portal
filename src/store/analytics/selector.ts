import { RootState } from "../store";

export const selectGraduatesAmount = (state: RootState) => state.analytics.graduates;