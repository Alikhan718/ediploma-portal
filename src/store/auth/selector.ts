import { RootState } from "../store";

export const selectAuthLoader = (state: RootState) => state.auth.isLoading;