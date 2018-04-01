import { createStore, compose, applyMiddleware } from 'redux'
// import { autoRehydrate } from 'redux-persist'

import createSagaMiddleware from 'redux-saga'
import rootReducer, { RootState } from './reducers'
import rootSaga from './sagas'

const sagaMiddleware = createSagaMiddleware()

// const enhancers = [autoRehydrate({ log: false })]
const enhancers = []

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const middleware = [
  sagaMiddleware
]

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

const store = createStore(
  rootReducer,
  composedEnhancers
)

sagaMiddleware.run(rootSaga)

export default store
