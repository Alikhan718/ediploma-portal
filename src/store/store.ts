import createSagaMiddleWare from 'redux-saga';
import {applyMiddleware, combineReducers, createStore} from 'redux';

import rootSaga from './sagas';
import ordersReducer from './orders/reducer';
import locationsReducer from './locations/reducer';
import menusReducer from './menu/reducer';
import {generalsReducer} from './generals/reducer';
import stopListReducer from './stoplist/reducer';
import createMenuReducer from './createMenu/reducer';
import menuListReducer from './menulist/reducer';
import attributeReducer from './attributes/reducer';
import {authReducer} from './auth/reducer';
import {callCenterReducer} from './callcenter/reduer';
import settingsReducer from './settings/reducer';
import {selectAllReducer} from './selectAll/reducer';
import diplomaReducer from './diplomas/reducer';

const sagaMiddleWare = createSagaMiddleWare();

const reducers = combineReducers({
    orders: ordersReducer,
    menus: menusReducer,
    locations: locationsReducer,
    generals: generalsReducer,
    stopLists: stopListReducer,
    createMenu: createMenuReducer,
    menuList: menuListReducer,
    attributes: attributeReducer,
    auth: authReducer,
    callCenter: callCenterReducer,
    settings: settingsReducer,
    selectAll: selectAllReducer,
    diploma: diplomaReducer,
});


export const store = createStore(reducers, applyMiddleware(sagaMiddleWare));

declare global {
    interface Window {
        store: any;
    }
}

window['store'] = store;

sagaMiddleWare.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;

// const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleWare];