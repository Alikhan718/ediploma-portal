import { ISnackbar, LoadingStatus } from "../types";

export interface IGeneralsState {
	loadingStatus: LoadingStatus,
	snackbar: ISnackbar,
	language: "ru" | "kz" | "en" | string,
}

