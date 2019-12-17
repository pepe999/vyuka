import { applyMiddleware, compose, combineReducers, createStore } from "redux";
// import { reducer as reduxFormReducer } from "redux-form";
import createSagaMiddleware from "redux-saga";

// import { rootSaga } from '../sagas'

import { newsReducer } from "./news";

const appReducers = combineReducers({
  // form: reduxFormReducer,
  news: newsReducer
});

const combinedReducers = (state, action) => {
  // This will set default state to store on dispatched action CLEAR_STORE!
  // const newState = action.type === LogoutActionTypes.CLEAR_STORE ? undefined : state
  const newState = state;
  return appReducers(newState, action);
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [sagaMiddleware];

  const store: Object = createStore(
    combinedReducers,
    (composeEnhancers(applyMiddleware(...middleware)): StoreEnhancer<*, *, *>)
  );

  window.store = store;

  // sagaMiddleware is exposed because of our saga HMR
  store.sagaMiddleware = sagaMiddleware;

  return [store];
};
