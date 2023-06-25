import { RootState } from "../store";

export const selectAuthLoader = (state: RootState) => state.auth.isLoading;
export const selectUserRole = (state: RootState) => state.auth.userRole;