import { SelectAllActionTypes } from "./actionTypes";

export const fetchProductLocations = (menu_id: string) => ({ type: SelectAllActionTypes.FETCH_SELECT_ALL_LOCATIONS_SAGA, payload: menu_id });

export const setOldProduct = (product: any) => ({ type: SelectAllActionTypes.SET_OLD_PRODUCT, payload: product });
export const setNewProduct = (product: any) => ({ type: SelectAllActionTypes.SET_NEW_PRODUCT, payload: product });