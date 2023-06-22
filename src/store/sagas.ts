import { all } from "redux-saga/effects";
import { attributesSaga } from "./attributes/saga";
import { authSagas } from "./auth/saga";
import { callCenterSagas } from "./callcenter/saga";
import { createMenuSagas } from "./createMenu/saga";
import { locationsSaga } from "./locations/saga";
import { menusSaga } from "./menu/saga";
import { menusListSaga } from "./menulist/saga";
import { ordersSaga } from "./orders/saga";
import { stopListsSaga } from "./stoplist/saga";
import { settingsSaga } from "./settings/saga";
import { selectAllSaga } from "./selectAll/saga";

export default function* rootSaga() {
  yield all([
    ordersSaga(),
    locationsSaga(),
    menusListSaga(),
    menusSaga(),
    stopListsSaga(),
    createMenuSagas(),
    attributesSaga(),
    settingsSaga(),
    authSagas(),
    callCenterSagas(),
    selectAllSaga()
  ]);
};
