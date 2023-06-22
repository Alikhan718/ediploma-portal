import { menusApi } from "@src/service/api";
import { getRequestError } from "@src/utils/getRequestError";
import { call, put, select, takeLatest } from "redux-saga/effects";
import { setGlobalLoader, setSnackbar } from "../generals/actionCreators";
import { LoadingStatus } from "../generals/types";
import { clearMenuList, closeUploadModal, fetchMenuList, publicationMenuInterface, fetchMenuListInterface, fetchPublicationMenuCountInterface, fetchMenuPublicationCount, fetchMenuPublicationCountSuccess } from "./actionCreators";
import { MenuListActionTypes } from "./types/actionTypes";


export function* fetchMenuListRequest(action: fetchMenuListInterface) {
  try {
    yield put(setGlobalLoader(LoadingStatus.LOADING));

    let query = action.payload || "page=1&field=date";
    const { currLocation } = yield select(store => store.locations);

    const { data } = yield call(menusApi.getMenusList, currLocation, query);
    
    yield put({ type: MenuListActionTypes.FETCH_MENU_LIST_SUCCESS, payload: data });
    yield put(fetchMenuPublicationCount());
    yield put(setGlobalLoader(LoadingStatus.SUCCESS));

  } catch (e) {
    yield put(clearMenuList());
    yield put(setGlobalLoader(LoadingStatus.ERROR));
    yield put(setSnackbar({ status: "error", message: getRequestError(e), visible: true }));
  }
}
export function* fetchMenuPriceUpdates(action: any) {
  try {
    yield put({ type: MenuListActionTypes.FETCH_MENU_UPDATE_PRICE_LIST });
    const { currLocation } = yield select(store => store.locations);
    const { data } = yield call(menusApi.getUpdatedPriceList, currLocation);
    yield put({ type: MenuListActionTypes.FETCH_MENU_UPDATE_PRICE_LIST_SUCCESS, payload: data });
  } catch (e) {
    yield put({ type: MenuListActionTypes.FETCH_MENU_UPDATE_PRICE_LIST_ERROR });
    yield put(setSnackbar({ status: "error", message: getRequestError(e), visible: true }));
  }
}
export function* updateMenuPriceListRequest(action: any) {
  try {
    yield put(setGlobalLoader(LoadingStatus.LOADING));

    const { currLocation } = yield select(store => store.locations);
    yield call(menusApi.updateMenuPriceList, currLocation, action.payload);
    yield put(setGlobalLoader(LoadingStatus.SUCCESS));
    yield put(setSnackbar({ status: "success", message: "Updated Successful", visible: true }));
    yield put(closeUploadModal());
  } catch (e) {
    yield put(setGlobalLoader(LoadingStatus.ERROR));

    yield put(setSnackbar({ status: "error", message: getRequestError(e), visible: true }));
  }
}
export function* uploadMenuRequest(action: publicationMenuInterface) {
  try {
    yield put(setGlobalLoader(LoadingStatus.LOADING));
    yield call(menusApi.uploadMenu, action.payload);
    const { menu_id } = action.payload[0];
    // yield put(updateAllStopLists(menu_id));
    yield put(setSnackbar({ status: "success", message: "Publicated", visible: true }));
    yield put(fetchMenuPublicationCount());
    yield put(setGlobalLoader(LoadingStatus.SUCCESS));
    yield put(fetchMenuList(''));
  } catch (e) {
    yield put(setGlobalLoader(LoadingStatus.ERROR));
    yield put(setSnackbar({ status: "error", message: getRequestError(e), visible: true }));
  }
}
export function* fetchPublicationMenuCountRequest(action: fetchPublicationMenuCountInterface) {
  try {
    const { currLocation } = yield select(store => store.locations);
    const { data } = yield call(menusApi.getMenuPublicationCount, currLocation);
    yield put(fetchMenuPublicationCountSuccess(data.available_uploads));
  } catch (e) {
    yield put(setSnackbar({ status: "error", message: getRequestError(e), visible: true }));
  }
}
export function* updateMenuRequest() {
  try {
    const { currLocation } = yield select(store => store.locations);
    yield call(menusApi.updateMenu, currLocation);
    yield put(setSnackbar({ status: "success", message: "Menu Updated Success", visible: true }));

  } catch (e) {
    yield put(setSnackbar({ status: "error", message: getRequestError(e), visible: true }));

  }
}
export function* deleteMenuRequest(action: any) {
  try {
    yield put(setGlobalLoader(LoadingStatus.LOADING));
    const { menu_id } = action.payload;
    const { currLocation } = yield select(store => store.locations);
    yield call(menusApi.deleteMenu, menu_id, currLocation);
    yield put(fetchMenuList(''));
    yield put(setGlobalLoader(LoadingStatus.SUCCESS));
    yield put(setSnackbar({ visible: true, message: "Menu deleted successfull", status: "success" }));
  } catch (e: any) {
    yield put(setGlobalLoader(LoadingStatus.ERROR));
    yield put(setSnackbar({ visible: true, message: getRequestError(e), status: "error" }));
  }
}


export function* menusListSaga() {
  yield takeLatest(MenuListActionTypes.FETCH_MENU_LIST_SAGA, fetchMenuListRequest);
  yield takeLatest(MenuListActionTypes.FETCH_MENU_UPDATE_PRICE_LIST_SAGA, fetchMenuPriceUpdates);
  yield takeLatest(MenuListActionTypes.UPDATE_MENU_PRICE_LIST_SAGA, updateMenuPriceListRequest);
  yield takeLatest(MenuListActionTypes.PUBLICATION_MENU_SAGA, uploadMenuRequest);
  yield takeLatest(MenuListActionTypes.DELETE_MENU_SAGA, deleteMenuRequest);
  yield takeLatest(MenuListActionTypes.UPDATE_MENU_SAGA, updateMenuRequest);
  yield takeLatest(MenuListActionTypes.FETCH_PUBLICATION_COUNT_SAGA, fetchPublicationMenuCountRequest);
}