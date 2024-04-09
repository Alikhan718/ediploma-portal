import { RootState } from "../store";

export const selectApplications = (state: RootState) => state.vacancy.applications;