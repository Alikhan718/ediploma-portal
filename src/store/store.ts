import createSagaMiddleWare from 'redux-saga';
import {applyMiddleware, combineReducers, createStore} from 'redux';

import rootSaga from './sagas';
import {generalsReducer} from './generals/reducer';
import {authReducer} from './auth/reducer';
import { analyticsReducer } from './analytics/reducer';
import diplomaReducer from './diplomas/reducer';
import generatorReducer from "@src/store/generator/reducer";
import vacancyReducer from './vacancy/reducer';

const sagaMiddleWare = createSagaMiddleWare();

const reducers = combineReducers({
    generals: generalsReducer,
    auth: authReducer,
    diploma: diplomaReducer,
    generator: generatorReducer,
    analytics: analyticsReducer,
    vacancy: vacancyReducer,
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