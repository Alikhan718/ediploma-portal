import { MenuType } from "@src/pages/UploadMenuPage/generator";
import { menusApi } from "@src/service/api";
import { getRequestError } from "@src/utils/getRequestError";
import { call, put, select, takeLatest } from "redux-saga/effects";
import { setGlobalLoader, setSnackbar } from "../generals/actionCreators";
import { LoadingStatus } from "../generals/types";
import { getMatchMenuProducts, parseMenuSuccess } from "./reducer";
import { GET_MATCH_MENU_PRODUCTS_SAGA, GET_MATCH_MENU_PRODUCTS_SUCCESS, GET_MATCH_MENU_SECTIONS_SAGA, GET_MATCH_MENU_SECTIONS_SUCCESS, IS_MATCHED_ALL_SAGA, PARSE_MENU_ERROR, PARSE_MENU_FETCH, PARSE_MENU_SAGA, PARSE_MENU_SUCCESS, UPLOAD_MENU_SAGA } from "./types/actionTypes";


export function* parseMenuRequest(action: any) {
  try {
    yield put({ type: PARSE_MENU_FETCH });
    const { data } = yield call(menusApi.parseMenu, action.payload);
    if (data.data) {
      yield put(parseMenuSuccess(data.data));
    } else {
      yield put(setSnackbar({ visible: true, message: "wrong file loaded", status: "error" }));
    }
  } catch (e) {
    yield put({ type: PARSE_MENU_ERROR });
    yield put(setSnackbar({ visible: true, message: getRequestError(e), status: "error" }));
  }
}

export function* uploadMenuRequest(action: any) {
  try {
    yield put(setGlobalLoader(LoadingStatus.LOADING));
    const { navigate, menuType, ...rest } = action.payload;
    yield call(menuType === MenuType.GLOVO ? menusApi.createMenu : menusApi.uploadMenuWolt, JSON.stringify(rest));
    yield put(setGlobalLoader(LoadingStatus.SUCCESS));
    navigate(`/app/menu`);
  } catch (e) {
    yield put(setSnackbar({ visible: true, message: getRequestError(e), status: "error" }));
    yield put(setGlobalLoader(LoadingStatus.ERROR));
  }
}

export function* getMatchMenuSectionsRequest(action: any) {
  try {
    yield put(setGlobalLoader(LoadingStatus.LOADING));
    const { data } = yield call(menusApi.getMenuSections, action.payload);

    yield put({ type: GET_MATCH_MENU_SECTIONS_SUCCESS, payload: data });

    // HERE WE WILL GET MATCH MENU PRODUCTS;
    const { currLocation } = yield select(state => state.locations);
    const payload = { menu_id: action.payload, restaurant_id: currLocation, section_name: data[0].id };
    yield put(getMatchMenuProducts(payload));
  } catch (e) {
    yield put(setGlobalLoader(LoadingStatus.ERROR));
    yield put(setSnackbar({ visible: true, message: getRequestError(e), status: "error" }));
  }
}
export function* getMatchMenuProductsRequest(action: any) {
  try {
    yield put(setGlobalLoader(LoadingStatus.LOADING));
    const { menu_id, restaurant_id, section_name, page, field } = action.payload;
    const { data } = yield call(menusApi.getMenuProductsForMatching, menu_id, restaurant_id, section_name, page, field);
    yield put({ type: GET_MATCH_MENU_PRODUCTS_SUCCESS, payload: { ...data, section_name } });
    yield put(setGlobalLoader(LoadingStatus.SUCCESS));
  } catch (e) {
    yield put(setSnackbar({ visible: true, message: getRequestError(e), status: "error" }));
    yield put(setGlobalLoader(LoadingStatus.ERROR));
  }
}

export function* matchingProductRequest(action: any) {
  try {
    // const { menu_id, aggregator_product_id, pos_product_id, section, page } = action.payload;
    // const { data } = yield call(menusApi.matchingPorduct, menu_id, aggregator_product_id, pos_product_id);

    // IF VSE IS OK THEN GET PRODUCTS AGAIN
    // yield put({ type: MATCH_MENU_SUCCESS, payload: aggregator_product_id });
  } catch (e) {
    yield put(setSnackbar({ visible: true, message: getRequestError(e), status: "error" }));

  }
}
export function* checkAllMatchedRequest(action: any) {
  try {
    const { currLocation } = yield select(state => state.locations);
    const { data } = yield call(menusApi.isMatchedAll, action.payload.menuId, { restaurant_id: currLocation });
    yield put(setSnackbar({ visible: true, message: "All products matched", status: "success" }));
    action.payload.navigate("/app/createMenu/success");
  } catch (e) {
    yield put(setSnackbar({ visible: true, message: getRequestError(e), status: "error" }));
  }
}

export function* createMenuSagas() {
  yield takeLatest(PARSE_MENU_SAGA, parseMenuRequest);
  yield takeLatest(UPLOAD_MENU_SAGA, uploadMenuRequest);
  yield takeLatest(GET_MATCH_MENU_SECTIONS_SAGA, getMatchMenuSectionsRequest);
  yield takeLatest(GET_MATCH_MENU_PRODUCTS_SAGA, getMatchMenuProductsRequest);
  // yield takeLatest(MATCH_MENU_REQUEST_SAGA, matchingProductRequest);
  yield takeLatest(IS_MATCHED_ALL_SAGA, checkAllMatchedRequest);
}