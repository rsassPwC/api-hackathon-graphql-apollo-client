/* SETUP DEBUGGING FOR CHROME */
// See https://github.com/zalmoxisus/redux-devtools-extension for more information.
declare global {
  interface Window {
    process?: Object;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const devCompose: <Ext0, Ext1, StateExt0, StateExt1>(f1: StoreEnhancer<Ext0, StateExt0>, f2: StoreEnhancer<Ext1, StateExt1>) =>
  StoreEnhancer<Ext0 & Ext1, StateExt0 & StateExt1> = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;



/* SETUP REDUX STATES */
import { RouterState } from "lit-redux-router/dist/reducer.js";
import { AppState } from './components/app-catalog/reducers';
export interface RootState {
  router?: RouterState,
  appState?: AppState
}


/* SETUP REDUX STORE */
import { createStore, compose, applyMiddleware, combineReducers, StoreEnhancer, AnyAction } from "redux";
import { lazyReducerEnhancer, LazyStore } from "pwa-helpers/lazy-reducer-enhancer";
import { DataMiddleware } from './components/app-catalog/middleware';

const middlewares = [DataMiddleware];

export const store = createStore<RootState, AnyAction, LazyStore, {}>((state) => state, devCompose(lazyReducerEnhancer(combineReducers), applyMiddleware(...middlewares)));


/* LAZY ADD REDUCERS */
import routerReducer from "lit-redux-router/dist/reducer.js"
import { appReducer } from "./components/app-catalog/reducers"

store.addReducers({
  router: routerReducer,
  appState: appReducer
});


/* CONNECT STORE TO LIT-REDUX-ROUTER */
import Route from "lit-redux-router/dist/route"

Route(store);