import { locationsApi } from "@src/service/api";
import { getRequestError } from "@src/utils/getRequestError";

import { put, call, takeLatest, select, take } from "redux-saga/effects";
import { setGlobalLoader, setSnackbar } from "../generals/actionCreators";
import { LoadingStatus } from "../generals/types";
import { fetchCashSystem, fetchCurrencies, fetchLanguages, fetchLocations, fetchOrganizations } from "./reducer";
import {
  ADD_LOCATION_REQUEST_SAGA,
  CREATE_GLOVO_INTEGRATION,
  FETCH_CITIES,
  FETCH_CITIES_ERROR,
  FETCH_CITIES_SAGA,
  FETCH_CITIES_SUCCESS,
  FETCH_LOCATIONS_SAGA,
  FETCH_LOCATIONS_SUCCESS,
  FETCH_ORGANIZATIONS,
  FETCH_ORGANIZATIONS_ERROR,
  FETCH_ORGANIZATIONS_SUCCESS,
  FETCH_ORGANIZATION_SAGA,
  SEND_IIKO_ORGANIZATIONS_SAGA,
  SEND_IIKO_ORGANIZATIONS_SUCCESS,
  SEND_LOCATION_DATA_SUCCESS,
  SWITCH_LOCATION_INTEGRATION_MODE,
  FETCH_PAYMENT_TYPES_SAGA,
  FETCH_PAYMENT_TYPES, FETCH_PAYMENT_TYPES_ERROR, FETCH_PAYMENT_TYPES_SUCCESS, CREATE_GLOVO_INTEGRATION_SUCCESS, GET_LOCATION_BY_ID_SUCCESS, GET_LOCATION_BY_ID_SAGA, EDIT_LOCATION_ITEM_SAGA, FETCH_ALL_LOCATIONS, FETCH_ALL_LOCATIONS_ERROR, FETCH_ALL_LOCATIONS_SAGA, FETCH_ALL_LOCATIONS_SUCCESS, SET_NEXT_IN_PROGRESS_LOADER, DELETE_LOCATION_SAGA, FETCH_CASH_SYSTEM_SUCCESS, FETCH_CASH_SYSTEM_SAGA, SET_LOCATION_DRAWER_LOADING, EDIT_CASH_SYSTEM_SAGA, PATCH_INTEGRATION_SAGA, GET_LANGUAGES_SAGA, GET_CURRENCIES_SAGA, GET_CURRENCIES_SUCCESS, GET_LANGUAGES_SUCCESS, CREATE_WOLT_INTEGRATION_SAGA,
  GET_WOLT_STATUSSES_SUCCESS,
  GET_WOLT_STATUSSES_SAGA

} from "./types/actionTypes";

export function* fetchLocationsRequest(action: any): any {
  let query = '';

  try {
    yield put(setGlobalLoader(LoadingStatus.LOADING));

    // sorting
    if (action.payload.field) {
      query += `&sort_by=${action.payload.field}&sort_order=${action.payload.direction}`;
    } // SEARCH
    if (action.payload.q) {
      query += `&q=${action.payload.q}`;
    }

    const { data } = yield call(locationsApi.getLocations, action.payload, query);

    yield put({ type: FETCH_LOCATIONS_SUCCESS, payload: data });
    yield put(setGlobalLoader(LoadingStatus.SUCCESS));
  } catch (e: any) {
    yield put(setGlobalLoader(LoadingStatus.ERROR));
  }
}
export function* fetchAllLocationRequest() {
  try {
    yield put({ type: FETCH_ALL_LOCATIONS });
    const { data } = yield call(locationsApi.getAllLocations);
    let currLocation = localStorage.getItem("currLocation");
    if (!currLocation) {
      currLocation = data.data[0].id;
      localStorage.setItem("currLocation", String(currLocation));
    }
    yield put({ type: FETCH_ALL_LOCATIONS_SUCCESS, payload: { data: data.data, currLocation } });
  } catch (e) {
    yield put({ type: FETCH_ALL_LOCATIONS_ERROR });
  }
}

export function* getLocationByIdRequest(action: any) {
  try {
    const { data } = yield call(locationsApi.getLocationById, action.payload);
    yield put({ type: GET_LOCATION_BY_ID_SUCCESS, payload: data.restaurant });
  } catch (e: any) {
    yield put(setSnackbar({ visible: true, status: "error", message: getRequestError(e) }));
  }
}

export function* deleteLocationRequest(action: any) {
  try {
    yield put(setGlobalLoader(LoadingStatus.LOADING));
    yield call(locationsApi.deleteLocations, action.payload.resti_id);
    yield put(setSnackbar({ visible: true, status: "success", message: "Местоположение удалено" }));
    yield put(fetchLocations(action.payload.page));
    // yield put(setGlobalLoader(LoadingStatus.SUCCESS));
  } catch (e) {
    yield put(setSnackbar({ visible: true, status: "error", message: getRequestError(e) }));
    yield put(setGlobalLoader(LoadingStatus.ERROR));
  }
}


export function* addLocationsRequest(action: any): any {
  try {
    yield put({ type: SET_NEXT_IN_PROGRESS_LOADER, payload: true });

    const { navigate, ...rest } = action.payload;

    const { data } = yield call(locationsApi.addRestaurant, rest);

    yield put({ type: SEND_LOCATION_DATA_SUCCESS, payload: action.payload });
    yield put(setSnackbar({ visible: true, status: "success", message: "Успешно" }));
    navigate(`/app/location/integration-cash-system/${data.data.restaurant.id}`);
  } catch (e: any) {
    yield put(setSnackbar({ visible: true, status: "error", message: getRequestError(e) }));
    yield put({ type: SET_NEXT_IN_PROGRESS_LOADER, payload: false });
  }
}

export function* fetchCitiesRequest(): any {
  try {
    yield put({ type: FETCH_CITIES });
    const { data } = yield call(locationsApi.getCities);
    yield put(fetchLanguages());
    yield put(fetchCurrencies());
    yield put({ type: FETCH_CITIES_SUCCESS, payload: data.data });
  } catch (e) {
    yield put({ type: FETCH_CITIES_ERROR });
  }
}
export function* fetchLanguagesRequest() {
  try {
    const { data } = yield call(locationsApi.getLanguages);

    yield put({ type: GET_LANGUAGES_SUCCESS, payload: data });
  } catch (e) {
    yield put(setSnackbar({ visible: true, status: "error", message: getRequestError(e) }));

  }
}
export function* fetchCurrenciesRequest() {
  try {
    const { data } = yield call(locationsApi.getCurrencies);


    yield put({ type: GET_CURRENCIES_SUCCESS, payload: data.data });
  } catch (e) {
    yield put(setSnackbar({ visible: true, status: "error", message: getRequestError(e) }));

  }
}

export function* fetchWoltStatussesRequest(action: any) {
  try {
    const { resti_id, aggregator } = action.payload;
    const { data } = yield call(locationsApi.getWoltStatusses, resti_id, aggregator);

    yield put({ type: GET_WOLT_STATUSSES_SUCCESS, payload: data });
  } catch (e) {
    yield put(setSnackbar({ visible: true, status: "error", message: getRequestError(e) }));
  }
}

export function* fetchTerminalsRequest(action: any): any {
  try {
    yield put({ type: FETCH_ORGANIZATIONS });
    const { data } = yield call(locationsApi.getIIKO_orgnizations, action.payload);

    yield put({ type: FETCH_ORGANIZATIONS_SUCCESS, payload: data });
  } catch (e: any) {
    yield put(setSnackbar({
      visible: true,
      status: "error",
      message: e.response ? e.response.message : 'Network Error'
    }));
    yield put({ type: FETCH_ORGANIZATIONS_ERROR });
  }
}

export function* fetchPaymentTypes(action: any): any {
  try {
    yield put({ type: FETCH_PAYMENT_TYPES });
    const { data } = yield call(locationsApi.getPaymentTypes, action.payload);
    yield put({ type: FETCH_PAYMENT_TYPES_SUCCESS, payload: data });
  } catch (e: any) {
    yield put({ type: FETCH_PAYMENT_TYPES_ERROR });
    yield put(setSnackbar({ visible: true, status: "error", message: getRequestError(e) }));
  }
}

export function* createGlovoIntegration(action: any): any {
  try {
    yield put({ type: SET_NEXT_IN_PROGRESS_LOADER, payload: true });

    const payload = { ...action.payload.data };
    yield call(locationsApi.createGlovoIntegration, payload);
    yield put(fetchLocations());
    yield put(setSnackbar({ visible: true, status: "success", message: "Успешно" }));
    yield put({ type: CREATE_GLOVO_INTEGRATION_SUCCESS, payload: action.payload });
  } catch (e: any) {
    yield put({ type: SET_NEXT_IN_PROGRESS_LOADER, payload: false });
    yield put(setSnackbar({
      visible: true,
      status: "error",
      message: getRequestError(e)
    }));
  }
}

export function* createWoltIntegration(action: any): any {
  try {
    yield put({ type: SET_NEXT_IN_PROGRESS_LOADER, payload: true });

    const payload = { ...action.payload.data };
    yield call(locationsApi.createWoltIntegration, payload);
    yield put(fetchLocations());
    yield put(setSnackbar({ visible: true, status: "success", message: "Успешно" }));
    yield put({ type: SET_NEXT_IN_PROGRESS_LOADER, payload: false });

  } catch (e: any) {
    yield put({ type: SET_NEXT_IN_PROGRESS_LOADER, payload: false });
    yield put(setSnackbar({
      visible: true,
      status: "error",
      message: getRequestError(e)
    }));
  }
}

export function* switchIntegration(action: any): any {
  try {
    const { location_id, is_active } = action.payload;
    const { page } = yield select(state => state.locations);
    yield call(locationsApi.disableLocationIntegration, location_id, is_active);
    yield put(fetchLocations(page));
  } catch (e: any) {
    yield put(setSnackbar({ visible: true, message: getRequestError(e), status: "error" }));

  }
}

export function* createIIKOOrganizations(action: any): any {
  try {
    yield put({ type: SET_NEXT_IN_PROGRESS_LOADER, payload: true });


    const { terminals, cashSystem, navigate, ...rest } = action.payload;
    const body = { ...rest };
    yield call(locationsApi.createIIKO_organizations, body);

    yield put({ type: SEND_IIKO_ORGANIZATIONS_SUCCESS, payload: action.payload });

    navigate(`/app/location/create-agregators/${action.payload.resti_id}`);
  } catch (e: any) {
    yield put(setSnackbar({ visible: true, message: getRequestError(e), status: "error" }));
    yield put({ type: SET_NEXT_IN_PROGRESS_LOADER, payload: false });

  }
}
// EDIT

export function* editLocationDataRequest(action: any) {
  try {
    const { restaurant_id, form, navigate } = action.payload;
    const { data } = yield call(locationsApi.editLocationData, restaurant_id, form);
    if (data) {
      yield put(setSnackbar({ visible: true, status: "success", message: "Updated !" }));
    }
    yield put(fetchLocations(1));
    navigate(`/app/location/edit-cash-system/${restaurant_id}`);
  } catch (e: any) {
    yield put(setSnackbar({ visible: true, status: "error", message: getRequestError(e) }));
  }
}
export function* fetchCashSystemRequest(action: any) {
  try {
    yield put({ type: SET_LOCATION_DRAWER_LOADING, payload: true });
    const { data } = yield call(locationsApi.getCashSystem, action.payload);
    yield put(fetchOrganizations(data.api_login));
    yield put({ type: FETCH_CASH_SYSTEM_SUCCESS, payload: data });
    yield put({ type: SET_LOCATION_DRAWER_LOADING, payload: false });
  } catch (e: any) {
    yield put({ type: SET_LOCATION_DRAWER_LOADING, payload: false });

    yield put(setSnackbar({ visible: true, status: "error", message: getRequestError(e) }));
  }
}
export function* editCashSystemRequest(action: any) {
  try {
    const { terminals, resti_id, ...body } = action.payload;
    body["resti_id"] = String(resti_id).toLocaleLowerCase();
    yield call(locationsApi.editCashSystem, body);
    yield put(setSnackbar({ visible: true, status: "success", message: "Success" }));
  } catch (e: any) {
    yield put(setSnackbar({ visible: true, status: "error", message: "Success" }));
  }
}
export function* patchIntegrationRequest(action: any) {
  try {
    const { data } = yield call(locationsApi.patchIntegration, action.payload);
    yield put(setSnackbar({ visible: true, status: "success", message: "Success" }));
  } catch (e) {
    yield put(setSnackbar({ visible: true, status: "error", message: "Success" }));
  }
}

export function* locationsSaga() {
  yield takeLatest(FETCH_LOCATIONS_SAGA, fetchLocationsRequest);
  yield takeLatest(FETCH_CITIES_SAGA, fetchCitiesRequest);
  yield takeLatest(DELETE_LOCATION_SAGA, deleteLocationRequest);
  yield takeLatest(ADD_LOCATION_REQUEST_SAGA, addLocationsRequest);
  yield takeLatest(FETCH_ORGANIZATION_SAGA, fetchTerminalsRequest);
  yield takeLatest(FETCH_PAYMENT_TYPES_SAGA, fetchPaymentTypes);
  yield takeLatest(SWITCH_LOCATION_INTEGRATION_MODE, switchIntegration);
  yield takeLatest(SEND_IIKO_ORGANIZATIONS_SAGA, createIIKOOrganizations);
  yield takeLatest(CREATE_GLOVO_INTEGRATION, createGlovoIntegration);
  yield takeLatest(GET_LOCATION_BY_ID_SAGA, getLocationByIdRequest);
  yield takeLatest(EDIT_LOCATION_ITEM_SAGA, editLocationDataRequest);
  yield takeLatest(FETCH_ALL_LOCATIONS_SAGA, fetchAllLocationRequest);
  yield takeLatest(CREATE_WOLT_INTEGRATION_SAGA, createWoltIntegration);

  yield takeLatest(FETCH_CASH_SYSTEM_SAGA, fetchCashSystemRequest);
  yield takeLatest(EDIT_CASH_SYSTEM_SAGA, editCashSystemRequest);
  yield takeLatest(PATCH_INTEGRATION_SAGA, patchIntegrationRequest);

  yield takeLatest(GET_CURRENCIES_SAGA, fetchCurrenciesRequest);
  yield takeLatest(GET_LANGUAGES_SAGA, fetchLanguagesRequest);

  yield takeLatest(GET_WOLT_STATUSSES_SAGA, fetchWoltStatussesRequest);
}
