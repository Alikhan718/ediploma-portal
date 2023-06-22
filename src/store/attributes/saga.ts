import { menusApi } from "@src/service/api";
import { getRequestError } from "@src/utils/getRequestError";
import { call, put, select, takeLatest } from "redux-saga/effects";
import { setSnackbar } from "../generals/actionCreators";
import { fetchMenuProduct } from "../menu/actionCreators";
import {
  FETCH_ATTRIBUTES_AND_PRODUCTS_PROCESS,
  FETCH_ATTRIBUTES_AND_PRODUCTS_ERROR,
  FETCH_ATTRIBUTES_AND_PRODUCTS_SAGA,
  FETCH_ATTRIBUTES_AND_PRODUCTS_SUCCESS,
  ADD_ATTRIBUTE_TO_ATTRIBUTE_GROUP_SAGA,
  FETCH_EXIST_ATTRIBUTE_GROUP_SUCCESS,
  FETCH_ATTRIBUTE_GROUP_SAGA,
  EDIT_ATTRIBUTE_GROUP_SAGA,
  FETCH_ATTRIBUTE_GROUP_DETAIL_SAGA,
  FETCH_ATTRIBUTES_DETAIL_SUCCESS,
  FETCH_ATTRIBUTE_GROUP_PRODUCTS_SAGA,
  FETCH_ATTRIBUTES_GROUP_PRODUCTS_PROCESS,
  FETCH_ATTRIBUTES_GROUP_PRODUCTS_SUCCESS,
  FETCH_ATTRIBUTES_GROUP_PRODUCTS_ERROR,
  UPDATE_ATTRIBUTE_GROUP_ERROR,
  UPDATE_ATTRIBUTE_GROUP_PROCESS,
  UPDATE_ATTRIBUTE_GROUP_SAGA
} from "./types/types";
import { fetchAttributeGroup } from "@src/store/attributes/actionCreators";

export function* fetchAttributesAndProductsRequest(action: any) {
  try {
    yield put({ type: FETCH_ATTRIBUTES_AND_PRODUCTS_PROCESS });
    const { menu_id, product_id, attribute_group_name, min, max } = action.payload;

    const { currLocation } = yield select(state => state.locations);
    const { data } = yield call(menusApi.getAttributeProductList, currLocation, menu_id, product_id, attribute_group_name, min, max);


    yield put({ type: FETCH_ATTRIBUTES_AND_PRODUCTS_SUCCESS, payload: data });
  } catch (e: any) {
    yield put({ type: FETCH_ATTRIBUTES_AND_PRODUCTS_ERROR });
    yield put(setSnackbar({ visible: true, message: getRequestError(e), status: "error" }));
  }
}

export function* fetchAttributeGroupRequest(action: any) {
  try {
    yield put({ type: FETCH_ATTRIBUTES_AND_PRODUCTS_PROCESS });

    const { currLocation } = yield select(state => state.locations);
    const { data } = yield call(menusApi.getAttributeGroup, currLocation, action.payload, action.search);
    console.log(action.search);

    yield put({ type: FETCH_EXIST_ATTRIBUTE_GROUP_SUCCESS, payload: data.attribute_groups });
  } catch (e: any) {
    yield put({ type: FETCH_ATTRIBUTES_AND_PRODUCTS_ERROR });
  }
}

export function* addAttributeToAttributeGroupRequest(action: any) {
  try {
    const { currLocation } = yield select(state => state.locations);
    const { menu_id, product_id, ...rest } = action.payload;
    const { data } = yield call(menusApi.addAttributetoAttributeGroup, currLocation, menu_id, rest);
    yield put(setSnackbar({ visible: true, message: "Запрос успешно отправлен", status: "success" }));
    yield put(fetchMenuProduct({ menu_id, product_id }));
  } catch (e: any) {
    yield put(setSnackbar({ visible: true, message: getRequestError(e), status: "error" }));
  }
}
export function* editAttributeGroupRequest(action: any) {
  try {
    const { currLocation } = yield select(state => state.locations);
    const { menu_id, body } = action.payload;
    yield call(menusApi.editAttributeGroup, currLocation, menu_id, body);
    yield put(setSnackbar({ visible: true, message: "Success Edited", status: "success" }));
  } catch (e) {
    yield put(setSnackbar({ visible: true, message: getRequestError(e), status: "error" }));

  }
}
export function* getAttributeGroupDetail(action: any) {
  try {
    yield put({ type: FETCH_ATTRIBUTES_AND_PRODUCTS_PROCESS });
    const { currLocation } = yield select(state => state.locations);
    const { menu_id, product_id, attribute_group_id } = action.payload;
    const { data } = yield call(menusApi.getAttributeGroupDetails, currLocation, menu_id, product_id, attribute_group_id);


    yield put({ type: FETCH_ATTRIBUTES_DETAIL_SUCCESS, payload: data });

  } catch (e) {
    yield put(setSnackbar({ visible: true, message: getRequestError(e), status: "error" }));
    yield put({ type: FETCH_ATTRIBUTES_AND_PRODUCTS_ERROR });

  }
}
export function* getAttributeGroupProductsRequest(action: any) {
  try {
    yield put({ type: FETCH_ATTRIBUTES_GROUP_PRODUCTS_PROCESS });
    const { menu_id, attribute_group_id } = action.payload;
    const { data } = yield call(menusApi.getAttributeGroupProducts, menu_id, attribute_group_id);

    yield put({ type: FETCH_ATTRIBUTES_GROUP_PRODUCTS_SUCCESS, payload: { id: attribute_group_id, products: data, } });

  } catch (e) {
    yield put(setSnackbar({ visible: true, message: getRequestError(e), status: "error" }));
    yield put({ type: FETCH_ATTRIBUTES_GROUP_PRODUCTS_ERROR });

  }
}

export function* updateAttributeGroupRequest(action: any) {
  try {
    yield put({ type: UPDATE_ATTRIBUTE_GROUP_PROCESS });
    const { menu_id, attribute_group_id, body } = action.payload;
    yield call(menusApi.updateAttributeGroup, menu_id, attribute_group_id, body);
    yield put(fetchAttributeGroup(menu_id));

  } catch (e) {
    yield put(setSnackbar({ visible: true, message: getRequestError(e), status: "error" }));
    yield put({ type: UPDATE_ATTRIBUTE_GROUP_ERROR });

  }
}

export function* attributesSaga() {
  yield takeLatest(FETCH_ATTRIBUTES_AND_PRODUCTS_SAGA, fetchAttributesAndProductsRequest);
  yield takeLatest(UPDATE_ATTRIBUTE_GROUP_SAGA, updateAttributeGroupRequest);
  yield takeLatest(ADD_ATTRIBUTE_TO_ATTRIBUTE_GROUP_SAGA, addAttributeToAttributeGroupRequest);
  yield takeLatest(FETCH_ATTRIBUTE_GROUP_SAGA, fetchAttributeGroupRequest);
  yield takeLatest(EDIT_ATTRIBUTE_GROUP_SAGA, editAttributeGroupRequest);
  yield takeLatest(FETCH_ATTRIBUTE_GROUP_DETAIL_SAGA, getAttributeGroupDetail);
  yield takeLatest(FETCH_ATTRIBUTE_GROUP_PRODUCTS_SAGA, getAttributeGroupProductsRequest);
}
