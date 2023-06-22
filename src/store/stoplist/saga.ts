import { menusApi, stopListsApi } from "@src/service/api";
import { getRequestError } from "@src/utils/getRequestError";
import { call, put, select, take, takeLatest } from "redux-saga/effects";
import { setGlobalLoader, setSnackbar } from "../generals/actionCreators";
import { LoadingStatus } from "../generals/types";


import { DISABLE_PRODUCT_SAGA, ENABLE_PRODUCT_SAGA, FETCH_AGGREGATORS_SUCCESS, GET_PRODUCT_STORES_SAGA, GET_PRODUCT_STORES_SUCCESS, GET_SECTION_LIST_ERROR, GET_SECTION_LIST_SUCCESS, GET_STOP_LIST_AGGREGATORS_SAGA, GET_STOP_LIST_SAGA, GET_STOP_LIST_SUCCESS, SET_IS_FETCHING, SWITCH_STOP_LIST_PRODMODE, UPDATE_ALL_STOP_LISTS_SAGA, UPDATE_STOP_LISTS } from "./types/actionTypes";

import { fetchStopList, } from "./reducer";


export function* fetchStopListAggregatorsRequest(action: any): any {
  try {
    yield put(setGlobalLoader(LoadingStatus.LOADING));

    const { currLocation } = yield select(store => store.locations);

    const { data } = yield call(menusApi.getMenusList, currLocation, "page=1&field=date");
    const menulist = data?.data?.filter((el: any) => el.is_active);

    // get sections list request 
    if (menulist.length > 0) {
      yield put({ type: FETCH_AGGREGATORS_SUCCESS, payload: menulist });
      yield put(fetchStopList("Все", 1, menulist[0]?.menu_id, undefined, ''));
    } else {
      yield put(setGlobalLoader(LoadingStatus.ERROR));

    }
  } catch (e: any) {
    yield put({ type: GET_SECTION_LIST_ERROR });
    yield put(setSnackbar({ status: "error", message: e.response.data.message, visible: true }));
    yield put(setGlobalLoader(LoadingStatus.ERROR));
  }
}

export function* fetchStopListRequest(action: any): any {
  const { page, per_page, section_name, available, search_text, menu_id } = action.payload;
  try {
    yield put(setGlobalLoader(LoadingStatus.LOADING));
    const { currLocation } = yield select(store => store.locations);
    let data: any = {};
    if (search_text) {
      const { data: reqBody } = yield call(menusApi.getMenuProductsForMatching, menu_id, currLocation, undefined, 1, null, search_text);
      data['product'] = reqBody.aggregator;
      data['pagination'] = reqBody.pagination;
    } else {
      const { data: reqBody } = yield call(stopListsApi.getProducts, currLocation, menu_id, per_page, page, available);
      data = reqBody;
    }

    yield put({
      type: GET_STOP_LIST_SUCCESS,
      payload: {
        data: data.product,
        section_name,
        page,
        page_count: data.pagination.page_count,
        search_text,
        menu_id
      }
    });

    yield put(setGlobalLoader(LoadingStatus.SUCCESS));

  } catch (e: any) {
    yield put(setGlobalLoader(LoadingStatus.ERROR));
  }
}

export function* switchStopListProdRequest(action: any) {
  try {
    yield call(stopListsApi.switchModeStopListProd, action.payload.rest_id, action.payload.product_id, action.payload.is_available);
    const { page, active_section_name } = yield select(state => state.stopLists);
    // yield put(fetchStopList(active_section_name, page));
  } catch (e: any) {
    yield put(setSnackbar({ status: "error", message: getRequestError(e), visible: true }));
  }
}

export function* updateStopListsRequest() {
  try {
    yield put(setGlobalLoader(LoadingStatus.LOADING));
    const { currLocation } = yield select(state => state.locations);
    const { data } = yield call(stopListsApi.updateStopLists, currLocation);
    yield put(setSnackbar({ status: "success", message: "Menu Updated", visible: true }));
    yield put(setGlobalLoader(LoadingStatus.SUCCESS));
    // yield put(fetchProductList(currLocation));
  } catch (e: any) {
    yield put(setSnackbar({ status: "error", message: getRequestError(e), visible: true }));
    yield put(setGlobalLoader(LoadingStatus.ERROR));

  }
}
export function* updateAllStopsListsRequest() {
  try {
    yield put(setGlobalLoader(LoadingStatus.LOADING));
    const { currLocation } = yield select(state => state.locations);
    // yield call(stopListsApi.updateStopLists, action.payload);
    yield call(stopListsApi.updateStops, currLocation);
    yield put(setGlobalLoader(LoadingStatus.SUCCESS));
  } catch (e: any) {
    yield put(setSnackbar({ status: "success", message: "Success updated stoplist 	", visible: true }));
    yield put(setGlobalLoader(LoadingStatus.ERROR));
  }
}

export function* getProductStoresRequest(action: any) {
  try {
    yield put({ type: SET_IS_FETCHING, payload: true });

    const { product_id, is_available } = action.payload;
    const { data } = yield call(stopListsApi.getProductStores, product_id, is_available);

    yield put({ type: GET_PRODUCT_STORES_SUCCESS, payload: data });

  } catch (e) {


    yield put({ type: SET_IS_FETCHING, payload: false });
    yield put(setSnackbar({ status: "error", message: getRequestError(e), visible: true }));
  }
}

export function* enableProductRequest(action: any) {
  try {
    yield put({ type: SET_IS_FETCHING, payload: true });
    const { product_id, payload, navigate } = action.payload;

    const { aggregators } = yield select(state => state.stopLists);


    const { data } = yield call(stopListsApi.enableProduct, product_id, payload);

    yield put({ type: SET_IS_FETCHING, payload: false });
    yield put(fetchStopList("Все", 1, aggregators[0]?.menu_id, undefined, ''));

    navigate('/app/stopList');

  } catch (e) {
    yield put({ type: SET_IS_FETCHING, payload: false });
    yield put(setSnackbar({ status: "error", message: getRequestError(e), visible: true }));
  }
}

export function* disableProductRequest(action: any) {
  try {
    yield put({ type: SET_IS_FETCHING, payload: true });
    const { product_id, payload, navigate } = action.payload;
    const { data } = yield call(stopListsApi.disableProduct, product_id, payload);
    const { aggregators } = yield select(state => state.stopLists);
    yield put(fetchStopList("Все", 1, aggregators[0]?.menu_id, undefined, ''));
    yield put({ type: SET_IS_FETCHING, payload: false });
    navigate('/app/stopList');

  } catch (e) {
    yield put({ type: SET_IS_FETCHING, payload: false });
    yield put(setSnackbar({ status: "error", message: getRequestError(e), visible: true }));
  }
}



export function* stopListsSaga() {
  yield takeLatest(GET_STOP_LIST_AGGREGATORS_SAGA, fetchStopListAggregatorsRequest);
  yield takeLatest(GET_STOP_LIST_SAGA, fetchStopListRequest);
  yield takeLatest(SWITCH_STOP_LIST_PRODMODE, switchStopListProdRequest);
  yield takeLatest(UPDATE_STOP_LISTS, updateStopListsRequest);
  yield takeLatest(UPDATE_ALL_STOP_LISTS_SAGA, updateAllStopsListsRequest);
  yield takeLatest(GET_PRODUCT_STORES_SAGA, getProductStoresRequest);

  yield takeLatest(ENABLE_PRODUCT_SAGA, enableProductRequest);
  yield takeLatest(DISABLE_PRODUCT_SAGA, disableProductRequest);
}

