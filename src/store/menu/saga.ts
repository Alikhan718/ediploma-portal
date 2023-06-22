import { menusApi } from "@src/service/api";
import { getRequestError } from "@src/utils/getRequestError";
import { call, put, select, takeLatest } from "redux-saga/effects";
import { setGlobalLoader, setSnackbar } from "../generals/actionCreators";
import { LoadingStatus } from "../generals/types";
import { fetchMenuCollections, fetchMenuProduct, fetchMenuProducts, fetchMenuSection, setAlertModal, setBtnInProgressStatus } from "./actionCreators";
import {
  EDIT_MENU_PRODUCT_SAGA, EDIT_MENU_PRODUCT_WITHOUT_NAVIGATION_SAGA, EDIT_MENU_SAGA, EDIT_MENU_SECTION_SAGA,
  FETCH_MENU_ITEM_SAGA, FETCH_MENU_ITEM_SUCCESS, FETCH_MENU_PRODUCTS_SAGA, FETCH_MENU_PRODUCTS_SUCCESS, FETCH_MENU_PRODUCT_SAGA,
  FETCH_MENU_PRODUCT_SUCCESS, FETCH_MENU_SECTION_ERROR, FETCH_MENU_SECTION_SAGA, FETCH_MENU_SECTION_SUCCESS,
  MATCH_MENU_REQUEST_SAGA, MATCH_MENU_SUCCESS, SET_LOADING_STATUS, UPLOAD_MENU_PRODUCT_IMAGE, DELETE_MENU_PRODUCT_SAGA,
  CREATE_MENU_PRODUCT_SAGA, FETCH_DEFAULT_ATTRIBUTE_LIST_SUCCESS, FETCH_DEFAULT_ATTRIBUTE_LIST_SAGA, CHECK_MENU_VALIDATION_SAGA,
  ADD_EXIST_ATTRIBUTE_GROUPE_SAGA, ADD_COLLECTION_SAGA, UPDATE_COLLECTION_SAGA, ADD_NEW_COLLECTION_SUCCESS, ADD_NEW_CATEGORY_SUCCESS,
  DELETE_COLLECTION_SAGA, ADD_CATEGORY_SAGA, DELETE_CATEGORY_SAGA, HANDLE_COLLECTION_CLICK_SAGA, HANDLE_COLLECTION_SUCCESS, FETCH_MENU_COLLECTIONS_SAGA, FETCH_MENU_COLLECTIONS_SUCCESS,
}
  from "./types/actionTypes";
import { fetchAttributeGroupProducts } from "@src/store/attributes/actionCreators";


export function* editMenuRequest(action: any) {
  try {
    yield put({ type: SET_LOADING_STATUS, payload: true });
    const { body, menu_id } = action.payload;
    yield call(menusApi.editMenu, body, menu_id);
    yield put({ type: SET_LOADING_STATUS, payload: false });
    yield put(setSnackbar({ visible: true, message: "Menu Updated Successfull", status: "success" }));
  } catch (e) {
    yield put({ type: SET_LOADING_STATUS, payload: false });
    yield put(setSnackbar({ visible: true, message: "Menu Updated Error", status: "success" }));

  }
}
export function* fetchMenuItemRequest(action: any) {
  try {
    const { data } = yield call(menusApi.getMenuItem, action.payload);
    yield put({ type: FETCH_MENU_ITEM_SUCCESS, payload: data });
  } catch (e) {
    yield put(setSnackbar({ visible: true, message: "Network error", status: "error" }));
  }
}

export function* fetchMenuSectionRequest(action: any) {
  try {
    yield put(setGlobalLoader(LoadingStatus.LOADING));
    const { data } = yield call(menusApi.getMenuSection, action.payload.menuId);
    yield put({ type: FETCH_MENU_SECTION_SUCCESS, payload: data });
    yield put(fetchMenuProducts({ menu_id: action.payload.menuId, section_name: data[0].id, page: 1 }));
    yield put(setGlobalLoader(LoadingStatus.SUCCESS));
  } catch (e: any) {
    yield put(setGlobalLoader(LoadingStatus.ERROR));
    yield put({ type: FETCH_MENU_SECTION_ERROR });
    yield put(setSnackbar({ visible: true, message: getRequestError(e), status: "error" }));
  }
}

export function* fetchMenuCollectionsRequest(action: any) {
  try {
    yield put(setGlobalLoader(LoadingStatus.LOADING));
    const { data } = yield call(menusApi.getMenuCollections, action.payload);
    yield put({ type: FETCH_MENU_COLLECTIONS_SUCCESS, payload: data });
    yield put(fetchMenuProducts({ menu_id: action.payload, section_name: data[0].sections[0].id, page: 1 }));
    yield put(setGlobalLoader(LoadingStatus.SUCCESS));
  } catch (e) {
    yield put(setGlobalLoader(LoadingStatus.ERROR));
    yield put(setSnackbar({ visible: true, message: getRequestError(e), status: "error" }));
  }
}

export function* handleClickCollectionRequest(action: any) {
  try {
    const { collection_id, menu_id } = action.payload;
    const { collections } = yield select(store => store.menus);
    const active_collection = collections.filter((el: any) => el.id === collection_id)[0];
    const payload = {
      active_collection_name: collection_id,
      sections: active_collection.sections,
      active_section_name: active_collection.sections[0].id
    };
    yield put({ type: HANDLE_COLLECTION_SUCCESS, payload });

    yield put(fetchMenuProducts({ menu_id, section_name: active_collection.sections[0].id, page: 1 }));
  } catch (e) {
    yield put(setSnackbar({ visible: true, message: getRequestError(e), status: "error" }));
  }
}


export function* editMenuSectionsRequest(action: any) {
  try {
    // action.payload = menu_id;
    yield put(setBtnInProgressStatus(true));
    const { menu_id, menu_sections } = action.payload;
    yield call(menusApi.editMenuSections, menu_id, JSON.stringify([...menu_sections]));
    yield put(setSnackbar({ visible: true, message: "Section Updated SuccessFull", status: "success" }));
    yield put(setBtnInProgressStatus(false));
    yield put(fetchMenuSection(menu_id));
  } catch (e: any) {
    yield put(setBtnInProgressStatus(false));
    yield put(setSnackbar({ visible: true, message: getRequestError(e), status: "error" }));
  }
}



export function* fetchMenuProductsRequest(action: any) {
  try {
    yield put(setGlobalLoader(LoadingStatus.LOADING));
    const { menu_id, section_name, page, field, search_name, sort_order } = action.payload;
    const { currLocation } = yield select(store => store.locations);
    const { data } = yield call(menusApi.getMenuProductsForMatching, menu_id, currLocation, section_name, page, field, search_name, sort_order);
    yield put({ type: FETCH_MENU_PRODUCTS_SUCCESS, payload: { ...data, section_name, sort_order, field } });
    yield put(setGlobalLoader(LoadingStatus.SUCCESS));
  } catch (e) {
    yield put(setSnackbar({ visible: true, message: getRequestError(e), status: "error" }));
    yield put(setGlobalLoader(LoadingStatus.ERROR));
  }
}
export function* matchingProductRequest(action: any) {
  try {
    const { menu_id, aggregator_product_id, pos_product_id, available, section, page } = action.payload;
    const body = { aggregator_product_id, pos_product_id, available };
    yield call(menusApi.matchingPorduct, menu_id, body);
    yield put({ type: MATCH_MENU_SUCCESS, payload: aggregator_product_id, pos_product_id });
  } catch (e) {
    yield put(setSnackbar({ visible: true, message: getRequestError(e), status: "error" }));

  }
}
export function* fetchMenuProductRequest(action: any) {
  try {
    yield put({ type: SET_LOADING_STATUS, payload: true });
    const { product_id, menu_id } = action.payload;
    const restaurant_id = localStorage.getItem("currLocation") || '';
    const { data } = yield call(menusApi.getMenuProduct, product_id, menu_id, restaurant_id);


    yield put({ type: FETCH_MENU_PRODUCT_SUCCESS, payload: data });
    yield put({ type: SET_LOADING_STATUS, payload: false });
  } catch (e) {
    yield put(setSnackbar({ status: "error", message: getRequestError(e), visible: true }));
    yield put({ type: SET_LOADING_STATUS, payload: false });
  }
}
export function* editMenuProductRequest(action: any) {
  try {
    yield put({ type: SET_LOADING_STATUS, payload: true });

    const { menu_id, product_id, navigate, body, url } = action.payload;

    const { currLocation } = yield select(store => store.locations);
    const { page, active_section_name } = yield select(store => store.menus);

    yield call(menusApi.editProduct, menu_id, product_id, currLocation, body);

    if (!!navigate) {
      if (url.includes('/')) {
        const attribute_group_id = url.split("/")[0];
        yield put(fetchAttributeGroupProducts({ ...action.payload, menu_id, attribute_group_id }));
        navigate('');
      } else {
        yield put(fetchMenuProducts({ ...action.payload, page, section_name: active_section_name }));
        navigate(url);
      }
    }
    yield put({ type: SET_LOADING_STATUS, payload: false });

  } catch (e: any) {
    yield put({ type: SET_LOADING_STATUS, payload: false });
    yield put(setSnackbar({ visible: true, message: getRequestError(e), status: "error" }));
  }
}
export function* editMenuWithoutNavigation(action: any) {
  try {
    yield put({ type: SET_LOADING_STATUS, payload: true });
    const { menu_id, product_id, body } = action.payload;
    const { currLocation } = yield select(store => store.locations);

    yield call(menusApi.editProduct, menu_id, product_id, currLocation, body);

    yield put(fetchMenuProduct({ menu_id, product_id }));


  } catch (e: any) {
    yield put({ type: SET_LOADING_STATUS, payload: false });
    yield put(setSnackbar({ visible: true, message: getRequestError(e), status: "error" }));
  }
}

export function* uploadMenuProductImageRequest(action: any) {
  try {
    yield put({ type: SET_LOADING_STATUS, payload: true });
    const { menu_id, body } = action.payload;
    const { data } = yield call(menusApi.uploadProductImg, menu_id, body);

    yield put(fetchMenuProduct({ menu_id, product_id: body.product_id }));
  } catch (e) {
    yield put(setSnackbar({ visible: true, message: getRequestError(e), status: "error" }));
    yield put({ type: SET_LOADING_STATUS, payload: false });

  }
}

export function* deleteMenuProductRequest(action: any) {
  try {
    yield put({ type: SET_LOADING_STATUS, payload: true });
    const { menu_id, product_id, isDeleted } = action.payload;
    const { currLocation } = yield select(store => store.locations);
    const { page, active_section_name } = yield select(store => store.menus);
    yield call(menusApi.deleteProduct, menu_id, product_id, currLocation, isDeleted);
    yield put(fetchMenuProducts({ ...action.payload, page, section_name: active_section_name }));
    yield put({ type: SET_LOADING_STATUS, payload: false });
  } catch (e: any) {
    yield put({ type: SET_LOADING_STATUS, payload: false });
    yield put(setSnackbar({ visible: true, message: getRequestError(e), status: "error" }));
  }
}

export function* createMenuProductRequest(action: any) {
  try {
    const { menu_id, body } = action.payload;
    const { page, active_section_name } = yield select(store => store.menus);

    console.log(body);

    yield call(menusApi.createProduct, menu_id, body);
    yield put(setAlertModal(true));
    yield put(fetchMenuProducts({ ...action.payload, page, section_name: active_section_name }));

  } catch (e: any) {
    yield put({ type: SET_LOADING_STATUS, payload: false });
    yield put(setSnackbar({ visible: true, message: getRequestError(e), status: "error" }));
  }
}

export function* fetchDefaultAttributeListRequest(action: any) {
  try {
    const { currLocation } = yield select(store => store.locations);

    const { data } = yield call(menusApi.getDefaultAttributes, currLocation, action.payload);
    yield put({ type: FETCH_DEFAULT_ATTRIBUTE_LIST_SUCCESS, payload: data });
  } catch (e: any) {
    yield put({ type: SET_LOADING_STATUS, payload: false });
    yield put(setSnackbar({ visible: true, message: getRequestError(e), status: "error" }));
  }
}
export function* checkMenuValidationRequest(action: any) {
  try {
    yield put(setGlobalLoader(LoadingStatus.LOADING));
    const { data } = yield call(menusApi.menuValidation, action.payload);

    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(data)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "data.json";
    link.click();

    yield put(setGlobalLoader(LoadingStatus.SUCCESS));
    yield put(setSnackbar({ visible: true, message: "Menu Validation Success", status: "success" }));
  } catch (e: any) {
    yield put(setGlobalLoader(LoadingStatus.SUCCESS));
    yield put(setSnackbar({ visible: true, message: getRequestError(e), status: "error" }));
  }
}
export function* addExistAttributeGroupRequest(action: any) {
  try {
    const { menu_id, product_id, attribute_group_id } = action.payload;
    yield call(menusApi.addExistAttributeGroup, menu_id, product_id, attribute_group_id);
    yield put(fetchMenuProduct({ menu_id, product_id }));
    yield put(setSnackbar({ visible: true, message: "Success Added", status: "success" }));
  } catch (e: any) {
    yield put(setSnackbar({ visible: true, message: getRequestError(e), status: "error" }));
  }
}

export function* addNewCollectionRequest(action: any) {
  try {
    const { menu_id, name } = action.payload;
    const { data } = yield call(menusApi.addMenuCollection, menu_id, name);
    yield put({ type: ADD_NEW_COLLECTION_SUCCESS, payload: data });
    yield put(fetchMenuCollections(menu_id));
  } catch (e: any) {
    yield put(setSnackbar({ visible: true, message: getRequestError(e), status: "error" }));
  }
}

export function* deleteCollectionRequest(action: any) {
  try {
    const { menu_id, collection } = action.payload;
    yield call(menusApi.deleteMenuCollection, menu_id, collection);
    yield put(fetchMenuCollections(menu_id));
  } catch (e: any) {
    yield put(setSnackbar({ visible: true, message: getRequestError(e), status: "error" }));
  }
}

export function* updateCollectionRequest(action: any) {
  try {
    const { menu_id, data, is_wolt } = action.payload;
    yield call(menusApi.updateMenuCollection, menu_id, data);
    yield put({ type: FETCH_MENU_SECTION_SUCCESS, payload: data.collections });
    if (is_wolt) {
      yield put(fetchMenuSection(menu_id));
    } else {
      yield put(fetchMenuCollections(menu_id));
    }
  } catch (e: any) {
    yield put(setSnackbar({ visible: true, message: getRequestError(e), status: "error" }));
  }
}

export function* addNewCategoryRequest(action: any) {
  try {
    const { menu_id, collection, is_wolt } = action.payload;
    const { data } = yield call(menusApi.addMenuCategory, menu_id, collection);
    yield put({ type: ADD_NEW_CATEGORY_SUCCESS, payload: data });
    if (!is_wolt) {
      yield put(fetchMenuCollections(menu_id));
    }
    yield put(fetchMenuSection(menu_id));
  } catch (e: any) {
    yield put(setSnackbar({ visible: true, message: getRequestError(e), status: "error" }));
  }
}

export function* deleteCategoryRequest(action: any) {
  try {
    const { menu_id, section, is_wolt } = action.payload;
    yield call(menusApi.deleteMenuCategory, menu_id, section);

    if (!is_wolt) {
      yield put(fetchMenuCollections(menu_id));
    }
    yield put(fetchMenuSection(menu_id));
  } catch (e: any) {
    yield put(setSnackbar({ visible: true, message: getRequestError(e), status: "error" }));
  }
}

export function* menusSaga() {
  yield takeLatest(FETCH_MENU_ITEM_SAGA, fetchMenuItemRequest);
  yield takeLatest(FETCH_MENU_SECTION_SAGA, fetchMenuSectionRequest);
  yield takeLatest(FETCH_MENU_PRODUCTS_SAGA, fetchMenuProductsRequest);
  yield takeLatest(FETCH_MENU_PRODUCT_SAGA, fetchMenuProductRequest);
  yield takeLatest(EDIT_MENU_PRODUCT_SAGA, editMenuProductRequest);
  yield takeLatest(DELETE_MENU_PRODUCT_SAGA, deleteMenuProductRequest);
  yield takeLatest(UPLOAD_MENU_PRODUCT_IMAGE, uploadMenuProductImageRequest);
  yield takeLatest(EDIT_MENU_SAGA, editMenuRequest);
  yield takeLatest(MATCH_MENU_REQUEST_SAGA, matchingProductRequest);
  yield takeLatest(EDIT_MENU_SECTION_SAGA, editMenuSectionsRequest);
  yield takeLatest(EDIT_MENU_PRODUCT_WITHOUT_NAVIGATION_SAGA, editMenuWithoutNavigation);
  yield takeLatest(CREATE_MENU_PRODUCT_SAGA, createMenuProductRequest);
  yield takeLatest(FETCH_DEFAULT_ATTRIBUTE_LIST_SAGA, fetchDefaultAttributeListRequest);
  yield takeLatest(CHECK_MENU_VALIDATION_SAGA, checkMenuValidationRequest);
  yield takeLatest(ADD_EXIST_ATTRIBUTE_GROUPE_SAGA, addExistAttributeGroupRequest);
  yield takeLatest(ADD_COLLECTION_SAGA, addNewCollectionRequest);
  yield takeLatest(UPDATE_COLLECTION_SAGA, updateCollectionRequest);
  yield takeLatest(DELETE_COLLECTION_SAGA, deleteCollectionRequest);
  yield takeLatest(ADD_CATEGORY_SAGA, addNewCategoryRequest);
  yield takeLatest(DELETE_CATEGORY_SAGA, deleteCategoryRequest);
  yield takeLatest(FETCH_MENU_COLLECTIONS_SAGA, fetchMenuCollectionsRequest);
  yield takeLatest(HANDLE_COLLECTION_CLICK_SAGA, handleClickCollectionRequest);
}
