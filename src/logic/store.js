// @flow
import {createStore, compose, applyMiddleware} from "redux";
// import {composeWithDevTools} from "remote-redux-devtools";

import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const enhancers = [];

if (process.env.NODE_ENV === "development") {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === "function") {
    enhancers.push(devToolsExtension());
  }
}

const middleware = [sagaMiddleware];

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);
// const composedEnhancers = composeWithDevTools(
// applyMiddleware(...middleware),
// ...enhancers
// );

const store = createStore(rootReducer, composedEnhancers);

sagaMiddleware.run(rootSaga);

export default store;
