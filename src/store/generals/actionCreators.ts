import { IGeneralsState } from "./contracts/state";
import {
	GeneralsType,
	SetGlobalLoaderActionInterface,
	SetLanguageActionInterface,
	SetSnackbarActionInterface
} from "./contracts/actionTypes";



export const setGlobalLoader = (payload: IGeneralsState['loadingStatus']): SetGlobalLoaderActionInterface => (
	{ type: GeneralsType.SET_GLOBAL_STATUS, payload }
);

export const setSnackbar = (payload: IGeneralsState['snackbar']): SetSnackbarActionInterface => (
	{ type: GeneralsType.SET_SNACKBAR_STATUS, payload }
);
export const setLanguage = (payload: string) => (
	{ type: GeneralsType.SET_LANGUAGE, payload }
);



export type GeneralsActions = SetGlobalLoaderActionInterface | SetSnackbarActionInterface | SetLanguageActionInterface;