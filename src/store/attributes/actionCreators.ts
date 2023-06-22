import {
	ADD_ATTRIBUTE_TO_ATTRIBUTE_GROUP_SAGA,
	CLEAR_ATTRIBUTE_STATE,
	EDIT_ATTRIBUTE_GROUP_SAGA,
	FETCH_ATTRIBUTES_AND_PRODUCTS_SAGA,
	FETCH_ATTRIBUTE_GROUP_DETAIL_SAGA,
	FETCH_ATTRIBUTE_GROUP_SAGA,
	FETCH_ATTRIBUTE_GROUP_PRODUCTS_SAGA,
	UPDATE_ATTRIBUTE_GROUP_SAGA
} from "./types/types";

export const fetchAttributesAndProducts = (payload: any) => ({ type: FETCH_ATTRIBUTES_AND_PRODUCTS_SAGA, payload });
export const addAttributeToAttributeGroup = (payload: any) => ({ type: ADD_ATTRIBUTE_TO_ATTRIBUTE_GROUP_SAGA, payload });
export const fetchAttributeGroup = (menu_id: string, search: string = "") => ({ type: FETCH_ATTRIBUTE_GROUP_SAGA, payload: menu_id, search: search });
export const fetchAttributeGroupDetail = (payload: any) => ({ type: FETCH_ATTRIBUTE_GROUP_DETAIL_SAGA, payload });
export const clearAttributeState = () => ({ type: CLEAR_ATTRIBUTE_STATE });
export const editAttributeGroup = (menu_id: string, body: any) => ({ type: EDIT_ATTRIBUTE_GROUP_SAGA, payload: { menu_id, body } });
export const fetchAttributeGroupProducts = (payload: any) => ({ type: FETCH_ATTRIBUTE_GROUP_PRODUCTS_SAGA, payload });
export const updateAttributeGroup = (payload: any) => ({ type: UPDATE_ATTRIBUTE_GROUP_SAGA, payload });
