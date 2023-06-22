import { Action } from "redux";
import { FetchMenuListSuccessPayload, PublicationBody, PublictionMenuPayload } from "./types";
import { MenuListActionTypes } from "./types/actionTypes";


// ACTION INTERFACE
export interface fetchMenuListInterface extends Action<MenuListActionTypes> {
  type: MenuListActionTypes.FETCH_MENU_LIST_SAGA,
  payload: string
}
export interface fetchPublicationMenuCountInterface extends Action<MenuListActionTypes> {
  type: MenuListActionTypes.FETCH_PUBLICATION_COUNT_SAGA,
}

export interface fetchPublicationMenuCountSuccessInterface extends Action<MenuListActionTypes> {
  type: MenuListActionTypes.FETCH_PUBLICATION_COUNT_SUCCESS,
  payload: PublicationBody[] | null
}

export interface clearMenuListInterface extends Action<MenuListActionTypes> {
  type: MenuListActionTypes.CLEAR_MENU_LIST
}

export interface fetchMenuListSuccessInterface extends Action<MenuListActionTypes> {
  type: MenuListActionTypes.FETCH_MENU_LIST_SUCCESS,
  payload: FetchMenuListSuccessPayload
}

export interface publicationMenuInterface extends Action<MenuListActionTypes> {
  type: MenuListActionTypes.PUBLICATION_MENU_SAGA,
  payload: PublictionMenuPayload[]
}

export interface openUploadModalInterface extends Action<MenuListActionTypes> {
  type: MenuListActionTypes.OPEN_UPLOAD_MODAL
}

export interface closeUploadModalInterface extends Action<MenuListActionTypes> {
  type: MenuListActionTypes.CLOSE_UPLOAD_MODAL
}

export interface deleteMenuInterface extends Action<MenuListActionTypes> {
  type: MenuListActionTypes.DELETE_MENU_SAGA,
  payload: { menu_id: string }
}

export interface updateMenuInterface extends Action<MenuListActionTypes> {
  type: MenuListActionTypes.UPDATE_MENU_SAGA,
}

export interface closePublicationCountAlertInterface extends Action<MenuListActionTypes> {
  type: MenuListActionTypes.CLOSE_PUBLICATION_COUNT_ALERT,
  payload: { aggregator_name: string, count: number }
}

// ACTOION CREATORS 

export const fetchMenuList = (query: string): fetchMenuListInterface => ({ type: MenuListActionTypes.FETCH_MENU_LIST_SAGA, payload: query });

export const fetchMenuListSuccess = (payload: FetchMenuListSuccessPayload): fetchMenuListSuccessInterface => ({ type: MenuListActionTypes.FETCH_MENU_LIST_SUCCESS, payload });

export const clearMenuList = (): clearMenuListInterface => ({ type: MenuListActionTypes.CLEAR_MENU_LIST });

export const publicationMenu = (payload: PublictionMenuPayload[]): publicationMenuInterface => ({ type: MenuListActionTypes.PUBLICATION_MENU_SAGA, payload });

export const openUploadModal = (): openUploadModalInterface => ({ type: MenuListActionTypes.OPEN_UPLOAD_MODAL });

export const closeUploadModal = (): closeUploadModalInterface => ({ type: MenuListActionTypes.CLOSE_UPLOAD_MODAL });

export const deleteMenu = (payload: { menu_id: string }): deleteMenuInterface => ({ type: MenuListActionTypes.DELETE_MENU_SAGA, payload });

export const updateMenu = (): updateMenuInterface => ({ type: MenuListActionTypes.UPDATE_MENU_SAGA });

export const fetchMenuPublicationCount = (): fetchPublicationMenuCountInterface => ({ type: MenuListActionTypes.FETCH_PUBLICATION_COUNT_SAGA });

export const fetchMenuPublicationCountSuccess = (payload: PublicationBody[] | null): fetchPublicationMenuCountSuccessInterface => (
  { type: MenuListActionTypes.FETCH_PUBLICATION_COUNT_SUCCESS, payload }
);

export const closePublicationCountAlert = (payload: { aggregator_name: string, count: number }): closePublicationCountAlertInterface => (
  { type: MenuListActionTypes.CLOSE_PUBLICATION_COUNT_ALERT, payload }
);

// ALL MENU LIST ACTIONS 
export type MenuListActions = fetchMenuListInterface | clearMenuListInterface
  | publicationMenuInterface | openUploadModalInterface | closeUploadModalInterface
  | deleteMenuInterface | updateMenuInterface | fetchMenuListSuccessInterface | fetchPublicationMenuCountSuccessInterface
  | closePublicationCountAlertInterface;