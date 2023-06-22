import {
	EDIT_MENU_PRODUCT_SAGA, DELETE_MENU_PRODUCT_SAGA,
	EDIT_MENU_SAGA, EDIT_MENU_SECTION_SAGA, FETCH_MENU_ITEM_SAGA, FETCH_MENU_PRODUCTS_SAGA,
	FETCH_MENU_PRODUCT_SAGA, FETCH_MENU_SECTION_SAGA, MATCH_MENU_REQUEST_SAGA, SET_BTN_SUBMIT_IN_PROGRESS_STATUS,
	UPLOAD_MENU_PRODUCT_IMAGE,
	CLEAR_MENU_PRODUCT, EDIT_MENU_PRODUCT_WITHOUT_NAVIGATION_SAGA, CREATE_MENU_PRODUCT_SAGA, SET_CREATE_PRODUCT_ALERT_MODAL,
	FETCH_DEFAULT_ATTRIBUTE_LIST_SAGA, CHECK_MENU_VALIDATION_SAGA,
	ADD_EXIST_ATTRIBUTE_GROUPE_SAGA, ADD_COLLECTION_SAGA, UPDATE_COLLECTION_SAGA,
	ADD_CATEGORY_SAGA,
	DELETE_COLLECTION_SAGA,
	DELETE_CATEGORY_SAGA,
	HANDLE_COLLECTION_CLICK_SAGA,
	FETCH_MENU_COLLECTIONS_SAGA,
	CLEAR_MENU_COLLECTIONS_SECTIONS_PRODUCTS
} from "./types/actionTypes";


export const fetchMenuItem = (menuId: string) => ({ type: FETCH_MENU_ITEM_SAGA, payload: menuId });


export const fetchMenuSection = (menuId: string, withGet?: boolean) => ({ type: FETCH_MENU_SECTION_SAGA, payload: { menuId, withGet } });

export const fetchMenuCollections = (menu_id: string) => ({ type: FETCH_MENU_COLLECTIONS_SAGA, payload: menu_id });

export const handleCollectionClick = (payload: any) => ({ type: HANDLE_COLLECTION_CLICK_SAGA, payload });

export const editMenuSections = (payload: any) => ({ type: EDIT_MENU_SECTION_SAGA, payload });

export const fetchMenuProducts = (payload: any) => ({ type: FETCH_MENU_PRODUCTS_SAGA, payload });

export const clearMenuInfo = () => ({ type: CLEAR_MENU_COLLECTIONS_SECTIONS_PRODUCTS });

export const fetchMenuProduct = (payload: any) => ({ type: FETCH_MENU_PRODUCT_SAGA, payload });

export const editMenuProduct = (payload: any) => ({ type: EDIT_MENU_PRODUCT_SAGA, payload });

export const deleteMenuProduct = (payload: any) => ({ type: DELETE_MENU_PRODUCT_SAGA, payload });

export const matchingProduct = (payload: any) => ({ type: MATCH_MENU_REQUEST_SAGA, payload });

export const editMenu = (payload: any) => ({ type: EDIT_MENU_SAGA, payload });

export const uploadMenuProductImage = (payload: any) => ({ type: UPLOAD_MENU_PRODUCT_IMAGE, payload });

export const setBtnInProgressStatus = (payload: boolean) => ({ type: SET_BTN_SUBMIT_IN_PROGRESS_STATUS, payload });

export const clearMenuProductDetail = () => ({ type: CLEAR_MENU_PRODUCT });

export const editMenuProductWithoutNav = (payload: any) => ({ type: EDIT_MENU_PRODUCT_WITHOUT_NAVIGATION_SAGA, payload });

export const createMenuProduct = (payload: any) => {

	return ({ type: CREATE_MENU_PRODUCT_SAGA, payload });
};

export const setAlertModal = (payload: boolean) => ({ type: SET_CREATE_PRODUCT_ALERT_MODAL, payload });

export const fetchDefaultAttributeList = (product_id: string) => ({ type: FETCH_DEFAULT_ATTRIBUTE_LIST_SAGA, payload: product_id });

export const checkMenuValidation = (menu_id: string) => ({ type: CHECK_MENU_VALIDATION_SAGA, payload: menu_id });

export const addExistAttributeGroup = (payload: any) => ({ type: ADD_EXIST_ATTRIBUTE_GROUPE_SAGA, payload });

export const addNewCollection = (payload: any) => ({ type: ADD_COLLECTION_SAGA, payload });

export const deleteCollection = (payload: any) => ({ type: DELETE_COLLECTION_SAGA, payload });

export const updateCollection = (payload: any) => ({ type: UPDATE_COLLECTION_SAGA, payload });

export const addNewCategory = (payload: any) => ({ type: ADD_CATEGORY_SAGA, payload });

export const deleteCategory = (payload: any) => ({ type: DELETE_CATEGORY_SAGA, payload });