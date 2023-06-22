import { Auth } from "aws-amplify";
import { call, put, takeLatest } from "redux-saga/effects";
import { fetchAllLocation } from "../locations/reducer";
import { FETCH_AUTH_ITEMS, FETCH_AUTH_ITEMS_ERROR, FETCH_AUTH_ITEMS_SAGA, FETCH_AUTH_ITEMS_SUCCESS } from "./types/actionTypes";


export function* fetchAuthItemsRequest(action: any) {
  try {
    yield put({ type: FETCH_AUTH_ITEMS });
    // @ts-ignore
    const data = yield Auth.currentAuthenticatedUser();

    const userRole = data.signInUserSession.accessToken.payload["cognito:groups"];
    const token = data.signInUserSession.idToken.jwtToken;
    const refreshToken = data.signInUserSession.refreshToken.token;


    localStorage.setItem("userRole", JSON.stringify(userRole || ''));
    localStorage.setItem("token", token);
    localStorage.setItem("refreshToken", refreshToken);

    if (!userRole.includes("Callcenter")) {
      yield put(fetchAllLocation());
    }
    yield put({ type: FETCH_AUTH_ITEMS_SUCCESS, payload: userRole });

  } catch (e) {
    yield put({ type: FETCH_AUTH_ITEMS_ERROR });
  }
}

export function* authSagas() {
  yield takeLatest(FETCH_AUTH_ITEMS_SAGA, fetchAuthItemsRequest);
}